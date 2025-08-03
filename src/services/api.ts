import { config } from '@/config/env';

const API_BASE_URL = config.API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  language?: string;
  subscription: {
    type: 'monthly' | 'quarterly' | 'yearly' | 'trial';
    status: 'active' | 'expired' | 'pending';
    messageLimit: number;
    remainingMessages: number;
    startDate: string;
    endDate: string;
    payment?: {
      amount: number;
      method: string;
      lastPaymentDate?: string;
      nextPaymentDate?: string;
    };
  };
  trialUsed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  messageLimit: number;
  duration: number;
  features: string[];
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  subscriptionType: 'monthly' | 'quarterly' | 'yearly' | 'trial';
}

export interface RegistrationResponse {
  message: string;
  user: User;
  token: string;
  requiresPayment: boolean;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}

export interface Subscription {
  type: 'monthly' | 'quarterly' | 'yearly' | 'trial';
  status: 'active' | 'expired' | 'pending';
  messageLimit: number;
  remainingMessages: number;
  startDate: string;
  endDate: string;
  payment?: {
    amount: number;
    method: string;
    lastPaymentDate?: string;
    nextPaymentDate?: string;
  };
}

export interface PaymentHistory {
  lastPayment?: string;
  nextPayment?: string;
  amount?: number;
  method?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Create error object with response data
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`) as Error & { response: { status: number; data: unknown } };
        error.response = {
          status: response.status,
          data: errorData
        };
        
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get subscription plans
  async getPlans(): Promise<{ plans: Plan[] }> {
    return this.request<{ plans: Plan[] }>('/auth/plans');
  }

  // Register user
  async register(data: RegistrationData): Promise<RegistrationResponse> {
    return this.request<RegistrationResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get user profile
  async getProfile(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/profile');
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<{ message: string; user: User }> {
    return this.request<{ message: string; user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Create payment intent
  async createPaymentIntent(subscriptionType: string): Promise<PaymentIntentResponse> {
    return this.request<PaymentIntentResponse>('/payment/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ subscriptionType }),
    });
  }

  // Confirm payment
  async confirmPayment(paymentIntentId: string, subscriptionType: string): Promise<{ message: string; subscription: Subscription }> {
    return this.request<{ message: string; subscription: Subscription }>('/payment/confirm-payment', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, subscriptionType }),
    });
  }

  // Select plan and send verification email
  async selectPlan(subscriptionType: string): Promise<{ message: string; user: User; requiresEmailVerification: boolean }> {
    return this.request<{ message: string; user: User; requiresEmailVerification: boolean }>('/auth/select-plan', {
      method: 'POST',
      body: JSON.stringify({ subscriptionType }),
    });
  }

  // Update user after email verification (for new flow)
  async updateUserAfterVerification(data: {
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    email: string;
  }): Promise<{ message: string; user: User; token: string }> {
    return this.request<{ message: string; user: User; token: string }>('/auth/update-user-after-verification', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update subscription
  async updateSubscription(subscriptionType: string): Promise<{ message: string; user: User; requiresPayment: boolean }> {
    return this.request<{ message: string; user: User; requiresPayment: boolean }>('/auth/update-subscription', {
      method: 'POST',
      body: JSON.stringify({ subscriptionType }),
    });
  }

  // Get payment history
  async getPaymentHistory(): Promise<{ paymentHistory: PaymentHistory }> {
    return this.request<{ paymentHistory: PaymentHistory }>('/payment/history');
  }
}

export const apiService = new ApiService();
export default apiService; 