import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import de from './locales/de.json';
import ar from './locales/ar.json';
import tr from './locales/tr.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  ar: { translation: ar },
  tr: { translation: tr }
};

// Get saved language from localStorage or default to 'de'
const savedLanguage = localStorage.getItem('lang') || 'de';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // use saved language
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 