#!/bin/bash

echo "🚀 Setting up TaxAI Registration System with pnpm..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
pnpm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pnpm install
cd ..

# Create environment files if they don't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# VITE_API_URL is optional, '/api' will be used by default for proxying
# VITE_API_URL=/api
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
EOF
    echo "⚠️  Please update .env.local with your Stripe publishable key"
fi

if [ ! -f "backend/config.env" ]; then
    echo "📝 Creating backend config.env file..."
    cat > backend/config.env << EOF
MONGODB_URI=mongodb+srv://abdurrahman:adventure90@tax-ai.0oilwjh.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
PORT=5000
NODE_ENV=development
EOF
    echo "⚠️  Please update backend/config.env with your actual credentials"
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/config.env with your MongoDB URI and Stripe keys"
echo "2. Update .env.local with your Stripe publishable key"
echo "3. Start both servers: pnpm run dev:full"
echo "   OR start them separately:"
echo "   - Backend: pnpm run dev:backend"
echo "   - Frontend: pnpm run dev"
echo ""
echo "🌐 Frontend will be available at: http://localhost:8080"
echo "🔧 Backend will be available at: http://localhost:5000" 