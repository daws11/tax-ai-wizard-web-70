import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Komponen untuk debugging language detection
 * Hanya aktif di development mode
 */
export const LanguageDebugger = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🌍 Language Detection Debug Info:');
      console.log('Browser Language:', navigator.language);
      console.log('Browser Languages:', navigator.languages);
      console.log('Current i18n Language:', i18n.language);
      console.log('Document Direction:', document.documentElement.dir);
      console.log('Document Language:', document.documentElement.lang);
      
      // Listen for language changes
      const handleLanguageChange = (lng: string) => {
        console.log('🔄 Language changed to:', lng);
        console.log('New Direction:', document.documentElement.dir);
      };

      i18n.on('languageChanged', handleLanguageChange);

      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }
  }, [i18n]);

  // Don't render anything in production
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Lang: {i18n.language}</div>
      <div>Dir: {document.documentElement.dir}</div>
    </div>
  );
};
