import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { message } from 'antd';

createRoot(document.getElementById('root')!).render(<App />);
// reportWebVitals(console.log);
serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    const reload = () => window.location.reload();
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.update();
      message.info('Nueva versión. Actualizando la web', reload);
    }
  },
  onSuccess: () => {
    message.info('Web disponible para su uso sin conexión');
  },
});
