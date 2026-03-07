import { createRoot } from 'react-dom/client';
import 'styles/portfolio.css';
import 'utils/i18n';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')!).render(<App />);

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.update();
      window.location.reload();
    }
  },
});
