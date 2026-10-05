import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Bot, Check } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** ATTO assistant showcase — two-column with a static demo conversation card. */
const AIChat = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();

  const points = [
    { title: t('site.atto.p1Title'), desc: t('site.atto.p1Desc') },
    { title: t('site.atto.p2Title'), desc: t('site.atto.p2Desc') },
    { title: t('site.atto.p3Title'), desc: t('site.atto.p3Desc') },
  ];

  return (
    <section id="demo" className="scroll-mt-20 border-y border-slate-200 bg-surface py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('site.atto.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('site.atto.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('site.atto.subtitle')}</p>

          <ul className="mt-7 space-y-4">
            {points.map((p, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3.5 w-3.5 text-emerald-700" />
                </span>
                <p className="text-[15px] leading-relaxed text-slate-700">
                  <b className="font-bold text-navy-900">{p.title}</b> — {p.desc}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://chat-taxai.onrender.com/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-base font-bold text-white transition hover:bg-navy-800"
            >
              <Bot className="h-5 w-5" />
              {t('site.atto.chatCta')}
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              {t('site.atto.viewPlans')}
            </a>
          </div>
        </div>

        {/* conversation card */}
        <div className="reveal reveal-d1" aria-hidden="true">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lift sm:p-7">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-900">
                <Bot className="h-4 w-4 text-white" />
                <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">ATTO</p>
                <p className="text-[11px] font-medium text-emerald-600">{t('site.atto.onlineStatus')}</p>
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-900 px-4 py-3 text-start text-[13px] leading-relaxed text-white">
                  {t('site.atto.demoUser1')}
                </div>
              </div>

              <div className="flex gap-2.5">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-navy-900">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </span>
                <div className="max-w-[90%] space-y-3 rounded-2xl rounded-tl-md border border-slate-200 bg-slate-50 px-4 py-3.5">
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    <b className="text-navy-900">{t('site.atto.demoAnswerStrong')}</b> {t('site.atto.demoAnswerRest')}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
                      <BookOpen className="h-3 w-3" />{t('site.atto.demoSource1')}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
                      <BookOpen className="h-3 w-3" />{t('site.atto.demoSource2')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-900 px-4 py-3 text-start text-[13px] leading-relaxed text-white" dir="rtl">
                  {t('site.atto.demoUser2')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </span>
                <span className="text-[11px] font-medium text-slate-400">{t('site.atto.typing')}</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] font-medium text-slate-400">{t('site.atto.demoNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
