import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Calculator, FileText, RefreshCw, Brain, BarChart, Workflow, Shield, BookOpen, Building2, FileCheck, Settings, LucideIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

// Custom hook untuk mendeteksi ukuran layar
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
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

const FeaturesOptimized = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  const [currentRow, setCurrentRow] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isMobile } = useScreenSize();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ OPTIMIZED: Memoize features array untuk mencegah recreation yang tidak perlu
  const baseFeatures: Feature[] = useMemo(() => [
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
  ], [t]); // Hanya re-create ketika t() function berubah (language change)

  // ✅ OPTIMIZED: Organize features into rows for fade animation
  const featuresPerRow = isMobile ? 1 : 2; // 1 card per row on mobile, 2 on desktop
  const totalRows = Math.ceil(baseFeatures.length / featuresPerRow);
  
  const featuresInRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * featuresPerRow;
      const endIndex = Math.min(startIndex + featuresPerRow, baseFeatures.length);
      rows.push(baseFeatures.slice(startIndex, endIndex));
    }
    return rows;
  }, [baseFeatures, featuresPerRow, totalRows]);

  // ✅ FIXED: Fade animation logic without dependency issues
  const startFadeAnimation = useCallback(() => {
    if (intervalRef.current) return; // Prevent multiple intervals
    
    console.log('🎬 Starting fade animation, totalRows:', totalRows);
    
    intervalRef.current = setInterval(() => {
      setCurrentRow(prev => {
        const nextRow = (prev + 1) % totalRows;
        console.log('🔄 Changing row from', prev, 'to', nextRow);
        return nextRow;
      });
    }, 3000); // Change row every 3 seconds
  }, [totalRows]);

  const stopFadeAnimation = useCallback(() => {
    if (intervalRef.current) {
      console.log('⏹️ Stopping fade animation');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    stopFadeAnimation();
  }, [stopFadeAnimation]);

  const handleMouseLeave = useCallback(() => {
    startFadeAnimation();
  }, [startFadeAnimation]);

  // ✅ FIXED: Start animation on mount
  useEffect(() => {
    console.log('🚀 Features component mounted, currentRow:', currentRow, 'totalRows:', totalRows);
    startFadeAnimation();
    
    return () => {
      stopFadeAnimation();
    };
  }, [startFadeAnimation, stopFadeAnimation]);

  // Debug effect to track currentRow changes
  useEffect(() => {
    console.log('📍 Current row changed to:', currentRow);
  }, [currentRow]);

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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('enterpriseFeaturesTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('enterpriseFeaturesSubtitle')}
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="space-y-8">
            {featuresInRows.map((row, rowIndex) => (
              <AnimatePresence key={rowIndex} mode="wait">
                {currentRow === rowIndex && (
                  <motion.div
                    key={`row-${rowIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    className={`grid gap-6 ${
                      isMobile 
                        ? 'grid-cols-1' 
                        : 'grid-cols-2'
                    }`}
                  >
                    {row.map((feature, featureIndex) => (
                      <motion.div
                        key={`${feature.title}-${rowIndex}-${featureIndex}`}
                        className="w-full"
                        whileHover={{ 
                          y: -10,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.4,
                          delay: featureIndex * 0.1,
                          ease: "easeOut"
                        }}
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
                )}
              </AnimatePresence>
            ))}
          </div>
          
          {/* Row indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuresInRows.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRow(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentRow === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to row ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOptimized;
