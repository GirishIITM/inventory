import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './translations';


const langauge = localStorage.getItem("language");
console.log(resources)
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: langauge || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
