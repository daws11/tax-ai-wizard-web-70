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
        // Confirm payment with backend
        await apiService.confirmPayment(paymentIntent.id, selectedPlan.id);
        
        toast({
          title: "Payment Successful",
          description: "Your subscription has been activated!",
        });
        
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "An error occurred during payment. Please try again.",
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
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">{selectedPlan.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{selectedPlan.description}</p>
            <p className="text-2xl font-bold text-primary">${selectedPlan.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card-element">Card Information</Label>
            <div
              id="card-element"
              className="mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md"
            />
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
          Your payment is secured by Stripe. We never store your card information.
        </div>
      </CardContent>
    </Card>
  );
} 