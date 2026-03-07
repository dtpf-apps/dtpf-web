import { useEffect, useCallback, useState } from 'react';

export default function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    function onSWUpdate(e: Event) {
      const { waiting } = (e as CustomEvent).detail;
      if (waiting) {
        setWaitingWorker(waiting);
        setUpdateAvailable(true);
      }
    }

    document.addEventListener('sw-update-available', onSWUpdate);
    return () => document.removeEventListener('sw-update-available', onSWUpdate);
  }, []);

  const applyUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [waitingWorker]);

  return { updateAvailable, applyUpdate };
}
