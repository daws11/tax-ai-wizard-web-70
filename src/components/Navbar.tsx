import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { changeLanguage, isRTL } = useLanguageDetection();

  const isHomePage = location.pathname === '/';

  const handleNavigation = (path: string, elementId?: string) => {
    setIsMenuOpen(false);
    
    if (path === '/' && elementId) {
      if (isHomePage) {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  // changeLanguage function is now provided by useLanguageDetection hook

  const renderNavigationLinks = () => {
    if (isHomePage) {
      return (
        <>
          <button onClick={() => handleNavigation('/', 'features')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('features')}</button>
          <button onClick={() => handleNavigation('/', 'how-it-works')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('howItWorks')}</button>
          <button onClick={() => handleNavigation('/', 'faq')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('faq')}</button>
          <button onClick={() => handleNavigation('/', 'pricing')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('pricing')}</button>
          <button onClick={() => handleNavigation('/blog')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('blogNav')}</button>
        </>
      );
    }
    return (
      <>
        <button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('home')}</button>
        <button onClick={() => handleNavigation('/', 'pricing')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('pricing')}</button>
        <button onClick={() => handleNavigation('/blog')} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300 transition-colors duration-200">{t('blogNav')}</button>
      </>
    );
  };

  const renderMobileNavigationLinks = () => {
    if (isHomePage) {
      return (
        <>
          <button onClick={() => handleNavigation('/', 'features')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('features')}</button>
          <button onClick={() => handleNavigation('/', 'how-it-works')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('howItWorks')}</button>
          <button onClick={() => handleNavigation('/', 'faq')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('faq')}</button>
          <button onClick={() => handleNavigation('/', 'pricing')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('pricing')}</button>
          <button onClick={() => handleNavigation('/blog')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('blogNav')}</button>
        </>
      );
    }
    return (
      <>
        <button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('home')}</button>
        <button onClick={() => handleNavigation('/', 'pricing')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('pricing')}</button>
        <button onClick={() => handleNavigation('/blog')} className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left dark:text-gray-300 transition-colors duration-200">{t('blogNav')}</button>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 glass-effect" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className={`flex-shrink-0 cursor-pointer flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} onClick={() => handleNavigation('/')}>
              <img
                src="/lovable-uploads/logo%20circle.png"
                alt="TaxAI Logo"
                className="h-14 w-auto sm:h-11 md:h-14 lg:h-17"
              />
              <h2 className={`text-2xl font-extrabold tracking-wider text-primary px-3 py-1 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ${isRTL ? 'mr-3' : 'ml-3'}`}>
                TaxAi
              </h2>
            </div>
          </div>
          <div className="hidden md:block">
            <div className={`${isRTL ? 'mr-10' : 'ml-10'} flex items-baseline ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {renderNavigationLinks()}
              <Select
                value={i18n.language}
                onValueChange={changeLanguage}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={i18n.language === 'ar' ? 'اللغة' : 'Language'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="ar">🇦🇪 العربية</SelectItem>
                </SelectContent>
              </Select>
              <ThemeToggle />
              <Button
                onClick={() => { window.location.href = 'https://ask.taxai.ae/'; }}
                variant="outline"
                className={`${isRTL ? 'mr-4' : 'ml-4'} border-primary text-primary hover:bg-primary hover:text-white`}
              >
                {t('login')}
              </Button>
              <Button
                onClick={() => handleNavigation("/agent/ask")}
                className={`${isRTL ? 'mr-4' : 'ml-4'} bg-primary hover:bg-primary/90`}
              >
                {t('getStarted')}
              </Button>
            </div>
          </div>
          <div className={`${isRTL ? '-ml-2' : '-mr-2'} flex md:hidden items-center`}>
            <Select
              value={i18n.language}
              onValueChange={changeLanguage}
            >
              <SelectTrigger className={`w-[120px] ${isRTL ? 'ml-2' : 'mr-2'}`}>
                <SelectValue placeholder={i18n.language === 'ar' ? 'اللغة' : 'Language'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="ar">🇦🇪 العربية</SelectItem>
              </SelectContent>
            </Select>
            <ThemeToggle />
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{i18n.language === 'ar' ? 'فتح القائمة الرئيسية' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect ${isRTL ? 'text-right' : 'text-left'}`}>
            {renderMobileNavigationLinks()}
            <div className={`flex items-center px-3 py-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
                {i18n.language === 'ar' ? 'المظهر:' : 'Theme:'}
              </span>
              <ThemeToggle />
            </div>
            <Button
              onClick={() => { window.location.href = 'https://ask.taxai.ae/'; }}
              variant="outline"
              className="mt-2 w-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              {t('login')}
            </Button>
            <Button
              onClick={() => handleNavigation("/agent/ask")}
              className="mt-2 w-full bg-primary hover:bg-primary/90"
            >
              {t('getStarted')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
