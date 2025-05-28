import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';

const Disclaimer = () => {
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
        resize: true
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="relative flex-grow">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
        
        <main className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${isRTL ? 'text-right' : 'text-left'}`}
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary mb-8">
                {t('disclaimerTitle')}
              </h1>
              
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-primary/20 dark:border-primary/10 shadow-lg p-8">
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