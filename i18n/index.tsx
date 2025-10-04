import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bm from './locales/bm.json';
import en from './locales/en.json';

const resources = {
    en: { translation: en },
    bm: { translation: bm },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
