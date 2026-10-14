import { renderHook } from '@testing-library/react';
import useSWUpdate from '../../src/hooks/useSWUpdate';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

declare const __BUILD_TIME__: string;

const originalLocation = window.location;
const reload = vi.fn();
const unregister = vi.fn().mockResolvedValue(true);
const deleteCache = vi.fn().mockResolvedValue(true);
const mockFetch = vi.fn();

function linkTo(href: string, target?: string) {
  const a = document.createElement('a');
  a.href = href;
  if (target) a.target = target;
  document.body.append(a);
  return a;
}

/** Clicks like a visitor and reports whether the hook took the navigation over. */
function click(element: Element) {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
  return event.defaultPrevented;
}

/** Mounts the hook with the server answering `buildTime`, past the first check. */
async function mountWithServerBuild(buildTime: string) {
  mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ buildTime }) });
  const hook = renderHook(() => useSWUpdate());
  await vi.advanceTimersByTimeAsync(5_000);
  return hook;
}

describe('useSWUpdate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    vi.stubEnv('PROD', true);
    global.fetch = mockFetch;
    Object.defineProperty(window, 'location', {
      value: { origin: originalLocation.origin, href: originalLocation.href, pathname: '/', reload },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { getRegistrations: vi.fn().mockResolvedValue([{ unregister }]) },
      configurable: true,
    });
    Object.defineProperty(globalThis, 'caches', {
      value: { keys: vi.fn().mockResolvedValue(['workbox-precache', 'images']), delete: deleteCache },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    document.body.replaceChildren();
    Reflect.deleteProperty(document, 'visibilityState');
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  it('never polls outside a production build', async () => {
    vi.stubEnv('PROD', false);
    renderHook(() => useSWUpdate());
    await vi.advanceTimersByTimeAsync(60_000);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('asks for version.json past the cache, 5 s after mount and every 30 s after', async () => {
    await mountWithServerBuild(__BUILD_TIME__);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0]?.[0]).toMatch(/^\/version\.json\?_=\d+$/);
    await vi.advanceTimersByTimeAsync(30_000);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('leaves navigation alone while the running build is the deployed one', async () => {
    await mountWithServerBuild(__BUILD_TIME__);
    expect(click(linkTo('/about'))).toBe(false);
  });

  describe('once a newer build is deployed', () => {
    it('applies it on the next same-origin link: drops the worker and the caches, then navigates', async () => {
      await mountWithServerBuild('newer');
      const link = linkTo('/about');

      expect(click(link)).toBe(true);
      await vi.waitFor(() => expect(window.location.href).toBe(link.href));

      expect(unregister).toHaveBeenCalled();
      expect(deleteCache).toHaveBeenCalledWith('workbox-precache');
      expect(deleteCache).toHaveBeenCalledWith('images');
      expect(window.location.href).toBe(link.href);
      expect(trackEvent).toHaveBeenCalledWith('pwa:silent-update', { trigger: 'navigation', path: '/about' });
    });

    it.each([
      ['a link to another site', () => linkTo('https://github.com/DTPF')],
      ['a link that opens a new tab', () => linkTo('/cv/david-pizarro-frick-es.pdf', '_blank')],
      ['a click that is not on a link', () => document.body.appendChild(document.createElement('span'))],
    ])('ignores %s', async (_name, target) => {
      await mountWithServerBuild('newer');
      expect(click(target())).toBe(false);
    });

    it('waits while a dialog is open', async () => {
      await mountWithServerBuild('newer');
      const dialog = document.createElement('div');
      dialog.setAttribute('role', 'dialog');
      document.body.append(dialog);
      expect(click(linkTo('/about'))).toBe(false);
    });

    it('applies it when the tab comes back into view', async () => {
      await mountWithServerBuild('newer');
      Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });

      document.dispatchEvent(new Event('visibilitychange'));
      await vi.waitFor(() => expect(reload).toHaveBeenCalled());

      expect(deleteCache).toHaveBeenCalledWith('workbox-precache');
      expect(trackEvent).toHaveBeenCalledWith('pwa:silent-update', { trigger: 'visibility', path: '/' });
    });

    it.each([
      ['the tab is hidden', 'hidden', false],
      ['a dialog is open', 'visible', true],
    ])('does not reload while %s', async (_name, visibilityState, dialogOpen) => {
      await mountWithServerBuild('newer');
      Object.defineProperty(document, 'visibilityState', { value: visibilityState, configurable: true });
      if (dialogOpen) {
        const dialog = document.createElement('div');
        dialog.setAttribute('aria-modal', 'true');
        document.body.append(dialog);
      }

      document.dispatchEvent(new Event('visibilitychange'));
      await vi.advanceTimersByTimeAsync(0);
      expect(reload).not.toHaveBeenCalled();
    });

    it('stops asking for version.json: the update is already known', async () => {
      await mountWithServerBuild('newer');
      await vi.advanceTimersByTimeAsync(60_000);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('still drops the caches and navigates in a browser without service workers', async () => {
      Object.defineProperty(navigator, 'serviceWorker', { value: undefined, configurable: true });
      await mountWithServerBuild('newer');
      const link = linkTo('/about');

      expect(click(link)).toBe(true);
      await vi.waitFor(() => expect(window.location.href).toBe(link.href));
      expect(deleteCache).toHaveBeenCalledWith('workbox-precache');
    });
  });

  it('does not reload on return to the tab while the running build is the deployed one', async () => {
    await mountWithServerBuild(__BUILD_TIME__);
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(0);
    expect(reload).not.toHaveBeenCalled();
  });

  it.each([
    ['cannot be fetched', () => mockFetch.mockRejectedValue(new TypeError('offline'))],
    ['answers with an error status', () => mockFetch.mockResolvedValue({ ok: false, status: 503 })],
  ])('keeps the page as it is when version.json %s', async (_name, answer) => {
    answer();
    renderHook(() => useSWUpdate());
    await vi.advanceTimersByTimeAsync(5_000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(click(linkTo('/about'))).toBe(false);
  });

  it('stops polling and listening on unmount', async () => {
    const { unmount } = await mountWithServerBuild('newer');
    unmount();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(click(linkTo('/about'))).toBe(false);
  });
});
