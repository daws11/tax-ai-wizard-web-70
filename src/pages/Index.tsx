import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import AIChat from "../components/AIChat";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Index = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          if (entry.target.classList.contains('opacity-0')) {
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('opacity-0');
          }
          
          
          if (entry.target.classList.contains('slide-up') ||
              entry.target.classList.contains('fade-in-right') ||
              entry.target.classList.contains('fade-in-left') ||
              entry.target.classList.contains('scale-in')) {
            entry.target.classList.add('animated');
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections and elements with animation classes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in-right, .fade-in-left, .scale-in');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <section className="opacity-0">
        <Hero />
      </section>
      
      <section className="opacity-0">
        <Features />
      </section>
      
      <section className="opacity-0 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('aiDemoTitle')}</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              {t('aiDemoSubtitle')}
            </p>
          </div>
          <div className="scale-in">
            <AIChat />
          </div>
        </div>
      </section>
      
      <section className="opacity-0">
        <Process />
      </section>
      
      <section className="opacity-0">
        <Pricing />
      </section>

      <section className="opacity-0">
        <CTA />
      </section>
      
      {/* <section className="opacity-0">
        <Testimonials />
      </section> */}
      
      <section className="opacity-0">
        <FAQ />
      </section>
              
      <Footer />
    </div>
  );
};

export default Index;
