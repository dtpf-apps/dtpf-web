type ErrorSource = 'error-boundary' | 'unhandled-error' | 'unhandled-rejection' | 'fetch-error';

interface ClientError {
  message: string;
  stack?: string;
  source: ErrorSource;
  url: string;
  userAgent: string;
  timestamp: number;
}

let apiUrl = '';
let initialized = false;
const reported = new Set<string>();
const queue: ClientError[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

export function initErrorTracking(baseApiUrl: string): void {
  if (initialized) return;
  apiUrl = `${baseApiUrl}/client-errors`;
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
}

export function reportError(error: Error, source: ErrorSource = 'error-boundary'): void {
  report({
    message: error.message,
    stack: error.stack,
    source,
  });
}

export function reportFetchError(url: string, status: number): void {
  report({
    message: `Fetch failed: ${status} ${url}`,
    source: 'fetch-error',
  });
}

function report(partial: { message: string; stack?: string; source: ErrorSource }): void {
  if (!initialized) return;

  // Dedup: don't report the same error message twice per session
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

  // Batch: flush after 2s to avoid flooding
  if (!flushTimer) {
    flushTimer = setTimeout(flush, 2000);
  }
}

function flush(): void {
  flushTimer = null;
  const batch = queue.splice(0);
  for (const error of batch) {
    try {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
        credentials: 'include',
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Never throw from error tracking
    }
  }
}
