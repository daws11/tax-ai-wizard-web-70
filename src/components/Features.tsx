import { useTranslation } from "react-i18next";
import { AlertTriangle, ArrowRight, ArrowRightLeft, BarChart3, BookOpen, Check, LayoutDashboard, ShieldCheck, Workflow, Zap } from "lucide-react";

/**
 * Bento-grid feature section (replaces the old auto-rotating carousel).
 * Curated to 6 capabilities with per-card mini visuals.
 */
const Features = () => {
  const { t } = useTranslation();

  const cardBase =
    "rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift";
  const iconBrand =
    "flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100";

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="reveal max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('site.features.eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          {t('site.features.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('site.features.subtitle')}</p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* A — large cell */}
        <article className="reveal group rounded-2xl border border-slate-200 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift lg:col-span-2">
          <div className="grid items-center gap-8 sm:grid-cols-2">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-white shadow-sm">
                <LayoutDashboard className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-navy-900">{t('feature1Title')}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{t('site.features.scaleDesc')}</p>
              <a
                href="#demo"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-all hover:gap-2.5 hover:text-brand-700"
              >
                {t('site.features.scaleCta')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-surface p-5" aria-hidden="true">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>{t('site.features.chartLabel')}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">{t('site.features.chartDelta')}</span>
              </div>
              <div className="mt-4 flex h-28 items-end gap-2">
                <span className="w-full rounded-t-md bg-slate-200" style={{ height: '34%' }} />
                <span className="w-full rounded-t-md bg-slate-200" style={{ height: '52%' }} />
                <span className="w-full rounded-t-md bg-brand-600" style={{ height: '44%' }} />
                <span className="w-full rounded-t-md bg-slate-200" style={{ height: '66%' }} />
                <span className="w-full rounded-t-md bg-slate-200" style={{ height: '58%' }} />
                <span className="w-full rounded-t-md bg-brand-600 shadow-sm" style={{ height: '88%' }} />
                <span className="w-full rounded-t-md bg-slate-200" style={{ height: '72%' }} />
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-400">
                <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
              </div>
            </div>
          </div>
        </article>

        {/* B */}
        <article className={`reveal reveal-d1 ${cardBase}`}>
          <span className={iconBrand}><BarChart3 className="h-5 w-5" /></span>
          <h3 className="mt-5 text-lg font-extrabold tracking-tight text-navy-900">{t('feature2Title')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t('site.features.insightsDesc')}</p>
          <div className="mt-5 flex items-center gap-4 rounded-xl border border-slate-200 bg-surface px-4 py-3" aria-hidden="true">
            <span className="h-12 w-12 shrink-0 rounded-full" style={{ background: 'conic-gradient(#2563EB 0 68%, #E2E8F0 68% 100%)' }} />
            <div className="text-xs">
              <p className="font-bold text-navy-900">{t('site.features.insightsAmount')}</p>
              <p className="font-medium text-slate-500">{t('site.features.insightsStat')}</p>
            </div>
          </div>
        </article>

        {/* C */}
        <article className={`reveal ${cardBase}`}>
          <span className={iconBrand}><Workflow className="h-5 w-5" /></span>
          <h3 className="mt-5 text-lg font-extrabold tracking-tight text-navy-900">{t('feature3Title')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t('site.features.workflowsDesc')}</p>
          <div className="mt-5 space-y-2" aria-hidden="true">
            <span className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t('site.features.workflowStep1')}
            </span>
            <span className="ms-4 block h-3 w-px bg-slate-300" />
            <span className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t('site.features.workflowStep2')}
            </span>
            <span className="ms-4 block h-3 w-px bg-slate-300" />
            <span className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
              <Zap className="h-3.5 w-3.5" />{t('site.features.workflowStep3')}
            </span>
          </div>
        </article>

        {/* D */}
        <article className={`reveal reveal-d1 ${cardBase}`}>
          <span className={iconBrand}><ShieldCheck className="h-5 w-5" /></span>
          <h3 className="mt-5 text-lg font-extrabold tracking-tight text-navy-900">{t('feature4Title')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t('site.features.riskDesc')}</p>
          <div className="mt-5 space-y-2" aria-hidden="true">
            <span className="flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{t('site.features.riskAlert1')}
            </span>
            <span className="flex items-center gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />{t('site.features.riskAlert2')}
            </span>
            <span className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
              <Check className="h-3.5 w-3.5 shrink-0" />{t('site.features.riskOk')}
            </span>
          </div>
        </article>

        {/* E */}
        <article className={`reveal reveal-d2 ${cardBase}`}>
          <span className={iconBrand}><BookOpen className="h-5 w-5" /></span>
          <h3 className="mt-5 text-lg font-extrabold tracking-tight text-navy-900">{t('feature5Title')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{t('site.features.clarityDesc')}</p>
          <div className="mt-5 rounded-xl border border-slate-200 bg-surface p-4" aria-hidden="true">
            <p className="text-xs leading-relaxed text-slate-600">
              {t('site.features.clarityQuote1')} <b className="text-navy-900">{t('site.features.clarityQuoteStrong')}</b> {t('site.features.clarityQuote2')}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
              <BookOpen className="h-3 w-3" />{t('site.features.claritySource')}
            </span>
          </div>
        </article>

        {/* F — wide dark cell */}
        <article className="reveal reveal-d1 rounded-2xl border border-slate-200 bg-navy-900 p-8 shadow-card lg:col-span-3">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                <ArrowRightLeft className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white">{t('feature7Title')}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-400">{t('site.features.reconDesc')}</p>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3" aria-hidden="true">
              <div className="space-y-2">
                <span className="block rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 ring-1 ring-white/10">{t('site.features.reconLeft1')}</span>
                <span className="block rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 ring-1 ring-white/10">{t('site.features.reconLeft2')}</span>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                <Check className="h-5 w-5 text-emerald-400" />
              </span>
              <div className="space-y-2">
                <span className="block rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/25">{t('site.features.reconMatched')}</span>
                <span className="block rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/25">{t('site.features.reconFlagged')}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Features;
