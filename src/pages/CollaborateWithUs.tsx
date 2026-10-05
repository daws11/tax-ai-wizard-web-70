import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Check, Sparkles, TrendingUp, UploadCloud, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";
import apiService from "@/services/api";

const partnershipTypes = [
  { key: "collaborateWithUs.taxAgent", descKey: "site.collab.typeTaxAgentDesc" },
  { key: "collaborateWithUs.taxAdvisoryFirm", descKey: "site.collab.typeAdvisoryDesc" },
  { key: "collaborateWithUs.accountingFirm", descKey: "site.collab.typeAccountingDesc" },
  { key: "collaborateWithUs.technologyPartner", descKey: "site.collab.typeTechDesc" },
  { key: "collaborateWithUs.other", descKey: "site.collab.typeOtherDesc" },
];

interface FormState {
  fullName: string;
  companyName: string;
  designation: string;
  email: string;
  phone: string;
  website: string;
  otherPartnershipType: string;
  licenseNumber: string;
  servicesDescription: string;
  whyPartner: string;
}

const initialForm: FormState = {
  fullName: "",
  companyName: "",
  designation: "",
  email: "",
  phone: "",
  website: "",
  otherPartnershipType: "",
  licenseNumber: "",
  servicesDescription: "",
  whyPartner: "",
};

const CollaborateWithUs = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isRTL } = useLanguageDetection();
  useScrollReveal();

  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleType = (key: string) =>
    setSelectedTypes((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload a file smaller than 5MB", variant: "destructive" });
      e.target.value = "";
      return;
    }
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selected.type)) {
      toast({ title: "Invalid file type", description: "Please upload a PDF or Word document", variant: "destructive" });
      e.target.value = "";
      return;
    }
    setFile(selected);
  };

  const inputCls =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 focus:outline-none";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const issues: string[] = [];
    if (form.fullName.trim().length < 2) issues.push(t('site.collab.fieldFullName'));
    if (form.companyName.trim().length < 2) issues.push(t('site.collab.fieldCompany'));
    if (form.designation.trim().length < 2) issues.push(t('site.collab.fieldDesignation'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) issues.push(t('site.collab.fieldEmail'));
    if (form.phone.trim().length < 10) issues.push(t('site.collab.fieldPhone'));
    if (form.servicesDescription.trim().length < 10) issues.push(t('site.collab.fieldServices'));
    if (form.whyPartner.trim().length < 10) issues.push(t('site.collab.fieldWhy'));
    if (selectedTypes.length === 0) issues.push(t('site.collab.fieldTypes'));
    if (!consent) issues.push(t('site.collab.fieldConsent'));

    if (issues.length > 0) {
      setErrors(issues);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("companyName", form.companyName);
      formData.append("designation", form.designation);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      if (form.website) formData.append("website", form.website);
      formData.append("partnershipTypes", JSON.stringify(selectedTypes));
      if (selectedTypes.includes("collaborateWithUs.other") && form.otherPartnershipType) {
        formData.append("otherPartnershipType", form.otherPartnershipType);
      }
      if (form.licenseNumber) formData.append("licenseNumber", form.licenseNumber);
      formData.append("servicesDescription", form.servicesDescription);
      formData.append("whyPartner", form.whyPartner);
      if (file) formData.append("companyProfile", file);

      await apiService.submitPartnerForm(formData);

      toast({
        title: "Interest Submitted Successfully!",
        description: "Thank you for your interest in partnering with TaxAI. We will review your application and contact you soon.",
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const valueProps = [
    { icon: <Sparkles className="h-5 w-5" />, title: t('site.collab.why1Title'), desc: t('site.collab.why1Desc') },
    { icon: <Users className="h-5 w-5" />, title: t('site.collab.why2Title'), desc: t('site.collab.why2Desc') },
    { icon: <TrendingUp className="h-5 w-5" />, title: t('site.collab.why3Title'), desc: t('site.collab.why3Desc') },
  ];

  const nextSteps = [t('site.collab.next1'), t('site.collab.next2'), t('site.collab.next3')];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Header band */}
      <section className="hero-backdrop py-20 lg:py-24">
        <div className="hero-grid" aria-hidden="true" />
        <div
          className="hero-glow"
          aria-hidden="true"
          style={{ top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '420px', background: 'radial-gradient(closest-side, rgba(37,99,235,0.26), transparent)' }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">{t('site.collab.heroEyebrow')}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('site.collab.heroTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">{t('collaborateWithUs.description')}</p>
          </div>
        </div>
      </section>

      {/* Value props + form */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="space-y-10">
            <div className="reveal">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{t('site.collab.whyTitle')}</h2>
              <ul className="mt-6 space-y-5">
                {valueProps.map((v) => (
                  <li key={v.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card ring-1 ring-slate-200">
                      {v.icon}
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-navy-900">{v.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal reveal-d1 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t('site.collab.lookingTitle')}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{t('site.collab.lookingDesc')}</p>
            </div>

            <div className="reveal reveal-d2 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t('site.collab.nextTitle')}</h3>
              <ol className="mt-4 space-y-3.5">
                {nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-slate-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="reveal reveal-d1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lift sm:p-8">
              <h2 className="text-xl font-extrabold tracking-tight text-navy-900">{t('collaborateWithUs.formTitle')}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t('site.collab.formRequiredNote')}</p>

              {submitted ? (
                <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-navy-900">{t('site.collab.successTitle')}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('site.collab.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.fullName')} <span className="text-rose-500">*</span></label>
                      <input id="fullName" type="text" value={form.fullName} onChange={set('fullName')} placeholder={t('collaborateWithUs.fullNamePlaceholder')} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.companyName')} <span className="text-rose-500">*</span></label>
                      <input id="companyName" type="text" value={form.companyName} onChange={set('companyName')} placeholder={t('collaborateWithUs.companyNamePlaceholder')} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="designation" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.designation')} <span className="text-rose-500">*</span></label>
                      <input id="designation" type="text" value={form.designation} onChange={set('designation')} placeholder={t('collaborateWithUs.designationPlaceholder')} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.email')} <span className="text-rose-500">*</span></label>
                      <input id="email" type="email" value={form.email} onChange={set('email')} placeholder={t('collaborateWithUs.emailPlaceholder')} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.phone')} <span className="text-rose-500">*</span></label>
                      <input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder={t('collaborateWithUs.phonePlaceholder')} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="website" className="text-sm font-semibold text-navy-900">
                        {t('collaborateWithUs.website')} <span className="font-normal text-slate-400">{t('site.collab.optionalLabel')}</span>
                      </label>
                      <input id="website" type="url" value={form.website} onChange={set('website')} placeholder={t('collaborateWithUs.websitePlaceholder')} className={inputCls} />
                    </div>
                  </div>

                  {/* Partnership types */}
                  <fieldset>
                    <legend className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.partnershipType')} <span className="text-rose-500">*</span></legend>
                    <p className="mt-1 text-xs font-medium text-slate-500">{t('collaborateWithUs.partnershipTypeDescription')}</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {partnershipTypes.map((type) => (
                        <label
                          key={type.key}
                          className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/60 has-[:checked]:ring-1 has-[:checked]:ring-brand-600 hover:border-slate-300"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type.key)}
                            onChange={() => toggleType(type.key)}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-600"
                          />
                          <span>
                            <span className="block text-sm font-bold text-navy-900">{t(type.key)}</span>
                            <span className="mt-0.5 block text-xs leading-snug text-slate-500">{t(type.descKey)}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                    {selectedTypes.includes("collaborateWithUs.other") && (
                      <div className="mt-3">
                        <label htmlFor="otherPartnershipType" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.otherPartnershipType')}</label>
                        <input id="otherPartnershipType" type="text" value={form.otherPartnershipType} onChange={set('otherPartnershipType')} placeholder={t('collaborateWithUs.otherPartnershipTypePlaceholder')} className={inputCls} />
                      </div>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor="licenseNumber" className="text-sm font-semibold text-navy-900">
                      {t('collaborateWithUs.licenseNumber')} <span className="font-normal text-slate-400">{t('site.collab.optionalLabel')}</span>
                    </label>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{t('collaborateWithUs.licenseNumberDescription')}</p>
                    <input id="licenseNumber" type="text" value={form.licenseNumber} onChange={set('licenseNumber')} placeholder={t('collaborateWithUs.licenseNumberPlaceholder')} className={inputCls} />
                  </div>

                  <div>
                    <label htmlFor="servicesDescription" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.servicesDescription')} <span className="text-rose-500">*</span></label>
                    <textarea id="servicesDescription" rows={4} value={form.servicesDescription} onChange={set('servicesDescription')} placeholder={t('collaborateWithUs.servicesDescriptionPlaceholder')} className={`${inputCls} resize-y`} />
                  </div>

                  <div>
                    <label htmlFor="whyPartner" className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.whyPartner')} <span className="text-rose-500">*</span></label>
                    <textarea id="whyPartner" rows={4} value={form.whyPartner} onChange={set('whyPartner')} placeholder={t('collaborateWithUs.whyPartnerPlaceholder')} className={`${inputCls} resize-y`} />
                  </div>

                  {/* File upload */}
                  <div>
                    <span className="text-sm font-semibold text-navy-900">{t('collaborateWithUs.uploadLabel')}</span>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{t('site.collab.uploadOptionalNote')}</p>
                    <label htmlFor="companyProfile" className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white px-6 py-7 text-center transition hover:border-brand-500 hover:bg-brand-50/40">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-brand-600 ring-1 ring-slate-200">
                        <UploadCloud className="h-5 w-5" />
                      </span>
                      <span className="text-sm text-slate-600">
                        <span className="font-bold text-brand-600">{t('collaborateWithUs.uploadClick')}</span> {t('collaborateWithUs.uploadOr')}
                      </span>
                      <span className="text-xs font-medium text-slate-400">{t('collaborateWithUs.uploadFormats')}</span>
                      <input type="file" id="companyProfile" accept=".pdf,.doc,.docx" onChange={handleFile} className="sr-only" />
                    </label>
                    {file && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                        <Check className="h-4 w-4" /> {file.name} {t('collaborateWithUs.uploadSuccess')}
                      </p>
                    )}
                  </div>

                  {/* Consent */}
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-600" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {t('site.collab.consentWithPrivacy')} <span className="text-rose-500">*</span>
                    </span>
                  </label>

                  {errors.length > 0 && (
                    <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
                      <p className="flex items-center gap-2 text-sm font-bold text-rose-800">
                        <AlertTriangle className="h-4 w-4" /> {t('site.collab.errorTitle')}
                      </p>
                      <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-sm text-rose-800">
                        {errors.map((err) => <li key={err}>{err}</li>)}
                      </ul>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-navy-900 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? t('collaborateWithUs.submitting') : t('collaborateWithUs.submitButton')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollaborateWithUs;
