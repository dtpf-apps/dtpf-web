import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from 'assets/locale/es';
import { en } from 'assets/locale/en';

import { langFromPath } from 'router/paths';

// index.html ships `lang="es"`; screen readers and search engines read the attribute,
// so it has to follow the UI language instead of staying pinned to the default.
function syncDocumentLang(lng: string) {
  document.documentElement.lang = lng;
}

i18n.on('languageChanged', syncDocumentLang);

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  // The URL decides, not the browser language: a crawler sends `en-US` and must still be able
  // to reach the Spanish page at `/`. A saved explicit choice is applied by the layout.
  lng: langFromPath(window.location.pathname),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

syncDocumentLang(i18n.language);

export default i18n;
