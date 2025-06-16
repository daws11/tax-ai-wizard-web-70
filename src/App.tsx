import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import AgentPage from "./pages/AgentPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "@/pages/Disclaimer";
import AskPage from "./pages/agent/AskPage";
import TalkPage from "./pages/agent/TalkPage";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="min-h-screen w-full flex justify-center bg-transparent">
          <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 relative">
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/agent" element={<AgentPage />} />
                <Route path="/agent/ask" element={<AskPage />} />
                <Route path="/agent/talk" element={<TalkPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </div>
        </div>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
