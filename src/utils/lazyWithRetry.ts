import { lazy, type ComponentType } from 'react';
import { trackEvent } from 'utils/analytics';
import { reportError } from 'utils/errorTracking';
import { isChunkError } from 'utils/chunkError';

const RETRY_KEY = 'chunk-retry';

// sessionStorage throws where the visitor blocks site data. The flag is what stops a second
// reload, so when it cannot be kept the error goes to the boundary, whose Reload button is the
// same way out, instead of risking a reload loop.

function hasRetried(): boolean {
  try {
    return sessionStorage.getItem(RETRY_KEY) !== null;
  } catch {
    return false;
  }
}

/** Remembers the automatic reload across it; false when sessionStorage cannot keep it. */
function markRetried(): boolean {
  try {
    sessionStorage.setItem(RETRY_KEY, '1');
    return true;
  } catch {
    return false;
  }
}

function clearRetried(): void {
  try {
    sessionStorage.removeItem(RETRY_KEY);
  } catch {
    // Nothing was kept.
  }
}

export default function lazyWithRetry(importFn: () => Promise<{ default: ComponentType<object> }>) {
  return lazy(() =>
    importFn().catch((error: unknown) => {
      if (!(error instanceof Error) || !isChunkError(error)) throw error;

      const retried = hasRetried();
      const reloading = !retried && markRetried();

      trackEvent('error:chunk-load', {
        message: error.message.slice(0, 100),
        retry: reloading ? 'first' : retried ? 'second' : 'no-storage',
        path: window.location.pathname,
      });
      reportError(error, 'unhandled-error');

      if (reloading) {
        window.location.reload();
        return new Promise(() => {});
      }

      clearRetried();
      throw error;
    })
  );
}

export function checkChunkRecovery() {
  if (!hasRetried()) return;
  clearRetried();
  trackEvent('error:chunk-load-recovered', { path: window.location.pathname });
}
