import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Process = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const steps = [
    {
      id: '01',
      name: t('step1'),
      description: t('step1Desc'),
    },
    {
      id: '02',
      name: t('step2'),
      description: t('step2Desc'),
    },
    {
      id: '03',
      name: t('step3'),
      description: t('step3Desc'),
    },
    {
      id: '04',
      name: t('step4'),
      description: t('step4Desc'),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-zinc-50/20 via-neutral-50/20 to-stone-50/20 dark:bg-gray-800/20 backdrop-blur-sm" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            {t('processTitle')}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            {t('processSubtitle')}
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`scale-in backdrop-blur-md transition-all border-t-0 shadow-sm hover:shadow-md bg-gradient-to-br from-slate-50/20 via-zinc-50/20 to-neutral-50/20 dark:bg-gray-800/20 dark:border-gray-700/30`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 flex flex-col items-start">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-4 text-xl font-bold">{step.id}</span>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{step.name}</h3>
                  <p className="text-base text-gray-500 dark:text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
