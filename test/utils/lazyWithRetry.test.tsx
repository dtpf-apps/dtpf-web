import { Component, Suspense, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import lazyWithRetry, { checkChunkRecovery } from '../../src/utils/lazyWithRetry';
import { trackEvent } from '../../src/utils/analytics';
import { reportError } from '../../src/utils/errorTracking';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

vi.mock('../../src/utils/errorTracking', () => ({
  reportError: vi.fn(),
  initErrorTracking: vi.fn(),
}));

const CHUNK_ERROR = 'Failed to fetch dynamically imported module: /assets/Home-abc123.js';

class Catch extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? <p>caught: {this.state.error.message}</p> : this.props.children;
  }
}

function renderLazy(importFn: () => Promise<never>) {
  const Page = lazyWithRetry(importFn);
  render(
    <Catch>
      <Suspense fallback={<p>loading</p>}>
        <Page />
      </Suspense>
    </Catch>
  );
}

describe('lazyWithRetry', () => {
  const originalLocation = window.location;
  const reload = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, pathname: '/projects', reload },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  it('reloads once on a stale chunk, reporting it, and keeps the page waiting meanwhile', async () => {
    renderLazy(() => Promise.reject(new Error(CHUNK_ERROR)));

    await vi.waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    expect(sessionStorage.getItem('chunk-retry')).toBe('1');
    expect(trackEvent).toHaveBeenCalledWith('error:chunk-load', {
      message: CHUNK_ERROR.slice(0, 100),
      retry: 'first',
      path: '/projects',
    });
    expect(reportError).toHaveBeenCalledWith(expect.any(Error), 'unhandled-error');
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('gives up after the reload, clearing the flag and handing the error to the boundary', async () => {
    sessionStorage.setItem('chunk-retry', '1');
    renderLazy(() => Promise.reject(new Error(CHUNK_ERROR)));

    expect(await screen.findByText(`caught: ${CHUNK_ERROR}`)).toBeInTheDocument();
    expect(reload).not.toHaveBeenCalled();
    expect(sessionStorage.getItem('chunk-retry')).toBeNull();
    expect(trackEvent).toHaveBeenCalledWith('error:chunk-load', expect.objectContaining({ retry: 'second' }));
  });

  it.each([
    ['ChunkLoadError name', Object.assign(new Error('Loading chunk 7 failed'), { name: 'ChunkLoadError' })],
    ['Safari wording', new Error('Importing a module script failed.')],
    ['Firefox wording', new Error('error loading dynamically imported module: /assets/x.js')],
  ])('treats the %s as a stale chunk', async (_name, error) => {
    renderLazy(() => Promise.reject(error));
    await vi.waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
  });

  it('passes any other error straight to the boundary, without reloading or tracking', async () => {
    renderLazy(() => Promise.reject(new Error('boom')));

    expect(await screen.findByText('caught: boom')).toBeInTheDocument();
    expect(reload).not.toHaveBeenCalled();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});

describe('checkChunkRecovery', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('does nothing when no retry flag in sessionStorage', () => {
    checkChunkRecovery();
    expect(trackEvent).not.toHaveBeenCalled();
  });

  it('tracks the recovery once and clears the flag', () => {
    sessionStorage.setItem('chunk-retry', '1');
    checkChunkRecovery();
    expect(trackEvent).toHaveBeenCalledWith('error:chunk-load-recovered', { path: '/' });
    expect(sessionStorage.getItem('chunk-retry')).toBeNull();

    vi.clearAllMocks();
    checkChunkRecovery();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
