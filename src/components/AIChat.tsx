// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Bot, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

const AIChat = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Hi! I'm your AI Tax Assistant. How can I help you with your taxes today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Navigate to login for demo purposes
//     navigate("/agent");
//   };

  return (
    <Card className="max-w-6xl mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
          Meet Our AI Tax Experts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-12 p-6 md:p-8 lg:p-10">
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
          Explore our specialized AI tax assistants designed to help you with different aspects of tax preparation and consultation. Choose the expert that best suits your needs.
        </p>

        {/* Atto Agent Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <Link to="https://chat-taxai.onrender.com/" className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 group overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <img 
              src="/lovable-uploads/atto-preview.gif" 
              alt="ATTO Preview" 
              className="object-contain w-full h-auto"
            />
          </Link>
          <Card className="flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
             <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ATTO</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                Your AI tax consultant based on chat, offering instant, chat-based guidance to intelligently optimize your finances for maximum savings and effortless compliance.
              </p>
              <Link to="https://chat-taxai.onrender.com/">
                <Button className="w-full">Ask Atto!</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* YOSR Agent Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10">
           <Link to="/agent/yosr" className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 group overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
             <img 
              src="/lovable-uploads/yosr-preview.gif" 
              alt="YOSR Preview" 
              className="object-contain w-full h-auto"
            />
          </Link>
          <Card className="flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">YOSR</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                Your intelligent AI tax consultant, offering instant, expert advice and seamless filing support right through a natural voice conversation, making tax season effortlessly clear and optimized for you.
              </p>
               <Link to="/agent/yosr">
                <Button className="w-full">Talk with Yosr!</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
