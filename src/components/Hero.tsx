import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useCallback } from 'react';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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
        }
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
        }
      }
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
        type: ["circle"]
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    detectRetina: true,
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[600px] flex items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Particle Background Layer */}
      <div className="absolute inset-0 -z-0">
        <Particles
          id="hero-particles"
          init={particlesInit}
          options={particlesOptions as any}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold uppercase tracking-wider text-primary mb-4 px-6 py-2 border-2 border-primary rounded-lg inline-block">TAX-AI</h2>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                <span className="block">{t('heroTitle')}</span>
                <span className="block text-primary text-2xl sm:text-3xl md:text-4xl">{t('heroSubtitle')}</span>
              </h1>
              {/* <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                {t('heroDescription')}
              </p> */}
              <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={() => navigate("/agent")}
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                  >
                    {t('startFreeTrial')}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180 ml-0 mr-2' : 'ml-2'}`} />
                  </Button>
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    {t('learnMore')}
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
