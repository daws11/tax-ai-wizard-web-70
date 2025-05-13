import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt", { email, password });
    navigate("/chat");
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    console.log("Google login");
    navigate("/chat");
  };

  const handleMicrosoftLogin = () => {
    // Implement Microsoft login
    console.log("Microsoft login");
    navigate("/chat");
  };

  const handleGithubLogin = () => {
    // Implement Github login
    console.log("Github login");
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8">
        <Link to="/">
          <img 
            src="/lovable-uploads/1fc64543-d2f9-4ea7-9baa-14cf2510e80a.png" 
            alt="Logo" 
            className="h-12"
          />
        </Link>
      </div>

      <Card className="w-full max-w-md glass-effect">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="w-4 h-4" />
              Microsoft
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-2"
            >
              <img src="https://github.com/favicon.ico" alt="Github" className="w-4 h-4" />
              Github
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login with Email
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <Link 
              to="/register" 
              className="text-primary hover:underline"
            >
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;