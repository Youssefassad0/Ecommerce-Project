import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationFR from '../src/components/local/fr.json';
import TranslationAR from '../src/components/local/ar.json';
import TranslationEN from '../src/components/local/en.json';

const resources = {
  en: {
    translation: TranslationEN
  },
  fr: {
    translation: TranslationFR
  },
  ar:{
    translation: TranslationAR
}
};

i18n
.use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false
    }
    ,
    react:{
      useSuspense:false
    }
  });

  export default i18n;