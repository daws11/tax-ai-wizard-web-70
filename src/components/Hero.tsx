import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useCallback } from 'react';
import { useParticlesConfig } from "@/lib/particles-config";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

  return (
    <div className="relative min-h-[600px] flex items-center bg-transparent" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Particle Background Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full max-w-[1920px] mx-auto">
          <Particles
            id="hero-particles"
            init={particlesInit}
            options={particlesOptions}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto relative z-10 ">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-wider text-primary mb-4 px-6 py-2 rounded-lg inline-block bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">TaxAi</h2>
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
                    onClick={() => { window.location.href = 'https://ask.taxai.ae/'; }}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                  >
                    {t('login')}
                  </Button>
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
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
