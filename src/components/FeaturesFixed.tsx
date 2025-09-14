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

const FeaturesFixed = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguageDetection();
  const [currentRow, setCurrentRow] = useState(0);
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
  ], [t]);

  // ✅ OPTIMIZED: Organize features into rows for fade animation
  const featuresPerRow = isMobile ? 1 : 2;
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

  // ✅ SIMPLIFIED: Start animation function
  const startAnimation = useCallback(() => {
    console.log('🎬 Starting animation, totalRows:', totalRows);
    
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentRow(prev => {
        const nextRow = (prev + 1) % totalRows;
        console.log('🔄 Row changing from', prev, 'to', nextRow);
        return nextRow;
      });
    }, 4000); // Increased to 4 seconds for smoother experience
  }, [totalRows]);

  // ✅ SIMPLIFIED: Stop animation function
  const stopAnimation = useCallback(() => {
    console.log('⏹️ Stopping animation');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ✅ SIMPLIFIED: Mouse handlers
  const handleMouseEnter = useCallback(() => {
    stopAnimation();
  }, [stopAnimation]);

  const handleMouseLeave = useCallback(() => {
    startAnimation();
  }, [startAnimation]);

  // ✅ SIMPLIFIED: Start animation on mount
  useEffect(() => {
    console.log('🚀 Component mounted, starting animation');
    startAnimation();
    
    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  // Debug current row
  useEffect(() => {
    console.log('📍 Current row:', currentRow);
  }, [currentRow]);

  return (
    <section 
      id="features" 
      className="py-24 bg-gradient-to-b from-gray-50/20 to-white/20 dark:from-gray-900/20 dark:to-gray-800/20 backdrop-blur-sm overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <motion.h2 
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {t('enterpriseFeaturesTitle')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: 0.4,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {t('enterpriseFeaturesSubtitle')}
          </motion.p>
        </motion.div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fixed height container to prevent layout shift */}
          <div className="min-h-[680px] relative">
            {featuresInRows.map((row, rowIndex) => (
              <AnimatePresence key={rowIndex} mode="wait">
                {currentRow === rowIndex && (
                  <motion.div
                    key={`row-${rowIndex}`}
                    initial={{ 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -30, 
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smoother animation
                      opacity: { duration: 0.6 },
                      y: { duration: 0.8 },
                      scale: { duration: 0.7 },
                      filter: { duration: 0.5 }
                    }}
                    className={`absolute inset-0 grid gap-6 ${
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
                          y: -8,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        initial={{ 
                          opacity: 0, 
                          scale: 0.9, 
                          y: 20,
                          filter: "blur(2px)"
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          filter: "blur(0px)"
                        }}
                        transition={{ 
                          duration: 0.6,
                          delay: featureIndex * 0.15,
                          ease: [0.4, 0.0, 0.2, 1],
                          filter: { duration: 0.4 }
                        }}
                      >
                        <Card 
                          className="glass-effect hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-[340px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-primary/20 dark:border-primary/10 cursor-pointer shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20"
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
              <motion.button
                key={index}
                onClick={() => setCurrentRow(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentRow === index 
                    ? 'bg-primary scale-125 shadow-lg shadow-primary/30' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110'
                }`}
                aria-label={`Go to row ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesFixed;
