import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
  const { isRTL } = useLanguageDetection();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      <Hero />

      {/* Social proof: metrics */}
      <section className="border-b border-slate-200 bg-surface pb-16 pt-40">
        <div className="mx-auto max-w-7xl px-6">
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
