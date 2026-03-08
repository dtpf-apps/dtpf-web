import { useEffect, useCallback, useState } from 'react';

export default function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    let cancelled = false;

    function handleWaiting(sw: ServiceWorker) {
      if (!cancelled) {
        setWaitingWorker(sw);
        setUpdateAvailable(true);
      }
    }

    // Listen for CustomEvent from serviceWorkerRegistration.ts
    function onSWUpdate(e: Event) {
      const { waiting } = (e as CustomEvent).detail;
      if (waiting) handleWaiting(waiting);
    }

    document.addEventListener('sw-update-available', onSWUpdate);

    // Directly monitor registration — more reliable than CustomEvent alone
    navigator.serviceWorker?.getRegistration().then((reg) => {
      if (!reg || cancelled) return;

      // Check if there's already a waiting worker
      if (reg.waiting) {
        handleWaiting(reg.waiting);
        return;
      }

      // Listen for future updates directly on the registration
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            handleWaiting(newWorker);
          }
        });
      });
    });

    return () => {
      cancelled = true;
      document.removeEventListener('sw-update-available', onSWUpdate);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [waitingWorker]);

  return { updateAvailable, applyUpdate };
}
