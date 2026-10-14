import { useEffect, useRef } from 'react';
import { trackEvent } from 'utils/analytics';

declare const __BUILD_TIME__: string;

export default function useSWUpdate() {
  const pendingRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    let cancelled = false;

    async function check() {
      if (pendingRef.current) return;
      try {
        const res = await fetch(`/version.json?_=${Date.now()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.buildTime && data.buildTime !== __BUILD_TIME__) {
          pendingRef.current = true;
        }
      } catch {
        // Silently ignore fetch errors (offline, etc.)
      }
    }

    async function clearCaches() {
      try {
        const registrations = await navigator.serviceWorker?.getRegistrations();
        if (registrations) {
          for (const reg of registrations) await reg.unregister();
        }
        const cacheNames = await caches.keys();
        for (const name of cacheNames) await caches.delete(name);
      } catch {
        // Silently ignore cache errors
      }
    }

    // An open dialog (the mobile menu, the gallery lightbox) is the visitor in the middle of something.
    function isUserBusy(): boolean {
      return document.querySelector('[role="dialog"], [aria-modal="true"]') !== null;
    }

    function onNavigationClick(e: MouseEvent) {
      if (!pendingRef.current) return;
      if (isUserBusy()) return;
      const link = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      if (link.origin !== window.location.origin) return;
      if (link.target === '_blank') return;
      e.preventDefault();
      trackEvent('pwa:silent-update', { trigger: 'navigation', path: link.pathname });
      clearCaches().then(() => {
        window.location.href = link.href;
      });
    }

    function onVisibilityChange() {
      if (document.visibilityState !== 'visible') return;
      if (!pendingRef.current) return;
      if (isUserBusy()) return;
      trackEvent('pwa:silent-update', { trigger: 'visibility', path: window.location.pathname });
      clearCaches().then(() => {
        window.location.reload();
      });
    }

    const timeout = setTimeout(check, 5_000);
    const interval = setInterval(check, 30_000);
    document.addEventListener('click', onNavigationClick, true);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const onFocus = () => check();
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearInterval(interval);
      document.removeEventListener('click', onNavigationClick, true);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', onFocus);
    };
  }, []);
}
