// Registration only installs the worker. When the page moves to a new build is decided in
// one place, hooks/useSWUpdate (next navigation or tab re-focus, never mid-interaction), so
// nothing here reloads the page.
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).catch(() => {
      // Some private modes refuse service workers; the site works the same without one.
    });
  });
}
