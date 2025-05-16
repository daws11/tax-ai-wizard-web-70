
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
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            From signup to filing, our streamlined process makes tax preparation simple.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className={`scale-in backdrop-blur-sm transition-all border-t-0 shadow-sm hover:shadow-md dark:bg-gray-800/50 dark:border-gray-700`}
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
