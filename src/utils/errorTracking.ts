type ErrorSource = 'error-boundary' | 'unhandled-error' | 'unhandled-rejection';

interface ClientError {
  message: string;
  stack?: string;
  source: ErrorSource;
  url: string;
  userAgent: string;
  timestamp: number;
}

let endpoint = '';
let initialized = false;
const reported = new Set<string>();
const queue: ClientError[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

export function initErrorTracking(clientErrorsUrl: string): void {
  if (initialized) return;
  endpoint = clientErrorsUrl;
  initialized = true;

  window.addEventListener('error', (event) => {
    if (!event.error) return;
    report({
      message: event.error?.message || event.message || 'Unknown error',
      stack: event.error?.stack,
      source: 'unhandled-error',
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    report({
      message: reason?.message || String(reason) || 'Unhandled rejection',
      stack: reason?.stack,
      source: 'unhandled-rejection',
    });
  });

  // pagehide, not beforeunload: it also fires when a mobile browser discards the tab, and a
  // beforeunload listener keeps the page out of the back/forward cache in some browsers.
  window.addEventListener('pagehide', () => flush());
}

export function reportError(error: Error, source: ErrorSource = 'error-boundary'): void {
  report({
    message: error.message,
    stack: error.stack,
    source,
  });
}

function report(partial: { message: string; stack?: string; source: ErrorSource }): void {
  if (!initialized) return;

  // The same error is reported once per page load.
  const key = `${partial.source}:${partial.message}`;
  if (reported.has(key)) return;
  reported.add(key);

  queue.push({
    message: partial.message.slice(0, 500),
    stack: partial.stack?.slice(0, 2000),
    source: partial.source,
    url: window.location.href,
    userAgent: navigator.userAgent.slice(0, 200),
    timestamp: Date.now(),
  });

  // A burst of errors (one failure cascading) leaves in one flush two seconds later.
  if (!flushTimer) {
    flushTimer = setTimeout(flush, 2000);
  }
}

function flush(): void {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = null;
  for (const error of queue.splice(0)) {
    try {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Reporting an error must never raise another one.
    }
  }
}
