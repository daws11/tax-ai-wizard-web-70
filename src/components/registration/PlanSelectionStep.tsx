import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { CreditCard, Check } from 'lucide-react';
import { Plan } from '../../services/api';
import apiService from '../../services/api';
import { useTranslation } from 'react-i18next';

interface ExtendedPlan extends Plan {
  mostPopular?: boolean;
}

interface PlanSelectionStepProps {
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

export default function PlanSelectionStep({
  selectedPlan,
  onPlanSelect
}: PlanSelectionStepProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        const { plans: fetchedPlans } = await apiService.getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load plans. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, [toast]);

  const handlePlanSelect = (plan: Plan) => {
    onPlanSelect(plan);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <Card className="w-full backdrop-blur-md border shadow-sm bg-white/20 dark:bg-gray-800/20 dark:border-gray-700/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CreditCard className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('register.loadingPlans')}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl mb-3 sm:mb-4">
          {t('register.chooseYourPlan')}
        </h2>
        <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mx-auto leading-relaxed px-2">
          Choose your plan and start chatting with our AI tax assistant immediately
        </p>
      </div>

      <div className="mt-8 sm:mt-12 md:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`backdrop-blur-md transition-all border shadow-sm hover:shadow-md bg-white/20 dark:bg-gray-800/20 dark:border-gray-700/30 flex flex-col h-full cursor-pointer ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => handlePlanSelect(plan)}
            >
              <CardHeader className="pb-0 px-6 pt-6">
                {(plan as ExtendedPlan).mostPopular && (
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
                      ${plan.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[60px] leading-relaxed">
                    {plan.description || t('register.selectPlanDescription')}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow px-6 pt-6">
                <ul className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i}
                      className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3`}
                    >
                      <Check 
                        className={`h-5 w-5 text-green-500 shrink-0 ${isRTL ? 'order-2' : 'order-1'}`} 
                      />
                      <span className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${
                        isRTL ? 'order-1' : 'order-2'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6 px-6 pb-6">
                <Button 
                  className={`w-full text-base py-2.5 ${
                    selectedPlan?.id === plan.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                  size="lg"
                  onClick={() => handlePlanSelect(plan)}
                >
                  {selectedPlan?.id === plan.id 
                    ? 'Start Chatting Now' 
                    : 'Start Chatting Now'
                  }
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className={`mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'text-right' : 'text-left'} px-2`}>
        <p className="leading-relaxed">All plans include our comprehensive AI tax assistant and guidance.</p>
        <p className="mt-2">No credit card required for free trial. Start chatting immediately.</p>
      </div>
    </div>
  );
} 