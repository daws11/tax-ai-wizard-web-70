import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const AgentPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.3
          }
        },
      },
    },
    particles: {
      color: {
        value: "#3b82f6", // blue-500
      },
      links: {
        color: "#3b82f6",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: ["circle"],
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };
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
    <div className="min-h-screen relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions as any}
          className="w-full h-full"
        />
      </div>
      <Navbar />
      
      <section className="opacity-0 flex flex-col items-center justify-center py-8 md:py-16 bg-transparent">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-gray-100">
          {t('chooseAgent')}
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 py-4 gap-4 md:gap-8">
          {/* Agent Option 1: ATTO */}
          <Link to="https://chat-taxai.onrender.com/" className="group flex flex-col items-center p-4 md:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 slide-up hover:-translate-y-1">
            <div className="w-20 h-20 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <img 
                src="/lovable-uploads/logo atto.png" 
                alt={t('attoAgentTitle')} 
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <span className="text-sm md:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('attoAgentTitle')}
            </span>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center mt-1">
              {t('attoAgentDesc')}
            </p>
          </Link>
          {/* Agent Option 2: YOSR */}
          <Link to="/agent/yosr" className="group flex flex-col items-center p-4 md:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 slide-up hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <img 
                src="/lovable-uploads/logo yosr.png" 
                alt={t('yosrAgentTitle')} 
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <span className="text-sm md:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('yosrAgentTitle')}
            </span>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center mt-1">
              {t('yosrAgentDesc')}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AgentPage;