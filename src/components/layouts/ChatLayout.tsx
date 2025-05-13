import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MessageCircle, Phone, Menu, X, Settings, ChevronDown, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on window resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
      current: location.pathname === "/chat",
    },
    {
      name: "Voice Call",
      href: "/chat/call",
      icon: Phone,
      current: location.pathname === "/chat/call",
    },
  ];

  const dummyChats = [
    { id: 1, title: "Tax Deductions 2025", date: "2025-05-13" },
    { id: 2, title: "Business Expenses", date: "2025-05-12" },
    { id: 3, title: "Investment Income", date: "2025-05-11" },
  ];

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Overlay for mobile - clicking outside closes sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - push content instead of overlay */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 h-full">
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/1fc64543-d2f9-4ea7-9baa-14cf2510e80a.png"
                alt="Logo"
                className="h-8"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-6">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {/* Main Navigation */}
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          item.current
                            ? "bg-gray-100 dark:bg-gray-800 text-primary"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Recent Chats */}
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Recent Chats
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {dummyChats.map((chat) => (
                    <li key={chat.id}>
                      <Link
                        to={`/chat?id=${chat.id}`}
                        className={cn(
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                        )}
                      >
                        <span className="truncate">{chat.title}</span>
                        <span className="ml-auto text-xs text-gray-400">
                          {new Date(chat.date).toLocaleDateString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Settings Section */}
              <li className="mt-auto space-y-4">
                {/* Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      Language
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>Indonesian</DropdownMenuItem>
                    <DropdownMenuItem>Spanish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Account Settings */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Account
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Theme:</span>
                  <ThemeToggle />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content - shifts when sidebar opens */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isSidebarOpen && "lg:ml-72"
      )}>
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="sr-only">Toggle sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
          
          <div className="flex-1 text-sm font-semibold">AI Tax Assistant</div>
        </div>

        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;