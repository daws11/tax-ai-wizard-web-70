import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

interface RegisterPricingProps {
  onSelectPlan: (planId: string) => void;
  selectedPlan?: string;
}

export function RegisterPricing({ onSelectPlan, selectedPlan }: RegisterPricingProps) {
  const { t } = useTranslation();

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: t('monthlyPlan', 'Monthly Plan'),
      price: "$99",
      priceAED: "AED 365",
      description: t('monthlyPlanDesc', 'Ideal for short-term tax assistance'),
      features: [
        { text: t('oneUser', '1 User') },
        { text: t('monthlyMessages', 'Unlimited messages') },
        { text: t('uaeTaxCoverage', 'UAE tax coverage') },
        { text: t('bilingualSupport', 'Bilingual support (EN/AR)') },
        { text: t('standardSupport', 'Standard email support') },
      ],
      buttonText: t('selectPlan', 'Select Plan'),
    },
    {
      id: "quarterly",
      name: t('quarterlyPlan', 'Quarterly Plan'),
      price: "$250",
      priceAED: "AED 920",
      description: t('quarterlyPlanDesc', 'Perfect for ongoing tax needs'),
      features: [
        { text: t('oneUser', '1 User') },
        { text: t('unlimitedMessages', 'Unlimited messages') },
        { text: t('uaeTaxCoverage', 'UAE tax coverage') },
        { text: t('bilingualSupport', 'Bilingual support (EN/AR)') },
        { text: t('prioritySupport', 'Priority email support') },
        { text: t('quarterlyTaxReview', 'Quarterly tax review') },
      ],
      mostPopular: true,
      buttonText: t('selectPlan', 'Select Plan'),
    },
    {
      id: "annually",
      name: t('annualPlan', 'Annual Plan'),
      price: "$900",
      priceAED: "AED 3,300",
      description: t('annualPlanDesc', 'Best value for comprehensive tax support'),
      features: [
        { text: t('threeUsers', 'Up to 3 Users') },
        { text: t('unlimitedMessages', 'Unlimited messages') },
        { text: t('uaeTaxCoverage', 'UAE tax coverage') },
        { text: t('bilingualSupport', 'Bilingual support (EN/AR)') },
        { text: t('dedicatedSupport', 'Dedicated account manager') },
        { text: t('monthlyTaxReview', 'Monthly tax review') },
        { text: t('prioritySupport', 'Priority 24/7 support') },
      ],
      buttonText: t('selectPlan', 'Select Plan'),
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <div key={plan.id} className="h-full">
            <Card 
              className={`h-full flex flex-col transition-all duration-200 ${
                plan.mostPopular 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 transform -translate-y-1' 
                  : 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600'
              } ${
                selectedPlan === plan.id ? 'border-2 border-blue-500 dark:border-blue-400' : ''
              }`}
            >
              {plan.mostPopular && (
                <div className="w-full bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  {t('mostPopular', 'Most Popular')}
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                      /{t('month', 'month')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {plan.priceAED} {t('vatIncluded', 'VAT included')}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button 
                  className={`w-full ${
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
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('tryRiskFree', 'Try Tax-AI risk-free for 14 days. No credit card required.')}
        </h3>
        {/* <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          {t('tryRiskFree', 'Try TaxAI Wizard risk-free for 14 days. No credit card required.')}
        </p> */}
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          onClick={() => onSelectPlan('freeTrial')}
        >
          {t('startFreeTrial', 'Start Your 14-Day Free Trial')}
        </Button>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {t('noCreditCardRequired', 'No credit card required. Cancel anytime.')}
        </p>
      </div>
      <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('enterprisePlan', 'Enterprise Plan')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {t('enterprisePlanDesc', 'Comprehensive tax solution for large organizations with advanced needs.')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left mt-8">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature1', 'AI-powered tax automation')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature2', 'Insights dashboard with ERP-integrated')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature3', 'Custom-built advisory modules')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature4', 'Private AI assistant for your team')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature5', 'Dedicated account manager & SLA support')}
              </span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {t('enterpriseFeature6', 'Flexible usage & multi-user access')}
              </span>
            </div>
          </div>
          
          <div className="mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t('contactSales', 'Contact Sales for Enterprise Plan')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('planIncludes', 'All plans include:')}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            {t('dataSecurity', 'Bank-level security')}
          </span>
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            {t('regularUpdates', 'Regular updates')}
          </span>
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-1" />
            {t('cancelAnytime', 'Cancel anytime')}
          </span>
        </div>
      </div>
      
      
    </div>
  );
}
