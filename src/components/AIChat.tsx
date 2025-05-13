import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Tax Assistant. How can I help you with your taxes today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to login for demo purposes
    navigate("/login");
  };

  return (
    <Card className="max-w-2xl mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Ask Our AI Tax Expert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 max-h-80 overflow-y-auto space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    : "bg-primary text-white"
                } p-3 rounded-lg shadow-sm`}
              >
                {message.role === "assistant" && (
                  <Bot className="h-5 w-5 mt-1" />
                )}
                <div className="prose-sm dark:prose-invert">
                  <p>{message.content}</p>
                </div>
                {message.role === "user" && (
                  <User className="h-5 w-5 mt-1" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-lg max-w-[80%] flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about deductions, credits, or filing status..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChat;
