import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/** Three quote cards with initial avatars (no stock photos needed). */
const Testimonials = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();

  const items = [
    {
      quote: t('site.testimonials.t1Quote'),
      name: t('site.testimonials.t1Name'),
      role: t('site.testimonials.t1Role'),
      initials: "MA",
      avatar: "bg-navy-900",
    },
    {
      quote: t('site.testimonials.t2Quote'),
      name: t('site.testimonials.t2Name'),
      role: t('site.testimonials.t2Role'),
      initials: "SK",
      avatar: "bg-brand-600",
    },
    {
      quote: t('site.testimonials.t3Quote'),
      name: t('site.testimonials.t3Name'),
      role: t('site.testimonials.t3Role'),
      initials: "RA",
      avatar: "bg-emerald-700",
    },
  ];

  return (
    <section className="py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('site.testimonials.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('site.testimonials.title')}</h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <figure
              key={i}
              className={`reveal flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card ${
                i === 1 ? "reveal-d1" : i === 2 ? "reveal-d2" : ""
              }`}
            >
              <div className="flex gap-0.5 text-amber-400" aria-label={t('site.testimonials.starsLabel')} role="img">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                "{item.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-extrabold text-white ${item.avatar}`}>
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-900">{item.name}</p>
                  <p className="text-xs font-medium text-slate-500">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
