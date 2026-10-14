import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Home from '../../src/views/pages/Home';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

// Its own file because Framer Motion creates its IntersectionObserver once, on the first render,
// and keeps it: swapping the global after another test has rendered changes nothing. Here every
// observed element reports itself in view, as a scroll would, before anything renders.
beforeAll(() => {
  globalThis.IntersectionObserver = class {
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    observe = (target: Element) => {
      setTimeout(() =>
        this.callback(
          [{ isIntersecting: true, intersectionRatio: 1, target } as unknown as IntersectionObserverEntry],
          this as unknown as IntersectionObserver
        )
      );
    };
    unobserve = vi.fn();
    disconnect = vi.fn();
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    takeRecords = vi.fn().mockReturnValue([]);
  } as unknown as typeof IntersectionObserver;
});

it('tracks home:how-visible when the "How I work" grid scrolls into view', async () => {
  renderWithProviders(<Home />);
  await waitFor(() => expect(trackEvent).toHaveBeenCalledWith('home:how-visible'));
});
