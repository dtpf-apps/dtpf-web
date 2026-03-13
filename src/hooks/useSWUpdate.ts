import { useEffect, useCallback, useState } from 'react';

declare const __BUILD_TIME__: string;

export default function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    let cancelled = false;

    async function check() {
      try {
        const res = await fetch(`/version.json?_=${Date.now()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.buildTime && data.buildTime !== __BUILD_TIME__) {
          setUpdateAvailable(true);
        }
      } catch {
        // Network error — skip silently
      }
    }

    // First check after 5s (give deploy time to finish)
    const timeout = setTimeout(check, 5_000);

    // Then check every 30s
    const interval = setInterval(check, 30_000);

    // Also check when app comes to foreground
    const onVisible = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, []);

  const applyUpdate = useCallback(async () => {
    // Unregister SW and clear all caches to ensure a clean reload.
    // The new page load will re-register the SW with fresh precache.
    const registrations = await navigator.serviceWorker?.getRegistrations();
    if (registrations) {
      for (const reg of registrations) await reg.unregister();
    }
    const cacheNames = await caches.keys();
    for (const name of cacheNames) await caches.delete(name);
    window.location.reload();
  }, []);

  return { updateAvailable, applyUpdate };
}
