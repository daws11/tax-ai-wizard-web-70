import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const faqs = [
    {
      question: t('faqQuestion1'),
      answer: t('faqAnswer1'),
    },
    {
      question: t('faqQuestion2'),
      answer: t('faqAnswer2'),
    },
    {
      question: t('faqQuestion3'),
      answer: t('faqAnswer3'),
    },
    {
      question: t('faqQuestion4'),
      answer: t('faqAnswer4'),
    },
    {
      question: t('faqQuestion5'),
      answer: t('faqAnswer5'),
    },
    {
      question: t('faqQuestion6'),
      answer: t('faqAnswer6'),
    },
    {
      question: t('faqQuestion7'),
      answer: t('faqAnswer7'),
    },
    {
      question: t('faqQuestion8'),
      answer: t('faqAnswer8'),
    },
    {
      question: t('faqQuestion9'),
      answer: t('faqAnswer9'),
    },
    {
      question: t('faqQuestion10'),
      answer: t('faqAnswer10'),
    },
    {
      question: t('faqQuestion11'),
      answer: t('faqAnswer11'),
    },
  ];

  return (
    <div 
      id="faq" 
      className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mx-auto max-w-4xl ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl font-bold leading-10 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary sm:text-4xl">
            {t('faqTitle')}
          </h2>
          <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400">
            {t('faqSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 mx-auto max-w-4xl"
        >
          <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-primary/20 dark:border-primary/10 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <AccordionTrigger 
                    className={`text-lg font-semibold text-gray-900 dark:text-gray-100 px-6 py-4 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className={`text-base text-gray-600 dark:text-gray-400 px-6 pb-4 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="prose dark:prose-invert max-w-none leading-relaxed">
                      {faq.answer.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
