import { lazy, type ComponentType } from 'react';
import { trackEvent } from 'utils/analytics';
import { reportError } from 'utils/errorTracking';
import { isChunkError } from 'utils/chunkError';

const RETRY_KEY = 'chunk-retry';

export default function lazyWithRetry(importFn: () => Promise<{ default: ComponentType<object> }>) {
  return lazy(() =>
    importFn().catch((error: unknown) => {
      const isChunk = error instanceof Error && isChunkError(error);

      if (!isChunk) throw error;

      const hasRetried = sessionStorage.getItem(RETRY_KEY);

      trackEvent('error:chunk-load', {
        message: error instanceof Error ? error.message.slice(0, 100) : 'unknown',
        retry: hasRetried ? 'second' : 'first',
        path: window.location.pathname,
      });

      if (error instanceof Error) {
        reportError(error, 'unhandled-error');
      }

      if (!hasRetried) {
        sessionStorage.setItem(RETRY_KEY, '1');
        window.location.reload();
        return new Promise(() => {});
      }

      sessionStorage.removeItem(RETRY_KEY);
      throw error;
    })
  );
}

export function checkChunkRecovery() {
  const hadRetry = sessionStorage.getItem(RETRY_KEY);
  if (hadRetry) {
    sessionStorage.removeItem(RETRY_KEY);
    trackEvent('error:chunk-load-recovered', { path: window.location.pathname });
  }
}
