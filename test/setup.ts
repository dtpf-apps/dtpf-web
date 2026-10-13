import '@testing-library/jest-dom/vitest';
import i18n from '../src/utils/i18n';

// jsdom lives at "/", which the app reads as Spanish; the suite's assertions are written
// against the English copy, and routing takes its language from the URL, not from i18next.
await i18n.changeLanguage('en');

// jsdom doesn't implement IntersectionObserver (needed by Framer Motion whileInView)
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  takeRecords = vi.fn().mockReturnValue([]);
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// jsdom doesn't implement matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

Object.defineProperty(window, 'umami', {
  value: { track: vi.fn(), identify: vi.fn() },
  writable: true,
  configurable: true,
});
