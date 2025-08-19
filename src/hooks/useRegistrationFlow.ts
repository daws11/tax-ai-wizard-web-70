import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import apiService, { Plan } from '../services/api';

// Step types
export type RegistrationStep = 
  | 'email-input'
  | 'email-verification'
  | 'personal-info'
  | 'plan-selection'
  | 'payment'
  | 'success';

export interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  confirmPassword: string;
  disclaimerAgreed: boolean;
  privacyAgreed: boolean;
}

export interface RegistrationState {
  currentStep: RegistrationStep;
  data: RegistrationData;
  selectedPlan: Plan | null;
  emailVerified: boolean;
  userId: string | null;
  authToken: string | null;
  loading: boolean;
}

export function useRegistrationFlow() {
  const [state, setState] = useState<RegistrationState>({
    currentStep: 'email-input',
    data: {
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      password: '',
      confirmPassword: '',
      disclaimerAgreed: false,
      privacyAgreed: false
    },
    selectedPlan: null,
    emailVerified: false,
    userId: null,
    authToken: null,
    loading: false
  });

  const { toast } = useToast();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('registrationFlowData');
    const registrationEmail = localStorage.getItem('registrationEmail');
    const emailVerified = localStorage.getItem('emailVerified') === 'true';
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    
    console.log('🔄 Loading registration data from localStorage:', {
      hasSavedData: !!savedData,
      registrationEmail,
      emailVerified,
      hasAuthToken: !!authToken,
      userId
    });
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setState(prev => ({
          ...prev,
          data: { ...prev.data, ...parsed.data },
          currentStep: parsed.currentStep || 'email-input',
          emailVerified: parsed.emailVerified || emailVerified,
          userId: parsed.userId || userId,
          authToken: parsed.authToken || authToken,
          selectedPlan: parsed.selectedPlan || null
        }));
      } catch (error) {
        console.error('Failed to load saved registration data:', error);
      }
    }
    
    // If we have an email from verification page, use it and go to personal info
    if (registrationEmail) {
      console.log('📧 Found registration email, setting up flow');
      
      setState(prev => ({
        ...prev,
        data: { ...prev.data, email: registrationEmail },
        currentStep: emailVerified ? 'personal-info' : 'email-verification',
        emailVerified: emailVerified,
        userId: userId || prev.userId,
        authToken: authToken || prev.authToken
      }));
      
      // Clear the email from localStorage
      localStorage.removeItem('registrationEmail');
      localStorage.removeItem('emailVerified');
      localStorage.removeItem('emailVerificationToken');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('registrationFlowData', JSON.stringify({
      data: state.data,
      currentStep: state.currentStep,
      emailVerified: state.emailVerified,
      userId: state.userId,
      authToken: state.authToken,
      selectedPlan: state.selectedPlan
    }));
  }, [state.data, state.currentStep, state.emailVerified, state.userId, state.authToken, state.selectedPlan]);

  const updateData = React.useCallback((field: keyof RegistrationData, value: string | boolean) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value }
    }));
  }, []);

  const goToStep = React.useCallback((step: RegistrationStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const setLoading = React.useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setSelectedPlan = React.useCallback((plan: Plan | null) => {
    setState(prev => ({ ...prev, selectedPlan: plan }));
  }, []);

  const setEmailVerified = React.useCallback((verified: boolean, userId?: string, token?: string) => {
    setState(prev => ({
      ...prev,
      emailVerified: verified,
      userId: userId || prev.userId,
      authToken: token || prev.authToken
    }));
  }, []);

  // Email validation
  const validateEmail = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        return true; // Email is available
      } else {
        toast({
          title: "Email Already Registered",
          description: "This email is already registered. Please use a different email or try logging in.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check email availability. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle email submission
  const handleEmailSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your work email address.",
        variant: "destructive",
      });
      return;
    }

    const isValid = await validateEmail(state.data.email);
    if (isValid) {
      goToStep('email-verification');
    }
  }, [state.data.email, goToStep]);

  // Handle verification success
  const handleVerificationSuccess = React.useCallback((userId: string, token: string) => {
    setEmailVerified(true, userId, token);
    goToStep('personal-info');
  }, [setEmailVerified, goToStep]);

  // Handle personal info submission
  const handlePersonalInfoSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.data.password !== state.data.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (state.data.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!state.data.disclaimerAgreed || !state.data.privacyAgreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to all terms before continuing.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('📝 Submitting personal info for email:', state.data.email);
      
      const response = await apiService.updateUserAfterVerification({
        firstName: state.data.firstName,
        lastName: state.data.lastName,
        role: state.data.role,
        password: state.data.password,
        email: state.data.email
      });

      console.log('✅ Personal info updated successfully:', response);

      // Save token to localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        console.log('🔑 New auth token stored:', response.token);
      }

      // Update state with new user data
      const newUserId = response.user.id;
      const newAuthToken = response.token || localStorage.getItem('authToken');
      
      setState(prev => ({
        ...prev,
        userId: newUserId,
        authToken: newAuthToken
      }));

      // Save updated state to localStorage
      const updatedState = {
        data: state.data,
        currentStep: 'plan-selection',
        emailVerified: true,
        userId: newUserId,
        authToken: newAuthToken,
        selectedPlan: state.selectedPlan
      };
      localStorage.setItem('registrationFlowData', JSON.stringify(updatedState));
      
      console.log('💾 Updated state saved to localStorage');

      goToStep('plan-selection');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
      console.error('❌ Personal info submission failed:', error);
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [state.data.password, state.data.confirmPassword, state.data.firstName, state.data.lastName, state.data.role, state.data.email, state.selectedPlan, setLoading, goToStep, toast]);

  // Handle plan selection
  const handlePlanSelect = React.useCallback(async (plan: Plan) => {
    console.log('📋 Plan selected:', plan);
    
    setSelectedPlan(plan);
    
    try {
      setLoading(true);
      
      // Call backend to save plan selection
      const planType = plan.name.toLowerCase().includes('trial') ? 'trial' : 
                      plan.name.toLowerCase().includes('monthly') ? 'monthly' :
                      plan.name.toLowerCase().includes('quarterly') ? 'quarterly' :
                      plan.name.toLowerCase().includes('yearly') ? 'yearly' : 'trial';
      
      console.log('📋 Saving plan selection to backend:', planType);
      
      const response = await apiService.selectPlan(planType, state.data.email);
      console.log('✅ Plan selection saved:', response);
      
      // Save plan selection to localStorage
      const updatedState = {
        data: state.data,
        currentStep: plan.name.toLowerCase().includes('trial') ? 'success' : 'payment',
        emailVerified: state.emailVerified,
        userId: state.userId,
        authToken: state.authToken,
        selectedPlan: plan
      };
      localStorage.setItem('registrationFlowData', JSON.stringify(updatedState));
      
      if (plan.name.toLowerCase().includes('trial')) {
        // For trial plans, go directly to success
        console.log('🎯 Trial plan selected, going to success step');
        goToStep('success');
      } else {
        // For paid plans, go to payment
        console.log('💳 Paid plan selected, going to payment step');
        goToStep('payment');
      }
    } catch (error) {
      console.error('❌ Failed to save plan selection:', error);
      toast({
        title: "Plan Selection Failed",
        description: "Failed to save your plan selection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [setSelectedPlan, goToStep, state.data, state.emailVerified, state.userId, state.authToken, toast, setLoading]);

  // Handle payment success
  const handlePaymentSuccess = React.useCallback(async (paymentData: { paymentIntentId: string; subscriptionType: string }) => {
    console.log('💳 Payment successful, finalizing registration');
    console.log('📊 Payment data:', paymentData);
    
    try {
      // Ensure we have all required data
      if (!state.userId || !state.authToken || !state.selectedPlan) {
        console.error('❌ Missing required data for success step:', {
          userId: state.userId,
          authToken: state.authToken,
          selectedPlan: state.selectedPlan
        });
        
        toast({
          title: "Registration Error",
          description: "Some data is missing. Please try again or contact support.",
          variant: "destructive",
        });
        return;
      }
      
      // Save final state to localStorage
      const updatedState = {
        data: state.data,
        currentStep: 'success',
        emailVerified: state.emailVerified,
        userId: state.userId,
        authToken: state.authToken,
        selectedPlan: state.selectedPlan
      };
      localStorage.setItem('registrationFlowData', JSON.stringify(updatedState));
      
      console.log('✅ Final state saved to localStorage');
      console.log('🎯 Going to success step with data:', {
        userId: state.userId,
        selectedPlan: state.selectedPlan?.name
      });
      
      goToStep('success');
    } catch (error) {
      console.error('❌ Error in payment success handler:', error);
      toast({
        title: "Payment Error",
        description: "Payment was successful but there was an error finalizing your registration. Please contact support.",
        variant: "destructive",
      });
    }
  }, [goToStep, state.data, state.emailVerified, state.userId, state.authToken, state.selectedPlan, toast]);

  return {
    state,
    updateData,
    goToStep,
    setLoading,
    setSelectedPlan,
    setEmailVerified,
    handleEmailSubmit,
    handleVerificationSuccess,
    handlePersonalInfoSubmit,
    handlePlanSelect,
    handlePaymentSuccess
  };
} 