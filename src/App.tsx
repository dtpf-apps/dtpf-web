import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'contexts/theme/ThemeContext';
import { Toaster } from 'sonner';
import { router } from 'router/router';
import ErrorBoundary from './ErrorBoundary';
import { initErrorTracking } from 'utils/errorTracking';
import { basePath, apiVersion } from 'api/utils/config';

export default function App() {
  useEffect(() => {
    initErrorTracking(`${basePath}/${apiVersion}`);
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}
