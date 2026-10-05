import { useTranslation } from "react-i18next";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Four numbered steps with a dashed connector line on desktop. */
const Process = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();

  const steps = [
    { n: "1", title: t('step1'), desc: t('site.steps.s1Desc'), accent: false },
    { n: "2", title: t('step2'), desc: t('site.steps.s2Desc'), accent: false },
    { n: "3", title: t('step3'), desc: t('site.steps.s3Desc'), accent: true },
    { n: "4", title: t('step4'), desc: t('site.steps.s4Desc'), accent: false },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-20 py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('howItWorks')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('site.steps.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('site.steps.subtitle')}</p>
        </div>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <div className="absolute inset-x-0 top-6 hidden border-t-2 border-dashed border-slate-200 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.n} className={`reveal relative ${i === 1 ? "reveal-d1" : i === 2 ? "reveal-d2" : i === 3 ? "reveal-d3" : ""}`}>
              <span
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl text-base font-extrabold text-white shadow-card ${
                  s.accent ? "bg-brand-600" : "bg-navy-900"
                }`}
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-navy-900">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
