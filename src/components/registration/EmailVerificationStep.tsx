import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EmailVerificationStepProps {
  email: string;
  loading: boolean;
  onVerificationSuccess: (userId: string, token: string) => void;
}

export default function EmailVerificationStep({
  email,
  loading,
  onVerificationSuccess
}: EmailVerificationStepProps) {
  const [verificationSent, setVerificationSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [initialEmailSent, setInitialEmailSent] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Cooldown timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Check if we can send email
  const canSendEmail = cooldown === 0 && !verificationSent && !initialEmailSent;

  const sendVerificationEmail = async (isManualResend = false) => {
    // For manual resend, allow if cooldown is 0 and email was sent before
    if (isManualResend) {
      if (cooldown > 0) {
        toast({
          title: t('register.pleaseWaitTitle'),
          description: t('register.pleaseWaitDescription', { seconds: cooldown }),
          variant: "destructive",
        });
        return;
      }
      // Reset states for manual resend
      setVerificationSent(false);
      setInitialEmailSent(false);
    } else {
      // Check if we can send email (cooldown expired or never sent)
      if (!canSendEmail) {
        if (cooldown > 0) {
          toast({
            title: "Please Wait",
            description: `You can resend verification email in ${cooldown} seconds.`,
            variant: "destructive",
          });
        } else if (verificationSent && !initialEmailSent) {
          toast({
            title: t('register.emailAlreadySentTitle'),
            description: t('register.emailAlreadySentDescription'),
            variant: "destructive",
          });
        }
        return;
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setVerificationSent(true);
        setCooldown(60); // 60 seconds cooldown
        
        // Save verification status and timestamp to localStorage
        const currentData = localStorage.getItem('registrationFlowData');
        if (currentData) {
          try {
            const parsed = JSON.parse(currentData);
            parsed.verificationSent = true;
            parsed.lastSentTime = Date.now();
            localStorage.setItem('registrationFlowData', JSON.stringify(parsed));
          } catch (error) {
            console.error('Failed to save verification status:', error);
          }
        }
        
        toast({
          title: t('register.verificationEmailSentTitle'),
          description: t('register.verificationEmailSentDescription'),
        });
      } else if (response.status === 429) {
        // Handle cooldown error
        const errorData = await response.json();
        const remainingTime = errorData.remainingTime || 60;
        setCooldown(remainingTime);
        setVerificationSent(true);
        setInitialEmailSent(true);
        
        // Save cooldown status to localStorage
        const currentData = localStorage.getItem('registrationFlowData');
        if (currentData) {
          try {
            const parsed = JSON.parse(currentData);
            parsed.lastSentTime = Date.now() - ((60 - remainingTime) * 1000);
            localStorage.setItem('registrationFlowData', JSON.stringify(parsed));
          } catch (error) {
            console.error('Failed to save cooldown status:', error);
          }
        }
        
        toast({
          title: "Please Wait",
          description: errorData.message || "Please wait before requesting another verification email.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send verification email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Auto-send verification email only on first mount
  useEffect(() => {
    // Check if we already have a verification token in localStorage
    const savedData = localStorage.getItem('registrationFlowData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // If we have a token, assume email was already sent
        if (parsed.authToken) {
          setVerificationSent(true);
          setInitialEmailSent(true);
          return;
        }
        
        // Restore cooldown if we have lastSentTime
        if (parsed.lastSentTime) {
          const timeSinceLastSent = Date.now() - parsed.lastSentTime;
          const cooldownPeriod = 60 * 1000; // 60 seconds in milliseconds
          
          if (timeSinceLastSent < cooldownPeriod) {
            const remainingCooldown = Math.ceil((cooldownPeriod - timeSinceLastSent) / 1000);
            setCooldown(remainingCooldown);
            setVerificationSent(true);
            setInitialEmailSent(true);
            return;
          }
        }
        
        // If we have verificationSent flag, don't send again
        if (parsed.verificationSent) {
          setVerificationSent(true);
          setInitialEmailSent(true);
          return;
        }
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
    
    // Only send email if we haven't sent one yet and we're not in cooldown
    if (!initialEmailSent && !verificationSent && cooldown === 0) {
      setInitialEmailSent(true);
      sendVerificationEmail(false); // false for auto-send
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Check verification status
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        if (response.ok) {
          // Check if response has content before parsing JSON
          const responseText = await response.text();
          if (responseText.trim()) {
            try {
              const data = JSON.parse(responseText);
              if (data.verified) {
                onVerificationSuccess(data.userId, data.token);
              }
            } catch (parseError) {
              console.error('JSON parsing error in verification check:', parseError);
              console.error('Response text:', responseText);
            }
          }
        } else {
          console.error('Verification check failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    };

    const interval = setInterval(checkVerification, 2000);
    return () => clearInterval(interval);
  }, [email, onVerificationSuccess]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Mail className="w-12 h-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">{t('register.emailVerificationTitle')}</CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.emailVerificationDescription')} <strong>{email}</strong>
        </p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {t('register.emailVerificationInstruction')}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              sendVerificationEmail(true);
            }}
            variant="outline"
            disabled={loading || cooldown > 0}
          >
            {loading ? t('register.sendingButton') : 
             cooldown > 0 ? t('register.resendInSeconds', { seconds: cooldown }) : t('register.resendVerificationEmail')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 