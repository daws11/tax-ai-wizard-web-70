import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, FileText, Paperclip } from "lucide-react";
import ChatLayout from "@/components/layouts/ChatLayout";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: string[];
}

const dummyMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Tax Assistant. How can I help you with your taxes today?",
    timestamp: new Date("2025-05-13T09:00:00"),
  },
  {
    id: "2",
    role: "user",
    content: "I need help with my business deductions for 2025",
    timestamp: new Date("2025-05-13T09:01:00"),
  },
  {
    id: "3",
    role: "assistant",
    content: "I'd be happy to help you with your business deductions. Let's go through the main categories of deductions available to businesses:\n\n1. Office expenses\n2. Travel costs\n3. Equipment purchases\n4. Employee salaries\n5. Professional services\n\nWhich area would you like to explore first?",
    timestamp: new Date("2025-05-13T09:01:30"),
  },
  {
    id: "4",
    role: "user",
    content: "Can you explain more about office expenses?",
    timestamp: new Date("2025-05-13T09:02:00"),
  },
  {
    id: "5",
    role: "assistant",
    content: "Office expenses that can be deducted include:\n\n• Rent or mortgage payments\n• Utilities (electricity, water, internet)\n• Office supplies\n• Cleaning services\n• Insurance\n• Maintenance and repairs\n\nKeep in mind that if you work from home, you can deduct a portion of these expenses based on the percentage of your home used for business. Would you like me to calculate the deduction for your specific situation?",
    timestamp: new Date("2025-05-13T09:02:30"),
  }
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you're asking about " + input + ". Let me help you with that. This is a simulated response that would be replaced with actual AI processing in a production environment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => file.name);
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  return (
    <ChatLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
        {/* Chat messages with improved padding and max-width */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-4xl px-4 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                } gap-2`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[75%] ${
                    message.role === "assistant"
                      ? "bg-white dark:bg-gray-800"
                      : "bg-primary text-white"
                  } p-3 rounded-lg shadow-sm`}
                >
                  {message.role === "assistant" && (
                    <Bot className="h-5 w-5 mt-1 shrink-0" />
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="prose-sm dark:prose-invert whitespace-pre-wrap">
                      {message.content}
                    </div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                          >
                            <FileText className="h-3 w-3" />
                            {file}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <User className="h-5 w-5 mt-1 shrink-0" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg max-w-[85%] sm:max-w-[75%] flex items-center space-x-2">
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
        </div>

        {/* Attachments preview with proper containment */}
        {attachments.length > 0 && (
          <div className="border-t bg-white dark:bg-gray-800">
            <div className="container mx-auto max-w-4xl px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                  >
                    <FileText className="h-3 w-3" />
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat input with improved responsive layout */}
        <div className="border-t bg-white dark:bg-gray-900 py-4">
          <div className="container mx-auto max-w-4xl px-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
                multiple
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-w-0"
              />
              <Button type="submit" className="shrink-0" disabled={isLoading && !input.trim() && attachments.length === 0}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;