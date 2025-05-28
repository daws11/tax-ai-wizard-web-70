import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

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
    <div id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900 dark:text-gray-100">
            {t('faqTitle')}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
            {t('faqSubtitle')}
          </p>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600 dark:text-gray-400">
                    <div className="prose dark:prose-invert max-w-none">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
