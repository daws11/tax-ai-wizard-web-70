import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
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

    if (!disclaimerAgreed || !privacyAgreed) {
      toast({
        title: t('register.agreementRequired'),
        description: t('register.agreementRequired'),
        variant: "destructive",
      });
      return;
    }

    onSubmit(e);
  };

  const isFormValid = firstName && lastName && role && password && confirmPassword && disclaimerAgreed && privacyAgreed;

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
            <Select value={role} onValueChange={(value) => onFieldChange('role', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder={t('register.selectRole')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tax-consultant">{t('register.roles.taxConsultant')}</SelectItem>
                <SelectItem value="business-owner">{t('register.roles.businessOwner')}</SelectItem>
                <SelectItem value="developer">{t('register.roles.developer')}</SelectItem>
              </SelectContent>
            </Select>
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

          {/* Agreements Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t('register.agreementTitle')}</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('register.agreementDescription')}
            </p>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disclaimer"
                checked={disclaimerAgreed}
                onCheckedChange={(checked) => onFieldChange('disclaimerAgreed', checked as boolean)}
              />
              <Label htmlFor="disclaimer" className="text-sm">
                {t('register.disclaimerAgreement')}{' '}
                <a 
                  href="/disclaimer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('register.disclaimerLink')}
                </a>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={privacyAgreed}
                onCheckedChange={(checked) => onFieldChange('privacyAgreed', checked as boolean)}
              />
              <Label htmlFor="privacy" className="text-sm">
                {t('register.privacyAgreement')}{' '}
                <a 
                  href="/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('register.privacyLink')}
                </a>
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isFormValid}
          >
            {loading ? t('register.checkingButton') : t('register.continueButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 