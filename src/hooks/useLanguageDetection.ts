import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook untuk menangani auto language detection dan direction setting
 */
export const useLanguageDetection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Function to set document direction based on language
    const setDocumentDirection = (language: string) => {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    };

    // Set initial direction based on current language
    setDocumentDirection(i18n.language);

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      setDocumentDirection(lng);
    };

    // Add event listener for language changes
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup function
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Function to change language and update direction
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return {
    changeLanguage,
    currentLanguage: i18n.language,
    isRTL: i18n.language === 'ar'
  };
};
