import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useParticlesConfig } from "@/lib/particles-config";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Headphones, Mic, Volume2, Phone, MessageSquare, Play, Pause } from 'lucide-react';

const TalkPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

  const features = [
    {
      icon: <Volume2 className="w-6 h-6 text-blue-600" />,
      title: "Natural Speech",
      description: "Experience human-like conversations with our advanced AI."
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Hands-Free",
      description: "Get help without typing, perfect for multitasking."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "Context-Aware",
      description: "Remembers your conversation history for better assistance."
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Start Your Session",
      description: "Click the 'Start Voice Session' button to begin."
    },
    {
      number: 2,
      title: "Speak Your Question",
      description: "Ask your tax-related question clearly."
    },
    {
      number: 3,
      title: "Listen to Response",
      description: "Hear YOSR's detailed and accurate response."
    },
    {
      number: 4,
      title: "Continue Conversation",
      description: "Ask follow-up questions or request clarification."
    }
  ];

  const startListening = () => {
    navigate('/register');
  };

  // Custom particles options for better visibility
  const customParticlesOptions = JSON.parse(JSON.stringify(particlesOptions));
  
  // Update specific properties for better visibility
  if (customParticlesOptions.particles) {
    customParticlesOptions.particles.color = { value: "#3b82f6" };
    
    if (customParticlesOptions.particles.links) {
      customParticlesOptions.particles.links.color = "#3b82f6";
      customParticlesOptions.particles.links.opacity = 0.3;
      customParticlesOptions.particles.links.distance = 150;
    }
    
    customParticlesOptions.particles.opacity = { value: 0.5 };
    customParticlesOptions.particles.size = { value: { min: 1.5, max: 3 } };
  }
  
  customParticlesOptions.background = { color: "transparent" };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-blue-50/70 to-white/70 dark:from-gray-900/70 dark:to-gray-800/70" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background with Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full max-w-[1920px] mx-auto">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={customParticlesOptions}
            className="w-full h-full"
          />
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Headphones className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Yosr Voice Agent
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have natural conversations with our AI tax expert. Get instant answers to all your tax questions.
            </p>
          </div>

          {/* Preview GIF */}
          <div className="max-w-4xl mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/yosrpreview.gif" 
              alt="YOSR Voice Agent Preview" 
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="flex justify-center mb-16">
            <Button 
              onClick={() => navigate('/register')}
              className="px-8 py-6 text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Get Started!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Talk Section */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
              Talk to Yosr Voice Agent
            </h2>
            
            <div className="flex flex-col items-center justify-center py-8">
              <div className={`w-40 h-40 rounded-full flex items-center justify-center mb-6 ${
                isListening ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  isListening ? 'bg-blue-500 animate-pulse' : 'bg-blue-600'
                }`}>
                  <Mic className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <p className="text-lg text-center mb-2 text-gray-800 dark:text-gray-200">
                {isListening ? 'Listening...' : 'Ready to help with your tax questions'}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                {isListening ? 'Speak now...' : 'Click the button below to start talking with Yosr'}
              </p>
              
              <Button 
                onClick={startListening}
                className="flex items-center gap-2 px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Mic className="w-5 h-5" />
                Start Voice Session
              </Button>
            </div>
          </div>

          {/* How to Use */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              How to Use Yosr Voice Agent
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TalkPage;
