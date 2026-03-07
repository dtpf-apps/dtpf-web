import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from 'assets/locale/es';
import { en } from 'assets/locale/en';

const savedLang = localStorage.getItem('dtpf-lang');
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: savedLang || browserLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
