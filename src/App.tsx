import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'contexts/theme/ThemeContext';
import { Toaster } from 'sonner';
import { router } from 'router/router';
import ErrorBoundary from './ErrorBoundary';
import { initErrorTracking } from 'utils/errorTracking';
import { basePath, apiVersion } from 'api/utils/config';
import CookieConsentBanner from 'views/components/CookieConsentBanner';
import StagingBadge from 'views/components/StagingBadge';
import { initAnalytics } from 'utils/analytics';
import { hasAnalyticsConsent } from 'utils/cookieConsent';
import { checkChunkRecovery } from 'utils/lazyWithRetry';
import useSWUpdate from 'hooks/useSWUpdate';

initErrorTracking(`${basePath}/${apiVersion}`);

export default function App() {
  useSWUpdate();

  useEffect(() => {
    if (hasAnalyticsConsent()) initAnalytics();
    checkChunkRecovery();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            },
          }}
        />
        <CookieConsentBanner />
        <StagingBadge />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
