import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Calculator, FileText, RefreshCw, Brain, BarChart, Workflow, Shield, BookOpen, Building2, FileCheck, Settings, LucideIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  isEmpty?: boolean;
}

const Features = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Ensure we always have a multiple of 4 features
  const cardsPerSlide = 4;
  const totalFeatures = Math.ceil(baseFeatures.length / cardsPerSlide) * cardsPerSlide;
  const features = [...baseFeatures];
  
  // Pad the array with empty cards if needed
  while (features.length < totalFeatures) {
    features.push({
      title: '',
      description: '',
      icon: Settings,
      isEmpty: true
    });
  }

  const totalSlides = Math.ceil(features.length / cardsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance slides with pause on hover
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(nextSlide, 12000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  // Get current slide features
  const getCurrentSlideFeatures = () => {
    const start = currentSlide * cardsPerSlide;
    return features.slice(start, start + cardsPerSlide);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      id="features" 
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
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

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full transition-all duration-300 hover:scale-110 w-12 h-12"
            style={{ [isRTL ? 'right' : 'left']: '-2rem' }}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full transition-all duration-300 hover:scale-110 w-12 h-12"
            style={{ [isRTL ? 'left' : 'right']: '-2rem' }}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>

          {/* Feature Cards */}
          <div className="relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {getCurrentSlideFeatures().map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={feature.isEmpty ? 'hidden lg:block' : ''}
                  >
                    <Card className="glass-effect hover:shadow-xl transition-all duration-300 h-[340px] bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 dark:border-primary/10">
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
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="mt-16 flex justify-center gap-4">
              {Array.from({ length: Math.ceil(baseFeatures.length / cardsPerSlide) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'bg-primary scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="mt-6 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {currentSlide + 1} / {Math.ceil(baseFeatures.length / cardsPerSlide)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
