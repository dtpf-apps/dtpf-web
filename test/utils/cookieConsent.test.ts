import {
  COOKIE_CONSENT_KEY,
  DEFAULT_CONSENT,
  getStoredConsent,
  storeConsent,
  hasAnalyticsConsent,
  type CookieConsent,
} from '../../src/utils/cookieConsent';

describe('cookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStoredConsent', () => {
    it('returns null when no consent is stored', () => {
      expect(getStoredConsent()).toBeNull();
    });

    it('returns parsed consent when stored', () => {
      const consent: CookieConsent = { necessary: true, analytics: true };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

      expect(getStoredConsent()).toEqual(consent);
    });

    it('returns consent with analytics false', () => {
      const consent: CookieConsent = { necessary: true, analytics: false };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

      expect(getStoredConsent()).toEqual(consent);
    });

    it('returns null for invalid JSON', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'not-json');

      expect(getStoredConsent()).toBeNull();
    });
  });

  describe('storeConsent', () => {
    it('stores consent to localStorage', () => {
      const consent: CookieConsent = { necessary: true, analytics: true };
      storeConsent(consent);

      expect(JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY)!)).toEqual(consent);
    });

    it('stores consent with analytics disabled', () => {
      const consent: CookieConsent = { necessary: true, analytics: false };
      storeConsent(consent);

      expect(JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY)!)).toEqual(consent);
    });
  });

  describe('hasAnalyticsConsent', () => {
    it('returns false until the visitor has decided — analytics is opt-in', () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns false when the stored consent is unreadable', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'not-json');

      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns true when analytics consent is stored as true', () => {
      storeConsent({ necessary: true, analytics: true });

      expect(hasAnalyticsConsent()).toBe(true);
    });

    it('returns false when analytics consent is stored as false', () => {
      storeConsent({ necessary: true, analytics: false });

      expect(hasAnalyticsConsent()).toBe(false);
    });
  });

  describe('DEFAULT_CONSENT', () => {
    it('grants only the necessary cookies', () => {
      expect(DEFAULT_CONSENT).toEqual({ necessary: true, analytics: false });
    });
  });

  describe('COOKIE_CONSENT_KEY', () => {
    it('is dtpf-cookie-consent', () => {
      expect(COOKIE_CONSENT_KEY).toBe('dtpf-cookie-consent');
    });
  });
});
