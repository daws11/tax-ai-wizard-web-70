import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Four plan cards + enterprise band. Enterprise CTA routes to the partner
 *  page — the old "/contact" target never existed (404). */
const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useLanguageDetection();

  const plans = [
    {
      name: t('trialPlan'),
      tagline: t('site.pricing.trialTagline'),
      price: "$0",
      per: "",
      note: t('site.pricing.trialNote'),
      features: [t('upTo10Messages'), t('site.pricing.trialF2'), t('oneUser')],
      cta: t('startFreeTrial'),
      popular: false,
    },
    {
      name: t('monthlyPlan'),
      tagline: t('site.pricing.monthlyTagline'),
      price: "$99",
      per: "/mo",
      note: t('site.pricing.monthlyNote'),
      features: [t('monthlyMessages'), t('site.pricing.monthlyF2'), t('standardSupport')],
      cta: t('site.pricing.monthlyCta'),
      popular: false,
    },
    {
      name: t('quarterlyPlan'),
      tagline: t('site.pricing.quarterlyTagline'),
      price: "$250",
      per: "/qtr",
      note: t('site.pricing.quarterlyNote'),
      features: [t('quarterlyMessages'), t('allMonthlyFeatures'), t('prioritySupport')],
      cta: t('site.pricing.quarterlyCta'),
      popular: true,
    },
    {
      name: t('yearlyPlan'),
      tagline: t('site.pricing.yearlyTagline'),
      price: "$899",
      per: "/yr",
      note: t('site.pricing.yearlyNote'),
      features: [t('yearlyMessages'), t('twoUsers'), t('prioritySupport')],
      cta: t('site.pricing.yearlyCta'),
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-20 border-y border-slate-200 bg-surface py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('pricing')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('site.pricing.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('site.pricing.subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`reveal flex flex-col rounded-2xl p-7 ${
                plan.popular
                  ? "relative border-2 border-brand-600 bg-white shadow-lift reveal-d2"
                  : "border border-slate-200 bg-white shadow-card"
              } ${i === 1 ? "reveal-d1" : ""} ${i === 3 ? "reveal-d3" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 start-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm rtl:translate-x-1/2">
                  {t('mostPopular')}
                </span>
              )}
              <h3 className="text-base font-extrabold text-navy-900">{plan.name}</h3>
              <p className="mt-1 text-[13px] font-medium text-slate-500">{plan.tagline}</p>
              <p className="mt-5">
                <span className="text-4xl font-extrabold tracking-tight text-navy-900">{plan.price}</span>
                {plan.per && <span className="text-sm font-semibold text-slate-500"> {plan.per}</span>}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">{plan.note}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/registration')}
                className={`mt-7 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  plan.popular
                    ? "bg-brand-600 text-white shadow-sm hover:bg-brand-500"
                    : "border border-slate-300 bg-white text-navy-900 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Enterprise band */}
        <article className="reveal reveal-d1 mt-6 overflow-hidden rounded-2xl bg-navy-950">
          <div className="relative grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div
              className="hero-glow"
              aria-hidden="true"
              style={{ top: 'auto', bottom: '-120px', left: '30%', width: '560px', height: '280px', background: 'radial-gradient(closest-side, rgba(37,99,235,0.22), transparent)', opacity: 0.6 }}
            />
            <div className="relative">
              <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{t('enterprisePlan')}</h3>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-slate-400">{t('site.pricing.entDesc')}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => navigate('/collaborate-with-us')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-navy-900 transition hover:bg-slate-100"
              >
                {t('site.pricing.entCta')}
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </article>

        <p className="reveal mt-6 text-center text-sm text-slate-500">{t('pricingNote')}</p>
      </div>
    </section>
  );
};

export default Pricing;
