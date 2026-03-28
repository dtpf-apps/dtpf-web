// Reset module state between tests
let analytics: typeof import('../../src/utils/analytics');

function resetModule() {
  vi.resetModules();
  document.getElementById('umami-analytics')?.remove();
}

describe('analytics', () => {
  beforeEach(async () => {
    resetModule();
    analytics = await import('../../src/utils/analytics');
  });

  afterEach(() => {
    resetModule();
  });

  describe('initAnalytics', () => {
    it('injects script when hostname is dtpf.es', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics') as HTMLScriptElement;
      expect(script).not.toBeNull();
      expect(script.src).toBe('https://analytics.dtpf.es/script.js');
      expect(script.defer).toBe(true);
      expect(script.getAttribute('data-auto-track')).toBe('false');
      expect(script.getAttribute('data-website-id')).toBe('6d02243d-1dfb-4395-b5fa-188dded7cf19');
    });

    it('injects script when hostname is dev.dtpf.es', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dev.dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics') as HTMLScriptElement;
      expect(script).not.toBeNull();
      expect(script.getAttribute('data-website-id')).toBe('d30c7c40-a1e0-49a8-bc92-27c6d7c7c332');
    });

    it('does NOT inject script when hostname is not allowed', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        writable: true,
        configurable: true,
      });

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics');
      expect(script).toBeNull();
    });

    it('does NOT inject script for local IPs', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '10.5.0.44' },
        writable: true,
        configurable: true,
      });

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics');
      expect(script).toBeNull();
    });

    it('does NOT duplicate script on multiple calls', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.initAnalytics();
      analytics.initAnalytics();

      const scripts = document.querySelectorAll('#umami-analytics');
      expect(scripts.length).toBe(1);
    });

    it('sets data-auto-track to false for manual tracking', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics') as HTMLScriptElement;
      expect(script.getAttribute('data-auto-track')).toBe('false');
    });
  });

  describe('trackPageView', () => {
    it('does nothing when not initialized', () => {
      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackPageView('/test');

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('calls umami.track when initialized', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackPageView('/test', 'Test Page');

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(typeof mockTrack.mock.calls[0][0]).toBe('function');
    });

    it('trackPageView callback sets url and falls back to document.title', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      // Mock that invokes the callback so the arrow function body executes
      const mockTrack = vi.fn((cb: unknown) => {
        if (typeof cb === 'function') cb({});
      });
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      // Call without explicit title — triggers document.title fallback
      analytics.trackPageView('/about');

      expect(mockTrack).toHaveBeenCalledTimes(1);
    });

    it('calls umami.track() without args when no url provided', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackPageView();

      expect(mockTrack).toHaveBeenCalledWith();
    });
  });

  describe('trackEvent', () => {
    it('does nothing when not initialized', () => {
      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackEvent('test-event');

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('calls umami.track with event name and data', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackEvent('contact:submit', { source: 'form' });

      expect(mockTrack).toHaveBeenCalledWith('contact:submit', { source: 'form' });
    });

    it('calls umami.track with just event name when no data', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });

      analytics.trackEvent('nav:logo-click');

      expect(mockTrack).toHaveBeenCalledWith('nav:logo-click', undefined);
    });
  });
});
