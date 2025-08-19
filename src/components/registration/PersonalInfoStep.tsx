import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  confirmPassword: string;
  disclaimerAgreed: boolean;
  privacyAgreed: boolean;
  loading: boolean;
  onFieldChange: (field: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PersonalInfoStep({
  firstName,
  lastName,
  role,
  password,
  confirmPassword,
  disclaimerAgreed,
  privacyAgreed,
  loading,
  onFieldChange,
  onSubmit
}: PersonalInfoStepProps) {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    
    // Debug: Log the actual values before validation
    console.log('Submit validation - Actual values:', {
      disclaimerAgreed: disclaimerAgreed,
      privacyAgreed: privacyAgreed,
      disclaimerType: typeof disclaimerAgreed,
      privacyType: typeof privacyAgreed
    });
    
    if (password !== confirmPassword) {
      toast({
        title: t('register.passwordsDontMatchTitle'),
        description: t('register.passwordsDontMatchDescription'),
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('register.passwordTooShortTitle'),
        description: t('register.passwordTooShortDescription'),
        variant: "destructive",
      });
      return;
    }



    console.log('Calling parent onSubmit function');
    onSubmit(e);
  };

  const isFormValid = firstName && lastName && role && password && confirmPassword;
  
  // Debug logging
  console.log('Form validation state:', {
    firstName: !!firstName,
    lastName: !!lastName,
    role: !!role,
    password: !!password,
    confirmPassword: !!confirmPassword,
    isFormValid
  });

  // Individual field validation
  const fieldValidations = {
    firstName: !!firstName,
    lastName: !!lastName,
    role: !!role,
    password: !!password,
    confirmPassword: !!confirmPassword
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">{t('register.personalInfoTitle')}</CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.personalInfoDescription')}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">{t('register.firstName')}</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => onFieldChange('firstName', e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName">{t('register.lastName')}</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => onFieldChange('lastName', e.target.value)}
                required
                className="mt-2"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="role">{t('register.selectRole')}</Label>
            <Select value={role} onValueChange={(value) => {
              console.log('Role selected:', value);
              onFieldChange('role', value);
            }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder={t('register.selectRole')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tax-consultant">{t('register.roles.taxConsultant')}</SelectItem>
                <SelectItem value="business-owner">{t('register.roles.businessOwner')}</SelectItem>
                <SelectItem value="developer">{t('register.roles.developer')}</SelectItem>
              </SelectContent>
            </Select>
            {role && <p className="text-xs text-green-600 mt-1">Selected: {role}</p>}
          </div>
          
          <div>
            <Label htmlFor="password">{t('register.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onFieldChange('password', e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Terms and Conditions Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {t('register.termsNoticeTitle')}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {t('register.termsNoticeText')}{' '}
                  <a 
                    href="/disclaimer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    {t('register.disclaimerLink')}
                  </a>{' '}
                  {t('register.termsNoticeAnd')}{' '}
                  <a 
                    href="/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    {t('register.privacyLink')}
                  </a>
                  {t('register.termsNoticeSuffix')}
                </p>
              </div>
            </div>
          </div>

          {/* Validation Summary */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>Required fields:</p>
            <div className="grid grid-cols-2 gap-2">
              <span className={fieldValidations.firstName ? 'text-green-600' : 'text-red-600'}>
                • First Name {fieldValidations.firstName ? '✓' : '✗'}
              </span>
              <span className={fieldValidations.lastName ? 'text-green-600' : 'text-red-600'}>
                • Last Name {fieldValidations.lastName ? '✓' : '✗'}
              </span>
              <span className={fieldValidations.role ? 'text-green-600' : 'text-red-600'}>
                • Role {fieldValidations.role ? '✓' : '✗'}
              </span>
              <span className={fieldValidations.password ? 'text-green-600' : 'text-red-600'}>
                • Password {fieldValidations.password ? '✓' : '✗'}
              </span>
              <span className={fieldValidations.confirmPassword ? 'text-green-600' : 'text-red-600'}>
                • Confirm Password {fieldValidations.confirmPassword ? '✓' : '✗'}
              </span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isFormValid}
            onClick={() => {
              console.log('Button clicked!', {
                loading,
                isFormValid,
                disabled: loading || !isFormValid
              });
            }}
          >
            {loading ? t('register.checkingButton') : t('register.continueButton')}
          </Button>
          
          {!isFormValid && (
            <p className="text-xs text-red-600 text-center">
              Please fill in all required fields and agree to the terms
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 