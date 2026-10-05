import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Disclaimer — legal shell with a key-warning callout and related links. */
const Disclaimer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Page header */}
      <div className="border-b border-slate-200 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('site.legal.eyebrow')}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('disclaimerTitle')}</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {t('last_updated')}: {t('last_updated_date')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Key warning callout */}
          <div className="reveal rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-card ring-1 ring-amber-200">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-amber-800">{t('site.legal.notProfessionalTitle')}</h2>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-navy-900">{t('site.legal.calloutBody')}</p>
              </div>
            </div>
          </div>

          {/* Notice body (verbatim) */}
          <section className="reveal mt-10">
            <p className="text-[15px] leading-relaxed text-slate-600">{t('disclaimerContent')}</p>
          </section>

          {/* Related links */}
          <div className="reveal mt-12 grid gap-4 sm:grid-cols-2">
            <Link to="/privacy-policy" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
              <div>
                <p className="text-sm font-extrabold text-navy-900">{t('privacy_policy')}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{t('site.legal.privacyDesc')}</p>
              </div>
              <ArrowRight className={`h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-brand-600 rtl:rotate-180 ${isRTL ? '' : 'group-hover:translate-x-1'}`} />
            </Link>
            <Link to="/collaborate-with-us" className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
              <div>
                <p className="text-sm font-extrabold text-navy-900">{t('site.nav.partner')}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{t('site.legal.partnerDesc')}</p>
              </div>
              <ArrowRight className={`h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-brand-600 rtl:rotate-180 ${isRTL ? '' : 'group-hover:translate-x-1'}`} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
