import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { Mail } from 'lucide-react';

interface EmailInputStepProps {
  email: string;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onEmailSubmit: (e: React.FormEvent) => void;
}

export default function EmailInputStep({
  email,
  loading,
  onEmailChange,
  onEmailSubmit
}: EmailInputStepProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(e);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Mail className="w-12 h-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Enter Your Work Email</CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          We'll send a verification link to your work email address.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Work Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Checking...' : 'Continue'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 