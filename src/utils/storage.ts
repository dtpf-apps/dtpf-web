/** Every key this site writes to localStorage, in one place. */
export const STORAGE_KEYS = {
  /** The language chosen with the header toggle; only an explicit choice is saved. */
  lang: 'dtpf-lang',
  theme: 'dtpf-theme',
  /** Written by the consent banner until 0.6.22; returning visitors still carry it. */
  legacyConsent: 'dtpf-cookie-consent',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// localStorage throws when it is disabled by policy, in some private modes and on a full
// quota. A preference that cannot be read or saved must never break the page.

export function readStored(key: StorageKey): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: StorageKey, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Not saved: the choice still applies to this visit.
  }
}

export function removeStored(key: StorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage is unreachable.
  }
}
