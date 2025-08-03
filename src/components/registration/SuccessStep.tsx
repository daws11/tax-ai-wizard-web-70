import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';
import { Plan } from '../../services/api';

interface SuccessStepProps {
  email: string;
  firstName: string;
  lastName: string;
  selectedPlan: Plan | null;
}

export default function SuccessStep({
  email,
  firstName,
  lastName,
  selectedPlan
}: SuccessStepProps) {
  const handleContinueToDashboard = () => {
    // Clear all registration data
    localStorage.removeItem('registrationFlowData');
    localStorage.removeItem('registrationEmail');
    localStorage.removeItem('emailVerificationToken');
    localStorage.removeItem('emailVerified');
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const getEndDate = () => {
    if (!selectedPlan) return 'N/A';
    
    const startDate = new Date();
    const endDate = new Date();
    
    switch (selectedPlan.name.toLowerCase()) {
      case 'monthly':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'quarterly':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'yearly':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case 'trial':
      case 'free trial':
        endDate.setDate(endDate.getDate() + 14); // 14 days trial
        break;
      default:
        endDate.setDate(endDate.getDate() + 14);
    }
    
    return endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Account Activated!</CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          Your account has been successfully created and activated.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Account Details:</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Email:</strong> {email}</div>
              <div><strong>Username:</strong> {firstName} {lastName}</div>
              <div><strong>Plan:</strong> {selectedPlan?.name || 'Trial'}</div>
              <div><strong>Expires:</strong> {getEndDate()}</div>
            </div>
          </div>
          <Button onClick={handleContinueToDashboard} className="w-full">
            Continue to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 