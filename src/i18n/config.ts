import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Function to detect browser language and map to supported languages
const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Check if browser language is Arabic or starts with 'ar'
  if (browserLang.startsWith('ar')) {
    return 'ar';
  }
  
  // Check if browser language is English or starts with 'en'
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // Default to English for any other language
  return 'en';
};

// Get the detected language
const detectedLanguage = detectBrowserLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Changed to English as default
    lng: detectedLanguage, // Use detected language
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      // Custom detection function
      convertDetectedLanguage: (lng: string) => {
        // Map detected language to our supported languages
        if (lng.startsWith('ar')) {
          return 'ar';
        }
        if (lng.startsWith('en')) {
          return 'en';
        }
        // Default to English for unsupported languages
        return 'en';
      }
    }
  });

export default i18n; 