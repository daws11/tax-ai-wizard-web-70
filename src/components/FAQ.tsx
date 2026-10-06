import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Single-open FAQ accordion built on native buttons with full aria wiring. */
const FAQ = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  const triggersRef = useRef<Array<HTMLButtonElement | null>>([]);

  const faqs = [
    { q: t('faqQuestion1'), a: t('faqAnswer1') },
    { q: t('faqQuestion2'), a: t('faqAnswer2') },
    { q: t('faqQuestion4'), a: t('faqAnswer4') },
    { q: t('site.faq.arabicQ'), a: t('site.faq.arabicA') },
    { q: t('faqQuestion8'), a: t('faqAnswer8') },
    { q: t('faqQuestion12'), a: t('faqAnswer12') },
    { q: t('site.faq.trialEndQ'), a: t('site.faq.trialEndA') },
    { q: t('faqQuestion9'), a: t('faqAnswer9') },
  ];

  const setPanel = (btn: HTMLButtonElement, open: boolean) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    btn.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
  };

  const onToggle = (index: number) => {
    const btn = triggersRef.current[index];
    if (!btn) return;
    const willOpen = btn.getAttribute('aria-expanded') !== 'true';
    triggersRef.current.forEach((other) => {
      if (other && other !== btn) setPanel(other, false);
    });
    setPanel(btn, willOpen);
  };

  // Keep the open panel's max-height in sync when content re-wraps on resize.
  useEffect(() => {
    const onResize = () => {
      triggersRef.current.forEach((btn) => {
        if (btn && btn.getAttribute('aria-expanded') === 'true') setPanel(btn, true);
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-slate-200 bg-surface py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('faq')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('site.faq.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {t('site.faq.subtitle')}{' '}
            <a href="https://chat-taxai.onrender.com/" className="font-bold text-brand-600 underline decoration-brand-200 underline-offset-4 hover:text-brand-700">
              {t('site.faq.askDirect')}
            </a>.
          </p>
        </div>

        <div className="reveal reveal-d1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
          {faqs.map((item, i) => {
            const panelId = `faq-panel-${i}`;
            const open = i === 0;
            return (
              <div key={i}>
                <h3>
                  <button
                    ref={(el) => { triggersRef.current[i] = el; }}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => onToggle(i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="text-[15px] font-bold text-navy-900">{item.q}</span>
                    <ChevronDown className="accordion-icon h-5 w-5 shrink-0 text-slate-400" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className="accordion-panel"
                  style={{ maxHeight: open ? undefined : '0px' }}
                  ref={(el) => {
                    if (el && open && el.style.maxHeight === '') {
                      el.style.maxHeight = `${el.scrollHeight}px`;
                    }
                  }}
                >
                  <p className="whitespace-pre-line px-6 pb-5 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
