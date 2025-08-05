import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PersonalInfoStep({
  firstName,
  lastName,
  role,
  password,
  confirmPassword,
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

    onSubmit(e);
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
            <Label htmlFor="role">{t('register.jobTitleLabel')}</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => onFieldChange('role', e.target.value)}
              placeholder={t('register.jobTitlePlaceholder')}
              required
              className="mt-2"
            />
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('register.checkingButton') : t('register.createAccount')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 