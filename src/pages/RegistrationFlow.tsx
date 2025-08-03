import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';
import EmailInputStep from '../components/registration/EmailInputStep';
import EmailVerificationStep from '../components/registration/EmailVerificationStep';
import PersonalInfoStep from '../components/registration/PersonalInfoStep';
import PlanSelectionStep from '../components/registration/PlanSelectionStep';
import SuccessStep from '../components/registration/SuccessStep';
import { useRegistrationFlow, RegistrationStep, RegistrationData } from '../hooks/useRegistrationFlow';

export default function RegistrationFlow() {
  const {
    state,
    updateData,
    goToStep,
    setLoading,
    handleEmailSubmit,
    handleVerificationSuccess,
    handlePersonalInfoSubmit,
    handlePlanSelect,
    handlePaymentSuccess
  } = useRegistrationFlow();

  // Step 1: Email Input
  const EmailInputStepComponent = React.useCallback(() => (
    <EmailInputStep
      email={state.data.email}
      loading={state.loading}
      onEmailChange={(email) => updateData('email', email)}
      onEmailSubmit={handleEmailSubmit}
    />
  ), [state.data.email, state.loading, updateData, handleEmailSubmit]);

  // Step 2: Email Verification
  const EmailVerificationStepComponent = React.useCallback(() => (
    <EmailVerificationStep
      email={state.data.email}
      loading={state.loading}
      onVerificationSuccess={handleVerificationSuccess}
    />
  ), [state.data.email, state.loading, handleVerificationSuccess]);

  // Step 3: Personal Information
  const PersonalInfoStepComponent = React.useCallback(() => (
    <PersonalInfoStep
      firstName={state.data.firstName}
      lastName={state.data.lastName}
      role={state.data.role}
      password={state.data.password}
      confirmPassword={state.data.confirmPassword}
      loading={state.loading}
      onFieldChange={(field, value) => updateData(field as 'firstName' | 'lastName' | 'role' | 'password' | 'confirmPassword', value)}
      onSubmit={handlePersonalInfoSubmit}
    />
  ), [state.data.firstName, state.data.lastName, state.data.role, state.data.password, state.data.confirmPassword, state.loading, updateData, handlePersonalInfoSubmit]);

  // Step 4: Plan Selection
  const PlanSelectionStepComponent = React.useCallback(() => (
    <PlanSelectionStep
      selectedPlan={state.selectedPlan}
      onPlanSelect={handlePlanSelect}
    />
  ), [state.selectedPlan, handlePlanSelect]);

  // Step 5: Payment
  const PaymentStepComponent = React.useCallback(() => {
    const handleBack = () => {
      goToStep('plan-selection');
    };

    if (!state.selectedPlan) {
      return <div>No plan selected</div>;
    }

    return (
      <PaymentForm
        selectedPlan={state.selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
        onBack={handleBack}
      />
    );
  }, [state.selectedPlan, goToStep, handlePaymentSuccess]);

  // Step 6: Success
  const SuccessStepComponent = React.useCallback(() => (
    <SuccessStep
      email={state.data.email}
      firstName={state.data.firstName}
      lastName={state.data.lastName}
      selectedPlan={state.selectedPlan}
    />
  ), [state.data.email, state.data.firstName, state.data.lastName, state.selectedPlan]);

  // Render current step
  const renderStep = () => {
    switch (state.currentStep) {
      case 'email-input':
        return EmailInputStepComponent();
      case 'email-verification':
        return EmailVerificationStepComponent();
      case 'personal-info':
        return PersonalInfoStepComponent();
      case 'plan-selection':
        return PlanSelectionStepComponent();
      case 'payment':
        return PaymentStepComponent();
      case 'success':
        return SuccessStepComponent();
      default:
        return EmailInputStepComponent();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
} 