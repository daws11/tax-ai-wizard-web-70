import { Calculator, Bot, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    name: 'Smart Tax Optimization',
    description: 'Our AI analyzes your financial data to find every possible deduction and credit you qualify for.',
    icon: Calculator,
  },
  {
    name: '24/7 AI Assistance',
    description: 'Get immediate answers to your tax questions any time, day or night, no appointment needed.',
    icon: Bot,
  },
  {
    name: 'Secure and Confidential',
    description: 'Your financial data is protected with bank-level encryption and never shared with third parties.',
    icon: ShieldCheck,
  },
  {
    name: 'Maximize Returns',
    description: 'Users report an average of 15% higher tax returns compared to self-filing methods.',
    icon: TrendingUp,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Features That Make Tax Season Easier
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our AI-powered tax platform combines cutting-edge technology with tax expertise.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className={`p-6 glass-effect rounded-lg shadow-md transform transition duration-500 hover:scale-105 ${index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
