# TaxAI Registration System

A complete registration system with MongoDB backend, Stripe payment integration, and React frontend.

## Features

- User registration with MongoDB
- Subscription plans (Trial, Monthly, Quarterly, Yearly)
- Stripe payment integration
- JWT authentication
- Responsive UI with animations
- Multi-language support

## Prerequisites

- Node.js (v16 or higher)
- pnpm (v8.15.0 or higher)
- MongoDB Atlas account
- Stripe account

## Quick Setup

### 1. Install pnpm (if not installed)
```bash
npm install -g pnpm
```

### 2. Setup the project
```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# OR manually install dependencies
pnpm install
cd backend && pnpm install && cd ..
```

### 3. Configure Environment Variables

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

**Backend (backend/config.env):**
```env
MONGODB_URI=mongodb+srv://abdurrahman:adventure90@tax-ai.0oilwjh.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

**Option 1: Start both servers together**
```bash
pnpm run dev:full
```

**Option 2: Start servers separately**
```bash
# Terminal 1 - Backend
pnpm run dev:backend

# Terminal 2 - Frontend
pnpm run dev
```

## Available Scripts

### Frontend Scripts
- `pnpm run dev` - Start frontend development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

### Backend Scripts
- `pnpm run dev:backend` - Start backend development server
- `pnpm run start:backend` - Start backend production server

### Combined Scripts
- `pnpm run dev:full` - Start both frontend and backend
- `pnpm run setup` - Install all dependencies

## API Endpoints

### Authentication
- `GET /api/auth/plans` - Get subscription plans
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Payment
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent
- `POST /api/payment/confirm-payment` - Confirm payment and activate subscription
- `GET /api/payment/history` - Get payment history

## User Schema

```javascript
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "jobTitle": "String",
  "language": "String (default: null)",
  "subscription": {
    "type": "String (enum: 'monthly', 'quarterly', 'yearly', 'trial')",
    "status": "String (enum: 'active', 'expired', 'pending')",
    "messageLimit": "Number (100, 300, 1200)",
    "remainingMessages": "Number",
    "startDate": "Date",
    "endDate": "Date",
    "payment": {
      "amount": "Number",
      "method": "String",
      "lastPaymentDate": "Date",
      "nextPaymentDate": "Date"
    }
  },
  "trialUsed": "Boolean (default: false)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Subscription Plans

1. **Free Trial** - 14 days, 50 messages
2. **Monthly Plan** - $99/month, 100 messages
3. **Quarterly Plan** - $250/3 months, 300 messages
4. **Yearly Plan** - $899/year, 1200 messages

## Registration Flow

1. User fills out registration form
2. User selects subscription plan
3. If trial: Account created and redirected to dashboard
4. If paid plan: Stripe payment form displayed
5. After successful payment: Account created and redirected to dashboard

## Troubleshooting

### Connection Refused Error
If you see `ERR_CONNECTION_REFUSED` errors:
1. Make sure the backend server is running: `pnpm run dev:backend`
2. Check that the backend is running on port 5000
3. Verify the MongoDB connection in backend/config.env

### pnpm Not Found
If pnpm is not installed:
```bash
npm install -g pnpm
```

### Port Already in Use
If port 5000 is already in use:
1. Change the PORT in backend/config.env
2. Update VITE_API_URL in .env.local accordingly

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments
- bcrypt for password hashing
- express-validator for validation

### Frontend
- React with TypeScript
- Vite for build tool
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Hook Form for forms
- Stripe Elements for payment forms

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to your preferred hosting service (Heroku, Vercel, etc.)
3. Update CORS origins for production

### Frontend Deployment
1. Build the project: `pnpm run build`
2. Deploy the `dist` folder to your hosting service
3. Update environment variables for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
