import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import AIChat from "@/components/AIChat";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

const Index = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      <Hero />

      {/* Social proof: logo wall + metrics */}
      <section className="border-b border-slate-200 bg-surface pb-16 pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="reveal text-center text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            {t('site.logos.title')}
          </p>
          <div className="reveal reveal-d1">
            <LogoWall />
          </div>
          <StatsBar />
        </div>
      </section>

      <section id="features" className="scroll-mt-20 py-24">
        <Features />
      </section>

      <AIChat />

      <Process />

      <Pricing />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </div>
  );
};

export default Index;
