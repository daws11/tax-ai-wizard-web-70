import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceAED: string;
  description: string;
  features: PlanFeature[];
  mostPopular?: boolean;
  buttonText: string;
}

const Pricing = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: t('monthlyPlan'),
      price: "$99",
      priceAED: "AED 365",
      description: t('monthlyPlanDesc'),
      features: [
        { text: t('oneUser') },
        // { text: t('oneDevice') },
        { text: t('monthlyMessages') },
        { text: t('uaeTaxCoverage') },
        { text: t('bilingualSupport') },
        { text: t('standardSupport') },
        { text: t('stepByStepGuidance') },
      ],
      buttonText: t('pricingGetStarted'),
    },
    {
      id: "quarterly",
      name: t('quarterlyPlan'),
      price: "$250",
      priceAED: "AED 915",
      description: t('quarterlyPlanDesc'),
      features: [
        { text: t('oneUser') },
        // { text: t('oneDevice') },
        { text: t('quarterlyMessages') },
        { text: t('allMonthlyFeatures') },
        { text: t('prioritySupport') },
        { text: t('monthlyTaxDigest') },
      ],
      mostPopular: true,
      buttonText: t('pricingGetStarted'),
    },
    {
      id: "yearly",
      name: t('yearlyPlan'),
      price: "$899",
      priceAED: "AED 3,300",
      description: t('yearlyPlanDesc'),
      features: [
        { text: t('twoUsers') },
        // { text: t('twoDevices') },
        { text: t('yearlyMessages') },
        { text: t('allQuarterlyFeatures') },
        { text: t('earlyAccess') },
        { text: t('onboardingSession') },
      ],
      buttonText: t('pricingGetStarted'),
    },
    {
      id: "enterprise",
      name: t('enterprisePlan'),
      price: t('customPrice'),
      priceAED: t('quotation'),
      description: t('enterprisePlanDesc'),
      features: [
        { text: t('threePlusUsers') },
        { text: t('volumeBasedMessages') },
        { text: t('dedicatedManager') },
        { text: t('customModules') },
        { text: t('slaSupport') },
      ],
      buttonText: t('contactSales'),
    },
  ];

  return (
    <section 
      id="pricing" 
      className="py-24 bg-white dark:bg-gray-800" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
            {t('pricingTitle')}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto leading-relaxed">
            {t('pricingSubtitle')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`backdrop-blur-sm transition-all border shadow-sm hover:shadow-md dark:bg-gray-800/50 dark:border-gray-700 flex flex-col h-full ${
                plan.mostPopular ? "ring-2 ring-primary" : ""
              } scale-in`} 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-0">
                {plan.mostPopular && (
                  <Badge variant="secondary" className={`w-fit mb-4 ${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                    {t('mostPopular')}
                  </Badge>
                )}
                <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {plan.name}
                  </h3>
                  <div className={`flex items-baseline ${isRTL ? 'flex-row-reverse' : ''} gap-2`}>
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.priceAED}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 min-h-[60px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <Separator className="mb-6" />
                <ul className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3`}
                    >
                      <Check 
                        className={`h-5 w-5 text-primary shrink-0 ${isRTL ? 'order-2' : 'order-1'}`} 
                      />
                      <span 
                        className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${
                          isRTL ? 'order-1' : 'order-2'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white" 
                  onClick={plan.id !== "enterprise" ? () => navigate("/agent") : undefined}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className={`mt-12 text-center text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="leading-relaxed">{t('pricingNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
