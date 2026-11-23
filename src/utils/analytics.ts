import { removeStored, STORAGE_KEYS } from 'utils/storage';

const SCRIPT_URL = 'https://analytics.dtpf.es/script.js';
const SCRIPT_ID = 'umami-analytics';

const WEBSITE_IDS: Record<string, string> = {
  'dtpf.es': '6d02243d-1dfb-4395-b5fa-188dded7cf19',
  'dev.dtpf.es': 'd30c7c40-a1e0-49a8-bc92-27c6d7c7c332',
};

// An event can fire before the script has loaded (a chunk-reload retry, a click in the first frames).
// Calls made in that window wait here and go out on the script's load event; the cap bounds the queue
// when a blocker keeps the script out.
const MAX_PENDING = 20;
const pending: Array<(umami: UmamiTrack) => void> = [];

let initialized = false;

function flushPending(): void {
  const umami = getUmami();
  if (!umami?.track) return;
  pending.splice(0).forEach((call) => call(umami));
}

function send(call: (umami: UmamiTrack) => void): void {
  const umami = getUmami();
  if (umami?.track) {
    call(umami);
    return;
  }
  if (pending.length < MAX_PENDING) pending.push(call);
}

function injectScript(): void {
  const websiteId = WEBSITE_IDS[window.location.hostname];
  if (!websiteId) return;
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_URL;
  script.defer = true;
  script.setAttribute('data-website-id', websiteId);
  // Umami tracks page views itself — the first one of each load and every client-side route change —
  // and, with `data-performance`, the web vitals. The vitals go as Umami's own performance reports,
  // which its bounce rate ignores: sent as a custom event, they marked every visit as engaged.
  script.setAttribute('data-performance', 'true');
  script.addEventListener('load', flushPending);
  document.head.appendChild(script);
  initialized = true;
}

export function initAnalytics(): void {
  // The site no longer has anything to consent to.
  removeStored(STORAGE_KEYS.legacyConsent);
  injectScript();
}

type UmamiTrack = {
  track: (name: string, data?: Record<string, string | number>) => void;
};

function getUmami(): UmamiTrack | undefined {
  if (!initialized) return undefined;
  return (window as unknown as Record<string, unknown>).umami as UmamiTrack | undefined;
}

export function trackEvent(name: string, data?: Record<string, string | number>): void {
  send((umami) => umami.track(name, data));
}
