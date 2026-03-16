import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackPageView } from 'utils/analytics';

export default function useAnalyticsPageView(): void {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
}
