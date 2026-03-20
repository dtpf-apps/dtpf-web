import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../src/ErrorBoundary';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
  identifyUser: vi.fn(),
}));

vi.mock('../../src/utils/errorTracking', () => ({
  reportError: vi.fn(),
}));

function ThrowError({ shouldThrow, message }: { shouldThrow: boolean; message?: string }) {
  if (shouldThrow) throw new Error(message || 'Test error');
  return <div>Child content</div>;
}

function ThrowChunkError() {
  throw new Error('Failed to fetch dynamically imported module /assets/Home-abc123.js');
}

describe('ErrorBoundary', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('shows fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows a Reload button for generic errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('shows error description for generic errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
  });

  it('shows updating spinner for chunk errors', () => {
    render(
      <ErrorBoundary>
        <ThrowChunkError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Updating app...')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Reload' })).not.toBeInTheDocument();
  });

  it('calls trackEvent on error', async () => {
    const { trackEvent } = await import('../../src/utils/analytics');
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(trackEvent).toHaveBeenCalledWith(
      'error:boundary',
      expect.objectContaining({ message: 'Test error' })
    );
  });

  it('calls reportError via dynamic import on error', async () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    // componentDidCatch does dynamic import — wait for microtask
    await vi.waitFor(async () => {
      const { reportError } = await import('../../src/utils/errorTracking');
      expect(reportError).toHaveBeenCalledWith(expect.any(Error), 'error-boundary');
    });
  });

  it('Reload button calls window.location.reload', async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock, pathname: '/' },
      writable: true,
      configurable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Reload' }));
    expect(reloadMock).toHaveBeenCalled();
  });
});
