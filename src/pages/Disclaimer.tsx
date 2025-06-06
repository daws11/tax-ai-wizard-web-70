import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import { useParticlesConfig } from "@/lib/particles-config";

const Disclaimer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <div className="relative flex-grow">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full max-w-[1920px] mx-auto">
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={particlesOptions}
              className="w-full h-full"
            />
          </div>
        </div>
        
        <main className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${isRTL ? 'text-right' : 'text-left'}`}
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 px-6 rounded-lg inline-block">
                {t('disclaimerTitle')}
              </h1>
              
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-primary/20 dark:border-primary/10 shadow-lg p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {t('disclaimerContent')}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer; 