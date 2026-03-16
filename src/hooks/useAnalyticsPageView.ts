import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackPageView, trackEvent } from 'utils/analytics';

let perfTracked = false;

export default function useAnalyticsPageView(): void {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
    if (!perfTracked && performance?.getEntriesByType) {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const nav = entries[0];
      if (nav?.loadEventEnd > 0) {
        trackEvent('perf:page-load', {
          duration: Math.round(nav.loadEventEnd - nav.startTime),
          path: location.pathname,
        });
        perfTracked = true;
      }
    }
  }, [location.pathname, location.search]);
}
