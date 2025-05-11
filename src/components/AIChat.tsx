
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

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

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that tax question. Based on the current tax code, you might be eligible for additional deductions.",
        "That's a good question about your tax situation. The standard deduction for 2024 has been adjusted for inflation.",
        "Looking at your scenario, I would recommend keeping receipts for those business expenses as they'll likely be deductible.",
        "Based on what you've shared, you might qualify for the Earned Income Tax Credit. Would you like me to explain the requirements?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Ask Our AI Tax Expert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 max-h-80 overflow-y-auto space-y-4 p-4 rounded-lg bg-gray-50">
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
                    ? "bg-white text-gray-800"
                    : "bg-primary text-white"
                } p-3 rounded-lg shadow-sm`}
              >
                {message.role === "assistant" && (
                  <Bot className="h-5 w-5 mt-1" />
                )}
                <div className="prose-sm">
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
              <div className="bg-white text-gray-800 p-3 rounded-lg max-w-[80%] flex items-center space-x-2">
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
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Ask about deductions, credits, or filing status..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
