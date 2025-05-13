
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: '01',
    name: 'Create an account',
    description:
      'Sign up in seconds with just your email and basic information to get started.',
  },
  {
    id: '02',
    name: 'Upload documents',
    description:
      'Securely upload your W-2s, 1099s, and other tax documents, or connect to your financial accounts.',
  },
  {
    id: '03',
    name: 'Chat with AI',
    description:
      'Ask questions, get personalized advice, and let our AI guide you through the tax filing process.',
  },
  {
    id: '04',
    name: 'Review and file',
    description:
      'Check the AI-prepared tax return and submit it directly to the IRS with a single click.',
  },
];

const Process = () => {
  return (
    <div id="how-it-works" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            From signup to filing, our streamlined process makes tax preparation simple.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`scale-in glass-effect border-t-4 border-t-primary`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-xl font-bold text-primary mb-2">{step.id}</div>
                  <h3 className="text-lg font-medium text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
