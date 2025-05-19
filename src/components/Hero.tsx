import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                <span className="block">Your AI Tax Expert</span>
                <span className="block text-primary">Available 24/7</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get personalized tax advice, maximize deductions, and file with confidence using our advanced AI tax assistant that understands tax codes and your unique situation.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button 
                    onClick={() => window.open("https://chat-taxai.onrender.com/login", "_blank")}
                    className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                  >
                    Start Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3">
        <div className="hidden lg:block relative h-full">
          {/* GIF Layer - Only visible on large screens (lg and up) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-[80%]">
              <img
                src="/lovable-uploads/Taxesagain-ezgif.com-gif-maker.gif"
                alt="Tax calculation animation"
                className="h-auto w-auto object-contain max-h-[350px]"
              />
            </div>
          </div>
          {/* Gradient Background Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
