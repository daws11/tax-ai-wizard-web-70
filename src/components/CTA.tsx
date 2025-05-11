
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to make taxes stress-free?
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands who are simplifying their taxes with AI assistance. Get started today.
        </p>
        <div className="mt-8 flex justify-center">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 hover:text-primary/90 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Free Trial
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/80">
          No credit card required. 14-day free trial with full access.
        </p>
      </div>
    </div>
  );
};

export default CTA;
