import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import useAnalyticsPageView from '../../src/hooks/useAnalyticsPageView';

vi.mock('../../src/utils/analytics', () => ({
  trackPageView: vi.fn(),
  trackEvent: vi.fn(),
}));

import { trackPageView, trackEvent } from '../../src/utils/analytics';

function wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter initialEntries={['/projects?q=dauth']}>{children}</MemoryRouter>;
}

describe('useAnalyticsPageView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls trackPageView on initial render with pathname + search', () => {
    renderHook(() => useAnalyticsPageView(), { wrapper });

    expect(trackPageView).toHaveBeenCalledWith('/projects?q=dauth');
  });

  it('calls trackPageView with just pathname when no search params', () => {
    function wrapperNoSearch({ children }: { children: React.ReactNode }) {
      return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>;
    }

    renderHook(() => useAnalyticsPageView(), { wrapper: wrapperNoSearch });

    expect(trackPageView).toHaveBeenCalledWith('/');
  });

  it('calls trackPageView once per render', () => {
    renderHook(() => useAnalyticsPageView(), { wrapper });

    expect(trackPageView).toHaveBeenCalledTimes(1);
  });

  it('includes search params in tracked URL', () => {
    function wrapperSearch({ children }: { children: React.ReactNode }) {
      return <MemoryRouter initialEntries={['/contact?ref=home']}>{children}</MemoryRouter>;
    }

    renderHook(() => useAnalyticsPageView(), { wrapper: wrapperSearch });

    expect(trackPageView).toHaveBeenCalledWith('/contact?ref=home');
  });

  it('tracks different routes correctly', () => {
    function wrapperAbout({ children }: { children: React.ReactNode }) {
      return <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>;
    }

    renderHook(() => useAnalyticsPageView(), { wrapper: wrapperAbout });

    expect(trackPageView).toHaveBeenCalledWith('/about');
  });

  it('tracks perf:page-load when loadEventEnd > 0', () => {
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([
      { loadEventEnd: 500, startTime: 0 } as PerformanceNavigationTiming,
    ]);

    renderHook(() => useAnalyticsPageView(), { wrapper });

    expect(trackEvent).toHaveBeenCalledWith('perf:page-load', {
      duration: 500,
      path: '/projects',
    });

    (performance.getEntriesByType as ReturnType<typeof vi.fn>).mockRestore();
  });
});
