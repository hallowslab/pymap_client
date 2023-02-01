import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Locale files
import en from './locales/en/main.json'
import pt from './locales/pt/main.json'
import enOptions from './locales/en/options.json'
import ptOptions from './locales/pt/options.json'

let resources = {
    en: {
        main: en,
        options: enOptions,
    },
    'pt-PT': {
        main: pt,
        options: ptOptions,
    },
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
