import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';
import { User, Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

  const isFormValid = firstName && lastName && role && password && confirmPassword && disclaimerAgreed && privacyAgreed;
  
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
                <SelectItem value="lawyer">{t('register.roles.lawyer')}</SelectItem>
                <SelectItem value="auditor">{t('register.roles.auditor')}</SelectItem>
                <SelectItem value="accountant">{t('register.roles.accountant')}</SelectItem>
              </SelectContent>
            </Select>
            {role && <p className="text-xs text-green-600 mt-1">Selected: {role}</p>}
          </div>
          
          <div>
            <Label htmlFor="password">{t('register.password')}</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="disclaimer"
                checked={disclaimerAgreed}
                onCheckedChange={(checked) => onFieldChange('disclaimerAgreed', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="disclaimer" className="text-sm font-medium">
                  {t('register.termsNoticeTitle')}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={privacyAgreed}
                onCheckedChange={(checked) => onFieldChange('privacyAgreed', checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="privacy" className="text-sm font-medium">
                  {t('register.privacyLink')}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  I agree to the processing of my personal data in accordance with the Privacy Policy.
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
              <span className={disclaimerAgreed ? 'text-green-600' : 'text-red-600'}>
                • Terms & Conditions {disclaimerAgreed ? '✓' : '✗'}
              </span>
              <span className={privacyAgreed ? 'text-green-600' : 'text-red-600'}>
                • Privacy Policy {privacyAgreed ? '✓' : '✗'}
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