import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Lock, ShieldCheck } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Enterprise footer: brand, four link columns, compliance badges. */
const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t('site.footer.product'),
      links: [
        { label: t('features'), to: "/", hash: "features" },
        { label: t('site.nav.assistant'), to: "/", hash: "demo" },
        { label: t('howItWorks'), to: "/", hash: "how-it-works" },
        { label: t('pricing'), to: "/", hash: "pricing" },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('blogNav'), to: "/blog" },
        { label: t('site.nav.partner'), to: "/collaborate-with-us" },
        { label: t('about'), to: "#" },
        { label: t('careers'), to: "#" },
      ],
    },
    {
      title: t('legal'),
      links: [
        { label: t('privacy_policy'), to: "/privacy-policy" },
        { label: t('disclaimer'), to: "/disclaimer" },
        { label: t('terms'), to: "#" },
      ],
    },
  ];

  const compliance = [
    { icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />, label: t('site.footer.ftaBadge') },
    { icon: <Lock className="h-3.5 w-3.5 text-emerald-400" />, label: t('site.footer.adgmBadge') },
    { icon: <Globe className="h-3.5 w-3.5 text-emerald-400" />, label: t('site.footer.gdprBadge') },
  ];

  const goToSection = (hash: string) => {
    if (location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-slate-400" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="TaxAI home">
              <img src="/lovable-uploads/logo%20dark.png" alt="TaxAI logo" className="h-9 w-auto" />
              <span className="text-lg font-extrabold tracking-tight text-white">TaxAI</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t('site.footer.tagline')}</p>
            <div className="mt-5 flex gap-2">
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
              </a>
              <a href="https://x.com/TaxAI_AE" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.3 17.4z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to === "#" ? (
                      <a href="#" className="transition hover:text-white">{link.label}</a>
                    ) : link.hash ? (
                      <button onClick={() => goToSection(link.hash!)} className="transition hover:text-white">
                        {link.label}
                      </button>
                    ) : (
                      <Link to={link.to} className="transition hover:text-white">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">{t('site.footer.compliance')}</h3>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold">
              {compliance.map((c) => (
                <li key={c.label}>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    {c.icon}
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>{t('site.footer.copyright', { year })}</p>
          <p className="text-slate-500">{t('site.footer.note')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
