export const COOKIE_CONSENT_KEY = 'dtpf-cookie-consent';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
}

// Analytics is opt-in: until the visitor answers the banner, only the necessary
// cookies apply and Umami is never loaded.
export const DEFAULT_CONSENT: CookieConsent = { necessary: true, analytics: false };

export function getStoredConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeConsent(consent: CookieConsent): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
}

export function hasAnalyticsConsent(): boolean {
  const consent = getStoredConsent();
  return consent?.analytics ?? DEFAULT_CONSENT.analytics;
}
