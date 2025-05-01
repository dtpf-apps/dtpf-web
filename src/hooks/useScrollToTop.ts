import { useEffect } from 'react';

export default function useScrollToTop(reload?: boolean) {
  useEffect(() => {
    let isMounted = true;
    isMounted && window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [reload]);
  return;
}
