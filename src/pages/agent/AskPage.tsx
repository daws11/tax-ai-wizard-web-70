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
import { ArrowLeft, MessageSquare, Send, Code, Zap, Lightbulb } from 'lucide-react';
import { useTheme } from "@/components/ThemeProvider";

const AskPage = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

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

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "AI-Powered Responses",
      description: "Get accurate and detailed answers to all your tax-related questions."
    },
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Advanced Technology",
      description: "Powered by cutting-edge AI technology for reliable information."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Quick & Efficient",
      description: "Get instant responses to your tax queries anytime, anywhere."
    }
  ];

  const exampleQuestions = [
    "How do I file my annual tax return?",
    "What expenses are tax deductible for freelancers?",
    "How does tax deduction work for home office?",
    "What documents do I need for tax filing?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register');
  };

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
              <MessageSquare className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              ATTO Chat Agent
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ask any tax-related question and get accurate, AI-powered answers instantly.
            </p>
          </div>

          {/* Preview GIF - Changes based on theme */}
          <div className="max-w-4xl mx-auto mb-8 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={theme === 'dark' 
                ? "/lovable-uploads/attopreview-dark.gif" 
                : "/lovable-uploads/attopreview-light.gif"} 
              alt="ATTO AI Assistant Preview" 
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

          {/* Chat Interface */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
              Ask ATTO Anything About Taxes
            </h2>
            
            <div className="mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 min-h-[200px] mb-4 overflow-y-auto max-h-96">
                {isTyping ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Type your tax-related question below to get started.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {exampleQuestions.map((question, i) => (
                        <button
                          key={i}
                          onClick={() => setMessage(question)}
                          className="text-left p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about taxes..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-3 sm:py-0 h-auto sm:h-[42px] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </form>
            </div>
          </div>

          {/* How to Use */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              How to Use ATTO AI Assistant
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  number: 1,
                  title: "Type Your Question",
                  description: "Enter your tax-related question in the chat box."
                },
                {
                  number: 2,
                  title: "Get Instant Response",
                  description: "Receive an accurate, AI-generated answer immediately."
                },
                {
                  number: 3,
                  title: "Ask Follow-ups",
                  description: "Continue the conversation with related questions."
                },
                {
                  number: 4,
                  title: "Get Help Anytime",
                  description: "Available 24/7 to answer all your tax queries."
                }
              ].map((step) => (
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
  )
};

export default AskPage;
