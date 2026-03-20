import { lazy, type ComponentType } from 'react';
import { trackEvent } from 'utils/analytics';
import { reportError } from 'utils/errorTracking';

const RETRY_KEY = 'chunk-retry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function lazyWithRetry(importFn: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(() =>
    importFn().catch((error: unknown) => {
      const isChunkError =
        error instanceof Error &&
        (error.name === 'ChunkLoadError' ||
          error.message.includes('Failed to fetch dynamically imported module') ||
          error.message.includes('Importing a module script failed') ||
          error.message.includes('error loading dynamically imported module'));

      if (!isChunkError) throw error;

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
