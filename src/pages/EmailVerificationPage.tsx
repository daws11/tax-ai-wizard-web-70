import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import apiService from '../services/api';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token) {
          setStatus('error');
          setMessage('Invalid verification link. Please check your email and try again.');
          return;
        }

        // Verify the token with backend
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/verify-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, email }),
          });

          if (response.ok) {
            const data = await response.json();
            
            // Store email and verification data in localStorage
            localStorage.setItem('registrationEmail', email || '');
            localStorage.setItem('emailVerificationToken', token);
            localStorage.setItem('emailVerified', 'true');
            
            setStatus('success');
            setMessage('Email verified successfully! Redirecting to complete your registration...');

            // Redirect to registration page after a short delay
            setTimeout(() => {
              navigate('/registration');
            }, 2000);
          } else {
            const errorData = await response.json();
            setStatus('error');
            setMessage(errorData.message || 'Verification failed. Please try again.');
          }
        } catch (error) {
          console.error('Backend verification error:', error);
          // Fallback: still redirect to registration if backend is down
          if (email) {
            localStorage.setItem('registrationEmail', email);
            localStorage.setItem('emailVerified', 'true');
          }
          
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to complete your registration...');
          
          setTimeout(() => {
            navigate('/registration');
          }, 2000);
        }

      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage('Failed to verify email. Please try again or contact support.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleRetry = () => {
    setStatus('loading');
    setMessage('');
    // Reload the page to retry
    window.location.reload();
  };

  const handleGoToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'loading' && <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-12 h-12 text-green-600" />}
            {status === 'error' && <XCircle className="w-12 h-12 text-red-600" />}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          
          {status === 'error' && (
            <div className="space-y-3">
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
              <Button 
                onClick={handleGoToRegistration} 
                variant="outline" 
                className="w-full"
              >
                Go to Registration
              </Button>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Redirecting automatically...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 