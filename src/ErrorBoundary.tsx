import { Component, type ErrorInfo, type ReactNode } from 'react';
import { trackEvent } from 'utils/analytics';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
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
      return (
        <div style={{ display: 'grid', placeContent: 'center', height: '100vh', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p style={{ marginTop: 16 }}>
            <button onClick={() => window.location.reload()}>Reload</button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
