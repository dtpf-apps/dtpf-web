import { Component, type ErrorInfo, type ReactNode } from 'react';
import { trackEvent } from 'utils/analytics';
import { isChunkError } from 'utils/chunkError';
import i18n from 'utils/i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function ErrorFallback({ error }: { error: Error | null }) {
  if (error && isChunkError(error)) {
    return (
      <div style={{ display: 'grid', placeContent: 'center', height: '100vh', textAlign: 'center' }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: '3px solid #e5e7eb',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{ color: '#6b7280' }}>{i18n.t('updating_app')}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', placeContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
        {i18n.t('error_boundary_title')}
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 16 }}>{i18n.t('error_boundary_description')}</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '8px 24px',
          borderRadius: 8,
          border: '1px solid #d1d5db',
          background: '#f9fafb',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        {i18n.t('error_boundary_reload')}
      </button>
    </div>
  );
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    import('./utils/errorTracking').then(({ reportError }) => reportError(error, 'error-boundary'));
    trackEvent('error:boundary', {
      message: error.message.slice(0, 100),
      path: window.location.pathname,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
