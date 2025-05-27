import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Calculator, FileText, RefreshCw } from "lucide-react";

const Features = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const features = [
    {
      title: t('aiAssistant'),
      description: t('aiAssistantDesc'),
      icon: Bot,
    },
    {
      title: t('automatedCalculations'),
      description: t('automatedCalculationsDesc'),
      icon: Calculator,
    },
    {
      title: t('documentManagement'),
      description: t('documentManagementDesc'),
      icon: FileText,
    },
    {
      title: t('realTimeUpdates'),
      description: t('realTimeUpdatesDesc'),
      icon: RefreshCw,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            {t('featuresTitle')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect hover:shadow-lg transition-shadow duration-300">
              <CardHeader className={`flex flex-row items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
