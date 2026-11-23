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
      expect(script.getAttribute('data-website-id')).toBe('6d02243d-1dfb-4395-b5fa-188dded7cf19');
    });

    it('clears the consent key the retired banner left in returning visitors', () => {
      localStorage.setItem('dtpf-cookie-consent', '{"analytics":true}');

      analytics.initAnalytics();

      expect(localStorage.getItem('dtpf-cookie-consent')).toBeNull();
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
        value: { hostname: '10.0.0.44' },
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

    // Page views and web vitals are the tracker's own: a hand-sent `perf:page-load` custom event marked
    // every visit as engaged, and Umami's bounce rate read 0% whatever the visitors did.
    it('lets the tracker record page views and web vitals itself', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.initAnalytics();

      const script = document.getElementById('umami-analytics') as HTMLScriptElement;
      // The tracker starts nothing — page views or vitals — with auto-track off.
      expect(script.getAttribute('data-auto-track')).toBeNull();
      expect(script.getAttribute('data-performance')).toBe('true');
    });

    it('exposes no way to send a page view by hand', () => {
      expect(Object.keys(analytics).sort()).toEqual(['initAnalytics', 'trackEvent']);
    });
  });

  describe('events fired before the script has loaded', () => {
    it('go out in order once it loads, and only once', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'umami', { value: undefined, writable: true, configurable: true });
      resetModule();
      analytics = await import('../../src/utils/analytics');

      analytics.trackEvent('home:how-visible');
      analytics.initAnalytics();
      analytics.trackEvent('nav:toggle-theme', { theme: 'light' });

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });
      const script = document.getElementById('umami-analytics')!;
      script.dispatchEvent(new Event('load'));
      script.dispatchEvent(new Event('load'));

      expect(mockTrack.mock.calls).toEqual([
        ['home:how-visible', undefined],
        ['nav:toggle-theme', { theme: 'light' }],
      ]);
    });

    it('are held up to 20 while the script is blocked', async () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'dtpf.es' },
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'umami', { value: undefined, writable: true, configurable: true });
      resetModule();
      analytics = await import('../../src/utils/analytics');
      analytics.initAnalytics();

      for (let i = 0; i < 25; i++) analytics.trackEvent(`event-${i}`);

      const mockTrack = vi.fn();
      Object.defineProperty(window, 'umami', {
        value: { track: mockTrack },
        writable: true,
        configurable: true,
      });
      document.getElementById('umami-analytics')!.dispatchEvent(new Event('load'));

      expect(mockTrack).toHaveBeenCalledTimes(20);
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
