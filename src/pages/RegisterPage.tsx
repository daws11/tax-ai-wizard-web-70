import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useParticlesConfig } from '../lib/particles-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../components/ui/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RegisterPricing } from '../components/RegisterPricing';
import PaymentForm from '../components/PaymentForm';
import apiService, { Plan, RegistrationData } from '../services/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../components/ui/dialog';
import { Loader2 } from 'lucide-react';

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
  const { toast } = useToast();
  const [acknowledged, setAcknowledged] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successDialogInfo, setSuccessDialogInfo] = useState<{planName: string, email: string} | null>(null);

  // Load plans on component mount
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const { plans: fetchedPlans } = await apiService.getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error('Failed to load plans:', error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        });
      }
    };
    loadPlans();
  }, [toast]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) {
      toast({
        title: "Warning",
        description: "You must check the acknowledgement box before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setShowPricing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    setSelectedPlan(plan);

    if (!validateRegistrationData()) return;
    setLoading(true);
    try {
      const registrationData: RegistrationData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        jobTitle: formData.role,
        subscriptionType: plan.id as 'monthly' | 'quarterly' | 'yearly' | 'trial'
      };
      const response = await apiService.register(registrationData);
      localStorage.setItem('authToken', response.token);
      setSuccessDialogInfo({ planName: plan.name, email: formData.email });
      if (plan.id === 'trial') {
        setSuccessDialogOpen(true);
      } else {
        setShowPayment(true);
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create account";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateRegistrationData = () => {
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Validation Error",
        description: "First and last name are required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.role || formData.role.length < 2) {
      toast({
        title: "Validation Error",
        description: "Role must be at least 2 characters.",
        variant: "destructive",
      });
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      toast({
        title: "Validation Error",
        description: "Password must contain uppercase, lowercase, and a number.",
        variant: "destructive",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async () => {
    if (!selectedPlan) return;
    setSuccessDialogInfo({ planName: selectedPlan.name, email: formData.email });
    setSuccessDialogOpen(true);
  };

  const handleBackToForm = () => {
    setShowPricing(false);
    setShowPayment(false);
    setSelectedPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPricing = () => {
    setShowPayment(false);
    setSelectedPlan(null);
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
        ease: ['easeInOut']
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: ['easeInOut']
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
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="flex flex-col items-center gap-2 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
              <Loader2 className="animate-spin w-8 h-8 text-blue-600 mb-2" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">Processing, please wait...</span>
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {showPayment && selectedPlan && localStorage.getItem('authToken') ? (
            <motion.div
              key="payment"
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
                    onClick={handleBackToPricing}
                    className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mx-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {t('backToPricing', 'Back to Plans')}
                  </Button>
                </div>
                <PaymentForm 
                  selectedPlan={selectedPlan}
                  onPaymentSuccess={handlePaymentSuccess}
                  onBack={handleBackToPricing}
                />
              </div>
            </motion.div>
          ) : showPricing ? (
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
                  plans={plans}
                  onSelectPlan={handleSelectPlan} 
                  selectedPlan={selectedPlan?.id}
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
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder={t('register.firstNamePlaceholder', 'Enter your first name')}
                          autoComplete="given-name"
                          required
                          className="w-full"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {t('register.lastName', 'Last Name')} *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder={t('register.lastNamePlaceholder', 'Enter your last name')}
                          autoComplete="family-name"
                          required
                          className="w-full"
                          disabled={loading}
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
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('register.emailPlaceholder', 'Enter your email')}
                        autoComplete="email"
                        required
                        className="w-full"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        {t('register.role', 'Role')} *
                      </Label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(value) => handleInputChange('role', value)}
                        required
                        disabled={loading}
                      >
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
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={t('register.passwordPlaceholder', 'Create a password')}
                        autoComplete="new-password"
                        required
                        className="w-full"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {t('register.confirmPassword', 'Confirm Password')} *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder={t('register.confirmPasswordPlaceholder', 'Confirm your password')}
                        autoComplete="new-password"
                        required
                        className="w-full"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative group">
                      <Button 
                        type="submit"
                        className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 ${
                          acknowledged 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-blue-400'
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : t('register.createAccount', 'Next')}
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
                        disabled={loading}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        I acknowledge that Tax-AI provides AI-generated insights and does not offer certified tax or legal advice
                      </span>
                    </label>
                  </div>
                  {/* Login navigation for existing users */}
                  <div className="mt-6 text-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Already have an account?{' '}
                      <a
                        href="https://dashboard.taxai.ae/"
                        className="text-blue-600 hover:underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Login
                      </a>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Created Successfully!</DialogTitle>
            <DialogDescription>
              Your account has been created. Please login to the dashboard using the email and password you registered.<br/>
              <b>Email:</b> {successDialogInfo?.email}<br/>
              <b>Selected Plan:</b> {successDialogInfo?.planName}<br/>
              <span className="block mt-2 text-xs text-gray-500">If you do not receive a confirmation email, please check your spam folder or contact support.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                window.location.href = 'https://dashboard.taxai.ae/';
              }}
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
