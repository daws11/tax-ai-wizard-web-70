import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useParticlesConfig } from "@/lib/particles-config";

const AgentPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

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
    <div className="min-h-screen flex flex-col relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full max-w-[1920px] mx-auto">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            className="w-full h-full"
          />
        </div>
      </div>
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center py-8 md:py-12">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-gray-100 text-center">
            {t('chooseAgent')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {/* Agent Option 1: ATTO */}
            <Link 
              to="https://chat-taxai.onrender.com/" 
              className="group flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 slide-up hover:-translate-y-1"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 mb-3 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                <img 
                  src="/lovable-uploads/logo atto.png" 
                  alt={t('attoAgentTitle')} 
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {t('attoAgentTitle')}
              </span>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center">
                {t('attoAgentDesc')}
              </p>
            </Link>

            {/* Agent Option 2: YOSR */}
            <Link 
              to="/agent/yosr" 
              className="group flex flex-col items-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 slide-up hover:-translate-y-1" 
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 mb-3 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                <img 
                  src="/lovable-uploads/logo yosr.png" 
                  alt={t('yosrAgentTitle')} 
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {t('yosrAgentTitle')}
              </span>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center">
                {t('yosrAgentDesc')}
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentPage;