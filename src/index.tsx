import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import './index.scss';
import App from './App';
// import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { message } from 'antd';

ReactDOM.render(<App />, document.getElementById('root'));
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
