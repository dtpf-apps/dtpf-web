import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'contexts/theme/ThemeContext';
import { Toaster } from 'sonner';
import { router } from 'router/router';
import SWUpdateBanner from 'views/components/SWUpdateBanner';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <SWUpdateBanner />
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
  );
}
