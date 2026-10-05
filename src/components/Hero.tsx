import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowRightLeft, BookOpen, Bot, Check, FileCheck2, FileText, LayoutDashboard, Lock, MessageSquare, Settings } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Dark navy hero with a pure-CSS product mockup of the ATTO chat app. */
const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useLanguageDetection();

  return (
    <section className="hero-backdrop pb-0 pt-32 lg:pt-40" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="hero-grid" aria-hidden="true" />
      <div
        className="hero-glow"
        aria-hidden="true"
        style={{ top: '-220px', left: '50%', transform: 'translateX(-70%)', width: '720px', height: '520px', background: 'radial-gradient(closest-side, rgba(37,99,235,0.28), transparent)' }}
      />
      <div
        className="hero-glow"
        aria-hidden="true"
        style={{ top: '-160px', left: '50%', transform: 'translateX(30%)', width: '640px', height: '480px', background: 'radial-gradient(closest-side, rgba(3,105,161,0.22), transparent)', filter: 'blur(48px)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 px-3 text-xs font-semibold text-slate-300 pe-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t('site.hero.badge')}
            </span>
          </div>

          <h1 className="reveal reveal-d1 mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">{t('site.hero.title1')}</span>
            <span className="block bg-gradient-to-r from-brand-400 via-sky-300 to-brand-500 bg-clip-text text-transparent">
              {t('site.hero.title2')}
            </span>
          </h1>

          <p className="reveal reveal-d2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {t('site.hero.subtitle')}
          </p>

          <div className="reveal reveal-d3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/agent/ask")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 sm:w-auto"
            >
              {t('startFreeTrial')}
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
            >
              {t('site.hero.cta2')}
            </button>
          </div>

          <p className="reveal reveal-d3 mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />{t('site.hero.trialDays')}</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />{t('noCreditCardRequired')}</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />{t('site.hero.ftaAligned')}</span>
          </p>
        </div>

        {/* Product mockup — overlaps into the section below */}
        <div className="reveal relative z-10 mx-auto -mb-28 mt-16 max-w-5xl lg:mt-20" aria-hidden="true">
          {/* floating chips */}
          <div className="absolute -right-6 -top-8 z-20 hidden rounded-xl border border-white/10 bg-navy-800/90 px-4 py-3 shadow-float backdrop-blur lg:block">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15"><Check className="h-4 w-4 text-emerald-400" /></span>
              <div>
                <p className="text-xs font-semibold text-white">{t('site.mockup.float1Title')}</p>
                <p className="text-[11px] text-slate-400">{t('site.mockup.float1Sub')}</p>
              </div>
            </div>
          </div>
          <div className="absolute -left-8 bottom-16 z-20 hidden rounded-xl border border-white/10 bg-navy-800/90 px-4 py-3 shadow-float backdrop-blur lg:block">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15"><FileText className="h-4 w-4 text-brand-400" /></span>
              <div>
                <p className="text-xs font-semibold text-white">{t('site.mockup.float2Title')}</p>
                <p className="text-[11px] text-slate-400">{t('site.mockup.float2Sub')}</p>
              </div>
            </div>
          </div>

          {/* app window */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-hero ring-1 ring-white/10">
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
                <Lock className="h-3 w-3 text-slate-400" />
                {t('site.mockup.url')}
              </div>
              <div className="w-12" />
            </div>

            <div className="grid md:grid-cols-[200px_1fr]">
              {/* sidebar */}
              <aside className="hidden border-e border-slate-100 bg-slate-50/70 p-3 md:block">
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 ring-1 ring-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-navy-900 text-[10px] font-extrabold text-white">T</span>
                  <span className="text-xs font-bold text-slate-800">TaxAI</span>
                </div>
                <nav className="space-y-0.5 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-2 rounded-lg bg-navy-900 px-2.5 py-2 text-white"><MessageSquare className="h-3.5 w-3.5" />{t('site.mockup.navChat')}</span>
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2"><LayoutDashboard className="h-3.5 w-3.5" />{t('site.mockup.navDashboard')}</span>
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2"><FileText className="h-3.5 w-3.5" />{t('site.mockup.navFilings')}</span>
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2"><ArrowRightLeft className="h-3.5 w-3.5" />{t('site.mockup.navRecon')}</span>
                  <span className="flex items-center gap-2 rounded-lg px-2.5 py-2"><Settings className="h-3.5 w-3.5" />{t('site.mockup.navSettings')}</span>
                </nav>
                <div className="mt-6 rounded-lg border border-dashed border-slate-200 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{t('site.mockup.planLabel')}</p>
                  <p className="text-xs font-bold text-slate-700">{t('site.mockup.planName')}</p>
                </div>
              </aside>

              {/* chat */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3">
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-900">
                    <Bot className="h-4 w-4 text-white" />
                    <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">ATTO</p>
                    <p className="text-[11px] font-medium text-emerald-600">{t('site.mockup.status')}</p>
                  </div>
                </div>

                <div className="space-y-4 px-5 py-5">
                  {/* user message */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-900 px-4 py-3 text-start text-[13px] leading-relaxed text-white">
                      {t('site.mockup.userMsg')}
                    </div>
                  </div>
                  {/* ATTO message */}
                  <div className="flex gap-2.5">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-900">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </span>
                    <div className="max-w-[90%] space-y-3 rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3.5">
                      <p className="text-[13px] leading-relaxed text-slate-700">{t('site.mockup.answerIntro')}</p>
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13px]">
                        <p className="font-bold text-slate-900">
                          {t('site.mockup.answerLabel')} <span className="text-emerald-700">{t('site.mockup.answerAmount')}</span>
                        </p>
                        <p className="mt-0.5 text-[12px] text-slate-500">{t('site.mockup.answerDetail')}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
                          <BookOpen className="h-3 w-3" />{t('site.mockup.source1')}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
                          <BookOpen className="h-3 w-3" />{t('site.mockup.source2')}
                        </span>
                      </div>
                      <div className="flex gap-2 border-t border-slate-200 pt-2.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                          <FileCheck2 className="h-3 w-3" />{t('site.mockup.action1')}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                          <Check className="h-3 w-3" />{t('site.mockup.action2')}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* typing indicator */}
                  <div className="flex items-center gap-2 ps-10">
                    <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                      <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
