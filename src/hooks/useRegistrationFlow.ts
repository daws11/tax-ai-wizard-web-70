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
      confirmPassword: ''
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
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setState(prev => ({
          ...prev,
          data: { ...prev.data, ...parsed.data },
          currentStep: parsed.currentStep || 'email-input',
          emailVerified: parsed.emailVerified || false,
          userId: parsed.userId || null,
          authToken: parsed.authToken || null,
          selectedPlan: parsed.selectedPlan || null
        }));
      } catch (error) {
        console.error('Failed to load saved registration data:', error);
      }
    }
    
    // If we have an email from verification page, use it and go to personal info
    if (registrationEmail) {
      const emailVerified = localStorage.getItem('emailVerified') === 'true';
      
      setState(prev => ({
        ...prev,
        data: { ...prev.data, email: registrationEmail },
        currentStep: emailVerified ? 'personal-info' : 'email-verification',
        emailVerified: emailVerified
      }));
      
      // Clear the email from localStorage
      localStorage.removeItem('registrationEmail');
      localStorage.removeItem('emailVerified');
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

  const updateData = React.useCallback((field: keyof RegistrationData, value: string) => {
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

    setLoading(true);
    try {
      const response = await apiService.updateUserAfterVerification({
        firstName: state.data.firstName,
        lastName: state.data.lastName,
        role: state.data.role,
        password: state.data.password,
        email: state.data.email
      });

      // Save token to localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      setState(prev => ({
        ...prev,
        userId: response.user.id,
        authToken: response.token || localStorage.getItem('authToken')
      }));

      // Save updated state to localStorage
      const updatedState = {
        data: state.data,
        currentStep: 'plan-selection',
        emailVerified: true,
        userId: response.user.id,
        authToken: response.token || localStorage.getItem('authToken'),
        selectedPlan: state.selectedPlan
      };
      localStorage.setItem('registrationFlowData', JSON.stringify(updatedState));

      goToStep('plan-selection');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [state.data.password, state.data.confirmPassword, state.data.firstName, state.data.lastName, state.data.role, setLoading, goToStep]);

  // Handle plan selection
  const handlePlanSelect = React.useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    
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
      goToStep('success');
    } else {
      // For paid plans, go to payment
      goToStep('payment');
    }
  }, [setSelectedPlan, goToStep, state.data, state.emailVerified, state.userId, state.authToken]);

  // Handle payment success
  const handlePaymentSuccess = React.useCallback(() => {
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
    
    goToStep('success');
  }, [goToStep, state.data, state.emailVerified, state.userId, state.authToken, state.selectedPlan]);

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