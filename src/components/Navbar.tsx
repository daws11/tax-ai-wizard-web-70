import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/**
 * Site navbar. Renders the dark (over-navy) variant on the homepage and the
 * light variant on inner pages. Theme switching was removed — the current
 * design system is a fixed light-hybrid.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { changeLanguage, isRTL } = useLanguageDetection();

  const isHomePage = location.pathname === "/";
  const dark = isHomePage; // dark variant sits on the navy hero

  useEffect(() => {
    if (!dark) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dark]);

  const handleNavigation = (path: string, elementId?: string) => {
    setIsMenuOpen(false);
    if (path === "/" && elementId) {
      if (isHomePage) {
        document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  const linkBase = dark
    ? "text-sm font-semibold text-slate-300 transition hover:text-white"
    : "text-sm font-semibold text-slate-600 transition hover:text-navy-900";
  const linkActive = dark ? "text-sm font-bold text-white" : "text-sm font-bold text-brand-600";

  const links = isHomePage ? (
    <>
      <button onClick={() => handleNavigation("/", "features")} className={linkBase}>{t('features')}</button>
      <button onClick={() => handleNavigation("/", "demo")} className={linkBase}>{t('site.nav.assistant')}</button>
      <button onClick={() => handleNavigation("/", "how-it-works")} className={linkBase}>{t('howItWorks')}</button>
      <button onClick={() => handleNavigation("/", "pricing")} className={linkBase}>{t('pricing')}</button>
      <button onClick={() => handleNavigation("/", "faq")} className={linkBase}>{t('faq')}</button>
      <button onClick={() => handleNavigation("/blog")} className={linkBase}>{t('blogNav')}</button>
    </>
  ) : (
    <>
      <button onClick={() => handleNavigation("/")} className={linkBase}>{t('home')}</button>
      <button onClick={() => handleNavigation("/", "features")} className={linkBase}>{t('features')}</button>
      <button onClick={() => handleNavigation("/", "pricing")} className={linkBase}>{t('pricing')}</button>
      <button onClick={() => handleNavigation("/blog")} className={linkBase}>{t('blogNav')}</button>
    </>
  );

  const partnerLink = (
    <button
      onClick={() => handleNavigation("/collaborate-with-us")}
      className={location.pathname === "/collaborate-with-us" ? linkActive : linkBase}
    >
      {t('site.nav.partner')}
    </button>
  );

  const loginBtn = (
    <a
      href="https://ask.taxai.ae/"
      className={
        dark
          ? "rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          : "rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-navy-900"
      }
    >
      {t('login')}
    </a>
  );

  const ctaBtn = (
    <button
      onClick={() => handleNavigation("/agent/ask")}
      className={
        dark
          ? "rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy-900 shadow-sm transition hover:bg-slate-100"
          : "rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-navy-800"
      }
    >
      {t('getStarted')}
    </button>
  );

  const langSelect = (
    <Select value={i18n.language.startsWith('ar') ? 'ar' : 'en'} onValueChange={changeLanguage}>
      <SelectTrigger className={
        dark
          ? "h-9 w-[104px] border-white/15 bg-white/5 text-sm text-white"
          : "h-9 w-[104px] border-slate-300 bg-white text-sm text-navy-900"
      }>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="ar">🇦🇪 العربية</SelectItem>
      </SelectContent>
    </Select>
  );

  const headerCls = dark
    ? `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy-950/85 shadow-lg shadow-black/20 backdrop-blur-md" : ""}`
    : "sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur";

  return (
    <header className={headerCls} dir={isRTL ? 'rtl' : 'ltr'}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Main">
        <button onClick={() => handleNavigation("/")} className="flex items-center gap-2.5" aria-label="TaxAI home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-navy-900 text-sm font-extrabold text-white shadow-sm">T</span>
          <span className={`text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>TaxAI</span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {links}
          {partnerLink}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {langSelect}
          {loginBtn}
          {ctaBtn}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="scale-90">{langSelect}</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? (i18n.language === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (i18n.language === 'ar' ? 'فتح القائمة' : 'Open menu')}
            className={`rounded-lg p-2 ${dark ? "text-white" : "text-navy-900"}`}
          >
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className={
            dark
              ? "border-t border-white/10 bg-navy-950/95 px-6 pb-6 pt-4 backdrop-blur lg:hidden"
              : "border-t border-slate-200 bg-white px-6 pb-6 pt-4 lg:hidden"
          }
        >
          <div className="flex flex-col gap-1">
            {isHomePage ? (
              <>
                <button onClick={() => handleNavigation("/", "features")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('features')}</button>
                <button onClick={() => handleNavigation("/", "demo")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('site.nav.assistant')}</button>
                <button onClick={() => handleNavigation("/", "how-it-works")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('howItWorks')}</button>
                <button onClick={() => handleNavigation("/", "pricing")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('pricing')}</button>
                <button onClick={() => handleNavigation("/", "faq")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('faq')}</button>
              </>
            ) : (
              <>
                <button onClick={() => handleNavigation("/")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('home')}</button>
                <button onClick={() => handleNavigation("/", "features")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('features')}</button>
                <button onClick={() => handleNavigation("/", "pricing")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('pricing')}</button>
              </>
            )}
            <button onClick={() => handleNavigation("/blog")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('blogNav')}</button>
            <button onClick={() => handleNavigation("/collaborate-with-us")} className={`rounded-lg px-3 py-2.5 text-start text-sm font-semibold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}>{t('site.nav.partner')}</button>
            <div className={`mt-3 flex gap-3 border-t pt-4 ${dark ? "border-white/10" : "border-slate-200"}`}>
              <a href="https://ask.taxai.ae/" className={`flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-semibold ${dark ? "border-white/15 text-white" : "border-slate-300 text-navy-900"}`}>{t('login')}</a>
              <button onClick={() => handleNavigation("/agent/ask")} className={`flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-bold ${dark ? "bg-white text-navy-900" : "bg-navy-900 text-white"}`}>{t('getStarted')}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
