export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your-stripe-publishable-key',
  DASHBOARD_URL: 'https://www.dashboard.taxai.ae/',
}; 