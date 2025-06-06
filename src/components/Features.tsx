import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Calculator, FileText, RefreshCw, Brain, BarChart, Workflow, Shield, BookOpen, Building2, FileCheck, Settings, LucideIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Custom hook untuk mendeteksi ukuran layar
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px adalah breakpoint untuk tablet
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobile };
};

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  isEmpty?: boolean;
}

const Features = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { isMobile } = useScreenSize();

  // Base features array
  const baseFeatures: Feature[] = [
    {
      title: t('feature1Title'),
      description: t('feature1Desc'),
      icon: Calculator,
    },
    {
      title: t('feature2Title'),
      description: t('feature2Desc'),
      icon: BarChart,
    },
    {
      title: t('feature3Title'),
      description: t('feature3Desc'),
      icon: Workflow,
    },
    {
      title: t('feature4Title'),
      description: t('feature4Desc'),
      icon: Shield,
    },
    {
      title: t('feature5Title'),
      description: t('feature5Desc'),
      icon: BookOpen,
    },
    {
      title: t('feature6Title'),
      description: t('feature6Desc'),
      icon: Building2,
    },
    {
      title: t('feature7Title'),
      description: t('feature7Desc'),
      icon: FileCheck,
    },
    {
      title: t('feature8Title'),
      description: t('feature8Desc'),
      icon: Bot,
    },
  ];

  // Duplicate features multiple times to ensure smooth infinite loop
  const features = [...baseFeatures, ...baseFeatures, ...baseFeatures];

  const startAnimation = useCallback(() => {
    const totalWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = totalWidth / 3; // Karena kita menduplikasi 3 kali

    controls.start({
      x: isRTL 
        ? [0, -singleSetWidth * 2] // Bergerak ke kiri untuk RTL
        : [-singleSetWidth * 2, 0], // Bergerak ke kanan untuk LTR
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
        repeatDelay: 0,
      }
    }).then(() => {
      // Reset posisi tanpa animasi untuk transisi yang mulus
      controls.set({
        x: isRTL ? 0 : -singleSetWidth * 2
      });
    });
  }, [controls, isRTL]);

  // Start animation on mount
  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    controls.stop();
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startAnimation();
  }, [startAnimation]);

  return (
    <section 
      id="features" 
      className="py-24 bg-gradient-to-b from-gray-50/20 to-white/20 dark:from-gray-900/20 dark:to-gray-800/20 backdrop-blur-sm overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {/* <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary sm:text-5xl mb-6">
            {t('enterpriseFeaturesTitle')}
          </h2> */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('enterpriseFeaturesSubtitle')}
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex gap-6"
            animate={controls}
            style={{ willChange: 'transform' }} // Optimasi performa
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="w-[280px] flex-shrink-0"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Card 
                  className="glass-effect hover:shadow-xl transition-all duration-300 h-[340px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-primary/20 dark:border-primary/10 cursor-pointer"
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className={`flex items-center gap-5 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="p-4 rounded-2xl bg-primary/10 shadow-lg flex-shrink-0">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-base text-gray-600 dark:text-gray-300 flex-grow leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
