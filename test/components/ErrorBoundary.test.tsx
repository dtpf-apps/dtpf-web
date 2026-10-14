import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router';
import ErrorBoundary, { RouteErrorFallback } from '../../src/ErrorBoundary';
import { reportError } from '../../src/utils/errorTracking';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

vi.mock('../../src/utils/errorTracking', () => ({
  reportError: vi.fn(),
}));

function ThrowError({ shouldThrow, message }: { shouldThrow: boolean; message?: string }) {
  if (shouldThrow) throw new Error(message || 'Test error');
  return <div>Child content</div>;
}

function ThrowChunkError(): never {
  throw new Error('Failed to fetch dynamically imported module /assets/Home-abc123.js');
}

describe('ErrorBoundary', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('shows fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows a Reload button for generic errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('shows error description for generic errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
  });

  it('offers Reload for a chunk that still fails after the automatic retry', () => {
    render(
      <ErrorBoundary>
        <ThrowChunkError />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('calls trackEvent on error', async () => {
    const { trackEvent } = await import('../../src/utils/analytics');
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(trackEvent).toHaveBeenCalledWith(
      'error:boundary',
      expect.objectContaining({ message: 'Test error' })
    );
  });

  it('reports the error to the API', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error' }),
      'error-boundary'
    );
  });

  it('catches what a page throws inside the router, which the class boundary never sees', () => {
    const router = createMemoryRouter([
      {
        element: <Outlet />,
        errorElement: <RouteErrorFallback />,
        children: [{ path: '/', element: <ThrowError shouldThrow={true} message="page crash" /> }],
      },
    ]);
    render(
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'page crash' }),
      'error-boundary'
    );
  });

  it('reports a thrown value that is not an Error as one, with the value as its message', () => {
    function ThrowString(): never {
      throw 'page threw a string';
    }
    const router = createMemoryRouter([
      { path: '/', element: <ThrowString />, errorElement: <RouteErrorFallback /> },
    ]);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
    expect(reportError).toHaveBeenCalledWith(new Error('page threw a string'), 'error-boundary');
  });

  it('Reload button calls window.location.reload', async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock, pathname: '/' },
      writable: true,
      configurable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Reload' }));
    expect(reloadMock).toHaveBeenCalled();
  });
});
