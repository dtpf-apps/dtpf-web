import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from 'assets/locale/es';
import { en } from 'assets/locale/en';

const savedLang = localStorage.getItem('dtpf-lang');
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';

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
  lng: savedLang || browserLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

syncDocumentLang(i18n.language);

export default i18n;
