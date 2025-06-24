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
      id: "trial",
      name: t('trialPlan', 'Free Trial'),
      price: t('free', 'Free'),
      priceAED: t('free', 'Free'),
      description: t('trialPlanDesc', 'Try all features for 14 days'),
      features: [
        { text: t('oneUser', '1 user') },
        { text: t('trialMessages', 'Up to 30 messages') },
        { text: t('uaeTaxCoverageFull', 'Coverage of UAE VAT, Corporate Tax, and Excise regulations') },
        { text: t('bilingualSupportFull', 'Answers in both English and Arabic') },
        { text: t('standardSupport', 'Standard support') },
        { text: t('noCreditCardRequired', 'No credit card required') },
      ],
      buttonText: t('startFreeTrial', 'Start Free Trial'),
    },
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
      className="py-12 sm:py-16 md:py-24 " 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl mb-3 sm:mb-4">
            {t('pricingTitle')}
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mx-auto leading-relaxed px-2">
            {t('pricingSubtitle')}
          </p>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16">
          {/* Regular Pricing Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {plans.filter(plan => plan.id !== 'enterprise').map((plan, index) => (
              <Card 
                key={plan.id}
                className={`backdrop-blur-md transition-all border shadow-sm hover:shadow-md bg-white/20 dark:bg-gray-800/20 dark:border-gray-700/30 flex flex-col h-full ${
                  plan.mostPopular ? "ring-2 ring-primary" : ""
                } scale-in`} 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-0 px-6 pt-6">
                  {plan.mostPopular && (
                    <Badge variant="secondary" className={`w-fit mb-4 text-sm ${isRTL ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                      {t('mostPopular')}
                    </Badge>
                  )}
                  <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {plan.name}
                    </h3>
                    <div className={`flex items-baseline ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                      <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {plan.priceAED}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[60px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow px-6 pt-6">
                  {/* <Separator className="mb-6" /> */}
                  <ul className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {plan.features.map((feature, i) => (
                      <li 
                        key={i}
                        className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3`}
                      >
                        <Check 
                          className={`h-5 w-5 text-primary shrink-0 ${isRTL ? 'order-2' : 'order-1'}`} 
                        />
                        <span className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${
                          isRTL ? 'order-1' : 'order-2'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto pt-6 px-6 pb-6">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white text-base py-2.5" 
                    size="lg"
                    onClick={() => navigate('/register')}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Enterprise Plan - Full Width */}
          <div className="mt-12 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700/30 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('enterprisePlan', 'Enterprise Plan')}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {t('enterprisePlanDesc', 'Comprehensive tax solution for large organizations with advanced needs.')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    t('enterpriseFeature1', 'AI-powered tax automation'),
                    t('enterpriseFeature2', 'Insights dashboard with ERP-integrated'),
                    t('enterpriseFeature3', 'Custom-built advisory modules'),
                    t('enterpriseFeature4', 'Private AI assistant for your team'),
                    t('enterpriseFeature5', 'Dedicated account manager & SLA support'),
                    t('enterpriseFeature6', 'Flexible usage & multi-user access')
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start p-4 ">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-base px-8 py-6"
                    onClick={() => navigate('/contact')}
                  >
                    {t('contactSales', 'Contact Sales for Enterprise Plan')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'text-right' : 'text-left'} px-2`}>
          <p className="leading-relaxed">{t('pricingNote')}</p>
          <p className="mt-2">{t('noCreditCardRequired', 'No credit card required for free trial. Cancel anytime.')}</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
