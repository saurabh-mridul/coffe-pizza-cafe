/**
 * i18n Configuration
 *
 * @module i18n/config
 * @description Configures react-i18next for internationalization
 * @feature 001-sso-home-page
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';

/**
 * Supported languages
 */
export const supportedLanguages = ['en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

/**
 * Default language
 */
export const defaultLanguage: SupportedLanguage = 'en';

/**
 * i18n resources
 */
const resources = {
  en: {
    translation: en,
  },
};

/**
 * Initialize i18next
 */
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false, // React already handles XSS
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
