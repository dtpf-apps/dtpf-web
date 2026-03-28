const SCRIPT_URL = 'https://analytics.dtpf.es/script.js';
const SCRIPT_ID = 'umami-analytics';

const WEBSITE_IDS: Record<string, string> = {
  'dtpf.es': '6d02243d-1dfb-4395-b5fa-188dded7cf19',
  'dev.dtpf.es': 'd30c7c40-a1e0-49a8-bc92-27c6d7c7c332',
};

let initialized = false;

function injectScript(): void {
  const websiteId = WEBSITE_IDS[window.location.hostname];
  if (!websiteId) return;
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_URL;
  script.defer = true;
  script.setAttribute('data-website-id', websiteId);
  script.setAttribute('data-auto-track', 'false');
  document.head.appendChild(script);
  initialized = true;
}

export function initAnalytics(): void {
  injectScript();
}

type UmamiTrack = {
  track: ((payload?: object | string, data?: Record<string, string | number>) => void) &
    ((callback: (props: Record<string, unknown>) => object) => void);
};

function getUmami(): UmamiTrack | undefined {
  if (!initialized) return undefined;
  return (window as unknown as Record<string, unknown>).umami as UmamiTrack | undefined;
}

export function trackPageView(url?: string, title?: string): void {
  const umami = getUmami();
  if (!umami?.track) return;
  if (url) {
    umami.track((props: Record<string, unknown>) => ({ ...props, url, title: title || document.title }));
  } else {
    umami.track();
  }
}

export function trackEvent(name: string, data?: Record<string, string | number>): void {
  const umami = getUmami();
  if (!umami?.track) return;
  umami.track(name, data);
}
