import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Check, Mail, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

/**
 * Privacy policy — TOC with scroll-spy + numbered sections.
 * Legal copy comes verbatim from the i18n files; do not rewrite it here.
 */
const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  useScrollReveal();
  const tocRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const sections = [
    { id: "s1", title: t('privacy_policy_introduction'), body: t('privacy_policy_introduction_text') },
    { id: "s2", title: t('information_collection'), body: t('information_collection_text') },
    { id: "s3", title: t('information_usage'), body: t('information_usage_text') },
    { id: "s4", title: t('data_sharing'), body: t('data_sharing_text') },
    { id: "s5", title: t('data_security'), body: t('data_security_text') },
    { id: "s6", title: t('children_privacy'), body: t('children_privacy_text') },
    { id: "s7", title: t('data_retention'), body: t('data_retention_text') },
    { id: "s8", title: t('cookies_links'), body: t('cookies_links_text') },
    { id: "s9", title: t('user_rights'), body: t('user_rights_text') },
    { id: "s10", title: t('policy_changes'), body: t('policy_changes_text') },
  ];

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tocRefs.current.forEach((l) => l?.classList.remove("active"));
            const link = tocRefs.current.find((l) => l?.getAttribute("href") === `#${entry.target.id}`);
            link?.classList.add("active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBody = (body: string) => {
    const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      return <p className="text-[15px] leading-relaxed text-slate-600">{body}</p>;
    }
    return (
      <>
        <ul className="space-y-2.5 text-[15px] leading-relaxed text-slate-600">
          {lines.slice(0, -1).map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{lines[lines.length - 1]}</p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Page header */}
      <div className="border-b border-slate-200 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{t('site.legal.eyebrow')}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{t('privacy_policy')}</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {t('last_updated')}: {t('last_updated_date')}
          </p>
        </div>
      </div>

      {/* Content + TOC */}
      <div className="mx-auto max-w-7xl gap-14 px-6 py-14 lg:grid lg:grid-cols-[240px_1fr] lg:py-20">
        <aside className="mb-10 lg:mb-0" aria-label="Table of contents">
          <nav className="lg:sticky lg:top-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{t('site.legal.onThisPage')}</h2>
            <ol className="mt-4 space-y-0.5 border-slate-200 text-sm font-medium text-slate-600 lg:border-s">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    ref={(el) => { tocRefs.current[i] = el; }}
                    className="toc-link block border-s-2 border-transparent py-1.5 ps-4 hover:text-navy-900"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="max-w-3xl">
          {/* Compliance callout */}
          <div className="reveal rounded-2xl border border-brand-100 bg-brand-50/70 p-6">
            <div className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card ring-1 ring-brand-100">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-800">{t('site.legal.regCommitTitle')}</h2>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-navy-900">{t('privacy_policy_compliance')}</p>
              </div>
            </div>
          </div>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="reveal mt-12 scroll-mt-24 border-t border-slate-100 pt-10">
              <p className="text-xs font-bold tracking-widest text-brand-600">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">{s.title}</h2>
              <div className="mt-4">{renderBody(s.body)}</div>
            </section>
          ))}

          {/* Contact */}
          <div className="reveal mt-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Mail className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-extrabold tracking-tight text-navy-900">{t('contact_us')}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                  {t('contact_us_text').split("privacy@taxai.ae")[0]}
                  <a href="mailto:privacy@taxai.ae" className="font-semibold text-brand-600 hover:text-brand-700">privacy@taxai.ae</a>
                  {t('contact_us_text').split("privacy@taxai.ae")[1]}
                </p>
              </div>
              <a
                href="mailto:privacy@taxai.ae"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
              >
                {t('contact_us')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
