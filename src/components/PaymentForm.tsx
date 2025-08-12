import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import apiService, { Plan } from '../services/api';

interface PaymentFormProps {
  selectedPlan: Plan;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

// Stripe types
interface Stripe {
  elements: () => StripeElements;
  confirmCardPayment: (clientSecret: string, options: ConfirmCardPaymentOptions) => Promise<ConfirmCardPaymentResult>;
}

interface StripeElements {
  create: (type: string, options?: CardElementOptions) => StripeElement;
}

interface StripeElement {
  mount: (selector: string) => void;
}

interface CardElementOptions {
  style?: {
    base?: Record<string, string | Record<string, string>>;
    invalid?: Record<string, string>;
  };
}

interface ConfirmCardPaymentOptions {
  payment_method: {
    card: StripeElement;
  };
}

interface ConfirmCardPaymentResult {
  error?: {
    message: string;
  };
  paymentIntent?: {
    id: string;
    status: string;
  };
}

declare global {
  interface Window {
    Stripe: (publishableKey: string) => Stripe;
  }
}

export default function PaymentForm({ selectedPlan, onPaymentSuccess, onBack }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [cardElement, setCardElement] = useState<StripeElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load Stripe
    const loadStripe = async () => {
      const stripeInstance = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      setStripe(stripeInstance);
      
      const elementsInstance = stripeInstance.elements();
      setElements(elementsInstance);
      
      const card = elementsInstance.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      });
      
      card.mount('#card-element');
      setCardElement(card);
    };

    if (window.Stripe) {
      loadStripe();
    } else {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = loadStripe;
      document.head.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !cardElement) {
      toast({
        title: "Error",
        description: "Stripe is not loaded yet. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const { clientSecret } = await apiService.createPaymentIntent(selectedPlan.id);
      
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent?.status === 'succeeded') {
        console.log('💳 Payment successful, confirming with backend...');
        
        // Confirm payment with backend
        const confirmationResponse = await apiService.confirmPayment(paymentIntent.id, selectedPlan.id);
        console.log('✅ Payment confirmed with backend:', confirmationResponse);
        
        toast({
          title: "Payment Successful",
          description: "Your subscription has been activated!",
        });
        
        // Call onPaymentSuccess with payment data
        onPaymentSuccess();
      }
    } catch (error: unknown) {
      console.error('Payment error:', error);
      
      // Handle email verification error
      const errorObj = error as { response?: { status?: number; data?: { requiresEmailVerification?: boolean } }; message?: string };
      if (errorObj?.response?.status === 403 && errorObj?.response?.data?.requiresEmailVerification) {
        toast({
          title: "Email Verification Required",
          description: "Please verify your email before proceeding with payment.",
          variant: "destructive",
        });
        // Redirect to email verification page
        window.location.href = '/email-verification-pending';
        return;
      }
      
      toast({
        title: "Payment Error",
        description: errorObj?.message || "An error occurred during payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Complete Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-5 rounded-2xl mb-4 shadow-md border border-blue-100 dark:border-gray-700 relative">
            {/* Plan badge */}
            <div className="absolute top-3 right-3">
              {selectedPlan.id === 'yearly' && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">Best Value</span>
              )}
              {selectedPlan.id === 'quarterly' && (
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</span>
              )}
            </div>
            <h3 className="font-bold text-xl mb-1 text-center text-blue-900 dark:text-blue-200">{selectedPlan.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2 text-center text-sm">{selectedPlan.description}</p>
            <div className="flex flex-col items-center mb-2">
              <span className="text-3xl font-extrabold text-primary">${selectedPlan.price}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">VAT included</span>
            </div>
            <ul className="mt-2 mb-2 space-y-2">
              {selectedPlan.features && selectedPlan.features.length > 0 ? (
                selectedPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
                    <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">No features listed</li>
              )}
            </ul>
            {/* Highlight for yearly plan */}
            {selectedPlan.id === 'yearly' && (
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Save 24%</span>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">Priority support</span>
              </div>
            )}
            {selectedPlan.id === 'quarterly' && (
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">Priority support</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card-element">Card Information</Label>
            <div
              id="card-element"
              className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500 transition"
              tabIndex={0}
              aria-label="Card Information Input"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">We accept Visa, MasterCard, and other major cards. Your payment is secured by Stripe.</p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={loading}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Processing...' : `Pay $${selectedPlan.price}`}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          <span className="inline-flex items-center gap-1">
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7m0 4v4" /></svg>
            Your payment is secured by Stripe. We never store your card information.
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 