import { Component, useEffect, type ReactNode } from 'react';
import { useRouteError } from 'react-router';
import { trackEvent } from 'utils/analytics';
import { reportError } from 'utils/errorTracking';
import i18n from 'utils/i18n';

function reportCrash(error: Error) {
  reportError(error, 'error-boundary');
  trackEvent('error:boundary', {
    message: error.message.slice(0, 100),
    path: window.location.pathname,
  });
}

// Rendered outside the router and the theme provider, so it reads i18n directly and styles
// itself with the theme tokens, which live on <html> whatever crashed. A chunk that failed to
// load lands here only after lazyWithRetry's one automatic reload, so the way out is the same
// for every error: reload.
function ErrorFallback() {
  return (
    <div className="grid min-h-screen place-content-center px-6 text-center">
      <h1 className="mb-2 font-heading text-xl font-bold">{i18n.t('error_boundary_title')}</h1>
      <p className="mb-6 text-text-secondary">{i18n.t('error_boundary_description')}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mx-auto inline-flex items-center rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
      >
        {i18n.t('error_boundary_reload')}
      </button>
    </div>
  );
}

// The router catches what a page throws while rendering, so a page crash never reaches the
// class boundary below; this is the router's half (errorElement in router/router.tsx).
export function RouteErrorFallback() {
  const routeError = useRouteError();

  useEffect(() => {
    reportCrash(routeError instanceof Error ? routeError : new Error(String(routeError)));
  }, [routeError]);

  return <ErrorFallback />;
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // React already logs the error to the console; this only sends it to the API and Umami.
  componentDidCatch(error: Error) {
    reportCrash(error);
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}
