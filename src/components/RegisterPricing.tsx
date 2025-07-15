import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Plan } from "../services/api";

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

interface RegisterPricingProps {
  plans?: Plan[];
  onSelectPlan: (planId: string) => void;
  selectedPlan?: string;
}

export function RegisterPricing({ plans = [], onSelectPlan, selectedPlan }: RegisterPricingProps) {
  const { t } = useTranslation();

  // Convert API plans to display format
  const displayPlans: PricingPlan[] = plans.length > 0 ? plans.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: `$${plan.price}`,
    priceAED: `AED ${Math.round(plan.price * 3.67)}`,
    description: plan.description,
    features: plan.features.map(feature => ({ text: feature })),
    mostPopular: plan.id === 'quarterly',
    buttonText: plan.id === 'trial' ? t('startFreeTrial', 'Start Free Trial') : t('pricingGetStarted', 'Get Started'),
  })) : [
    {
      id: "trial",
      name: t('trialPlan', 'Free Trial'),
      price: t('free', 'Free'),
      priceAED: t('free', 'Free'),
      description: t('trialPlanDesc', 'Try all features for 14 days'),
      features: [
        { text: t('oneUser', '1 user') },
        { text: t('Up to 10 messages') },
        { text: t('uaeTaxCoverageFull', 'Coverage of UAE VAT, Corporate Tax, and Excise regulations') },
        { text: t('bilingualSupportFull', 'Answers in both English and Arabic') },
        { text: t('standardSupport', 'Standard support') },
        { text: t('noCreditCardRequired', 'No credit card required') },
        { text: t('voiceAgentFree', 'Free access to Yosr Voice Agent (3 minutes call)') },
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
        { text: t('monthlyMessages') },
        { text: t('uaeTaxCoverage') },
        { text: t('bilingualSupport') },
        { text: t('standardSupport') },
        { text: t('stepByStepGuidance') },
        { text: t('voiceAgentFree', 'Free access to Yosr Voice Agent (3 minutes call)') },
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
        { text: t('quarterlyMessages') },
        { text: t('allMonthlyFeatures') },
        { text: t('prioritySupport') },
        { text: t('monthlyTaxDigest') },
        { text: t('voiceAgentFree', 'Free access to Yosr Voice Agent (3 minutes call)') },
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
        { text: t('yearlyMessages') },
        { text: t('allQuarterlyFeatures') },
        { text: t('earlyAccess') },
        { text: t('onboardingSession') },
        { text: t('voiceAgentFree', 'Free access to Yosr Voice Agent (3 minutes call)') },
      ],
      buttonText: t('pricingGetStarted'),
    },
    {
      id: "enterprise",
      name: t('enterprisePlan', 'Enterprise Plan'),
      price: t('enterprisePrice', 'Custom'),
      priceAED: t('enterprisePriceAED', 'Custom'),
      description: t('enterprisePlanDesc', 'Comprehensive tax solution for large organizations with advanced needs.'),
      features: [
        { text: t('threePlusUsers', '3+ users') },
        { text: t('volumeBasedMessages', 'Volume-based messages') },
        { text: t('dedicatedManager', 'Dedicated account manager') },
        { text: t('customModules', 'Custom-built advisory modules') },
        { text: t('slaSupport', 'SLA support') },
        { text: t('voiceAgentFree', 'Free access to Yosr Voice Agent (3 minutes call)') },
      ],
      buttonText: t('contactSales', 'Contact Sales'),
    },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
        {displayPlans.map((plan) => (
          <div key={plan.id} className="h-full flex">
            <Card 
              className={`h-full flex flex-col flex-1 transition-all duration-200 ${
                plan.mostPopular 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 transform -translate-y-1' 
                  : 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600'
              } ${
                selectedPlan === plan.id ? 'border-2 border-blue-500 dark:border-blue-400' : ''
              }`}
            >
              {plan.mostPopular && (
                <div className="w-full bg-blue-500 text-white text-center py-1 text-xs md:text-sm font-medium rounded-t-xl">
                  {t('mostPopular', 'Most Popular')}
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                    <span className="text-xs md:text-base font-normal text-gray-500 dark:text-gray-400">
                      /{plan.id === 'trial' ? t('trial', 'trial') : t('month', 'month')}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {plan.priceAED} {t('vatIncluded', 'VAT included')}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 md:space-y-3 max-h-32 sm:max-h-none overflow-y-auto pr-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-4 md:p-6 pt-0">
                <Button 
                  className={`w-full text-xs md:text-base ${
                    plan.mostPopular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  size="lg"
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      {/* <div className="mt-8 md:mt-12 text-center px-2 md:px-0">
        <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
          {t('tryRiskFree', 'Try Tax-AI risk-free for 14 days. No credit card required.')}
        </h3>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          onClick={() => onSelectPlan('trial')}
        >
          {t('startFreeTrial', 'Start Your 14-Day Free Trial')}
        </Button>
        <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {t('noCreditCardRequired', 'No credit card required. Cancel anytime.')}
        </p>
      </div> */}
      <div className="mt-8 md:mt-12 p-4 md:p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {t('enterprisePlan', 'Enterprise Plan')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
            {t('enterprisePlanDesc', 'Comprehensive tax solution for large organizations with advanced needs.')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 text-left mt-4 md:mt-8">
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature1', 'AI-powered tax automation')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature2', 'Insights dashboard with ERP-integrated')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature3', 'Custom-built advisory modules')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature4', 'Dedicated account manager')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature5', 'Priority 24/7 support')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs md:text-base">
                {t('enterpriseFeature6', 'Custom integrations')}
              </span>
            </div>
          </div>
          <Button 
            size="lg" 
            variant="outline"
            className="mt-6 md:mt-8 bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            {t('contactSales', 'Contact Sales')}
            </Button>
        </div>
      </div>
      <div className="mt-6 md:mt-8 text-center">
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {t('planIncludes', 'All plans include:')}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            {t('dataSecurity', 'Bank-level security')}
          </span>
          <span className="flex items-center">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            {t('regularUpdates', 'Regular updates')}
          </span>
          <span className="flex items-center">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            {t('cancelAnytime', 'Cancel anytime')}
          </span>
        </div>
        <p className="mt-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 font-semibold">
          {t('noCreditCardRequired', 'No credit card required for free trial. Cancel anytime.')}
        </p>
      </div>
    </div>
  );
}
