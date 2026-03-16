export const COOKIE_CONSENT_KEY = 'dtpf-cookie-consent';

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
}

export const DEFAULT_CONSENT: CookieConsent = { necessary: true, analytics: true };

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
  return consent?.analytics ?? true;
}
