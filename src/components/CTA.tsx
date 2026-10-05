import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Final navy CTA band. */
const CTA = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();

  return (
    <section className="hero-backdrop py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="hero-grid" aria-hidden="true" />
      <div
        className="hero-glow"
        aria-hidden="true"
        style={{ top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '680px', height: '460px', background: 'radial-gradient(closest-side, rgba(37,99,235,0.26), transparent)' }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="reveal text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t('ctaTitle')}
        </h2>
        <p className="reveal reveal-d1 mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
          {t('ctaSubtitle')}
        </p>
        <div className="reveal reveal-d2 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/agent/ask")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 sm:w-auto"
          >
            {t('startFreeTrial')}
          </button>
          <button
            onClick={() => navigate("/collaborate-with-us")}
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
          >
            {t('site.pricing.entCta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
