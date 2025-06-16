import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RegisterPricing } from '@/components/RegisterPricing';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useParticlesConfig } from '@/lib/particles-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) return;
    setShowPricing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would typically handle the selected plan
    console.log('Selected plan:', planId);
  };

  const handleBackToForm = () => {
    setShowPricing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  const particlesOptions = useParticlesConfig();

  // Animation variants for page transitions
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };



  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Particle Background Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full max-w-[1920px] mx-auto">
          <Particles
            id="register-particles"
            init={particlesInit}
            options={particlesOptions}
            className="w-full h-full"
          />
        </div>
      </div>
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-8 px-4">
        <AnimatePresence mode="wait">
          {showPricing ? (
            <motion.div
              key="pricing"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageVariants}
              className="w-full max-w-6xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <Button 
                    variant="ghost" 
                    onClick={handleBackToForm}
                    className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mx-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {t('backToForm', 'Back to Registration')}
                  </Button>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:text-4xl">
                    {t('chooseYourPlan', 'Choose Your Plan')}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {t('selectPlanDescription', 'Select the plan that works best for your tax needs. Start with a free trial. No credit card required.')}
                  </p>
                </div>
                <RegisterPricing 
                  onSelectPlan={handleSelectPlan} 
                  selectedPlan={selectedPlan}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register-form"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageVariants}
              className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
            >
              <Card className="w-full bg-white/80 dark:bg-gray-900/80 border-2 border-primary shadow-2xl rounded-2xl backdrop-blur-md">
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="text-2xl font-extrabold text-center text-gray-900 dark:text-gray-100 tracking-tight">
                    {t('register.title', 'Create Your Account')}
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-base">
                    {t('register.subtitle', 'Join thousands who trust TaxAI with their taxes')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          {t('register.firstName', 'First Name')} *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder={t('register.firstNamePlaceholder', 'Enter your first name')}
                          autoComplete="given-name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {t('register.lastName', 'Last Name')} *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder={t('register.lastNamePlaceholder', 'Enter your last name')}
                          autoComplete="family-name"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t('register.email', 'Email Address')} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('register.emailPlaceholder', 'Enter your email')}
                        autoComplete="email"
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        {t('register.role', 'Role')} *
                      </Label>
                      <Select required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('register.selectRole', 'Select your role')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax-agent">
                            {t('register.roles.taxAgent', 'Tax Agent/Consultant')}
                          </SelectItem>
                          <SelectItem value="business-owner">
                            {t('register.roles.businessOwner', 'Business Owner')}
                          </SelectItem>
                          <SelectItem value="finance">
                            {t('register.roles.finance', 'Finance')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {t('register.password', 'Password')} *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t('register.passwordPlaceholder', 'Create a password')}
                        autoComplete="new-password"
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {t('register.confirmPassword', 'Confirm Password')} *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder={t('register.confirmPasswordPlaceholder', 'Confirm your password')}
                        autoComplete="new-password"
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="relative group">
                      <Button 
                        type="submit"
                        className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 ${
                          acknowledged 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-blue-400 cursor-not-allowed'
                        }`}
                        disabled={!acknowledged}
                      >
                        {t('register.createAccount', 'Next')}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                      {!acknowledged && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Please check the acknowledgement box to continue
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
                        </div>
                      )}
                    </div>
                  </form>
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="flex items-start gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acknowledged}
                        onChange={e => setAcknowledged(e.target.checked)}
                        className="mt-1 accent-blue-600 w-5 h-5 rounded border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        I acknowledge that Tax-AI provides AI-generated insights and does not offer certified tax or legal advice
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
