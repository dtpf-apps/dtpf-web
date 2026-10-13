import { createRoot } from 'react-dom/client';
import 'styles/portfolio.css';
import 'utils/i18n';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { removePrerendered } from 'utils/removePrerendered';

removePrerendered();
createRoot(document.getElementById('root')!).render(<App />);

serviceWorkerRegistration.register();
