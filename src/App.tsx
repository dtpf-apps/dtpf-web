import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'contexts/theme/ThemeContext';
import { Toaster } from 'sonner';
import { router } from 'router/router';
import ErrorBoundary from './ErrorBoundary';
import { initErrorTracking } from 'utils/errorTracking';
import { apiUrl } from 'api/utils/config';
import StagingBadge from 'views/components/StagingBadge';
import { initAnalytics } from 'utils/analytics';
import { checkChunkRecovery } from 'utils/lazyWithRetry';
import useSWUpdate from 'hooks/useSWUpdate';

initErrorTracking(apiUrl('/client-errors'));

export default function App() {
  useSWUpdate();

  // Umami runs cookieless and stores no personal data, so it loads on every visit with no
  // consent wall; the footer says so and the privacy policy spells it out.
  useEffect(() => {
    initAnalytics();
    checkChunkRecovery();
  }, []);

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
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
          <StagingBadge />
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}
