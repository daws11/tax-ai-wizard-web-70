import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

const plans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$99",
    priceAED: "AED 365",
    description: "Ideal for business owners, freelancers, tax advisors, accountants, and finance professionals who need accurate and accessible tax guidance.",
    features: [
      { text: "1 user" },
      { text: "1 device" },
      { text: "100 AI-powered messages per month" },
      { text: "Coverage of UAE VAT, Corporate Tax, and Excise regulations" },
      { text: "Answers in both English and Arabic" },
      { text: "Standard support" },
      { text: "Access to step-by-step guidance and process explanations" },
    ],
    buttonText: "Get Started",
  },
  {
    id: "quarterly",
    name: "Quarterly Plan",
    price: "$250",
    priceAED: "AED 915",
    description: "Best for professionals who want consistent tax advisory access with savings.",
    features: [
      { text: "1 user" },
      { text: "1 device" },
      { text: "300 messages total over 3 months" },
      { text: "All Monthly features" },
      { text: "Priority email support" },
      { text: "Access to monthly tax regulation digest" },
    ],
    mostPopular: true,
    buttonText: "Get Started",
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    price: "$899",
    priceAED: "AED 3,300",
    description: "For users committed to long-term support and deeper features, with the best value.",
    features: [
      { text: "1 to 2 users" },
      { text: "2 devices" },
      { text: "1,200 messages per year (averaging 100/month)" },
      { text: "All Quarterly features" },
      { text: "Early access to new features" },
      { text: "Onboarding session included" },
    ],
    buttonText: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: "Custom",
    priceAED: "Quotation",
    description: "For tax advisors, legal firms, or corporate finance departments managing multiple clients or entities.",
    features: [
      { text: "3+ users" },
      { text: "Volume-based message allocation" },
      { text: "Dedicated account manager" },
      { text: "Custom advisory modules" },
      { text: "SLA-based support and team training" },
    ],
    buttonText: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            AI Tax Agent Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Choose the plan that's right for your business needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <Badge variant="secondary" className="w-fit mb-2">
                    Most Popular
                  </Badge>
                )}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{plan.priceAED}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 min-h-[60px]">{plan.description}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <Separator className="mb-6" />
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="w-full" 
                  variant={plan.id === "enterprise" ? "outline" : "default"}
                  onClick={plan.id !== "enterprise" ? () => window.open("https://chat-taxai.onrender.com/login", "_blank") : undefined}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>All plans include 14-day free trial. No credit card required to start.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
