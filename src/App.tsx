import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Phases from "./pages/Phases";
import Academy from "./pages/Academy";
import AcademyExecutive from "./pages/AcademyExecutive";
import AcademyTransition from "./pages/AcademyTransition";
import About from "./pages/About";
import SelfCheck from "./pages/SelfCheck";
import ResultsPreview from "./pages/ResultsPreview";
import TgrTypes from "./pages/TgrTypes";
import Signals from "./pages/Signals";
import SignalDetail from "./pages/SignalDetail";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/phases" element={<Phases />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/academy/leadership" element={<AcademyExecutive />} />
          <Route path="/academy/transition" element={<AcademyTransition />} />
          <Route path="/types" element={<TgrTypes />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/signals/:slug" element={<SignalDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/selfcheck" element={<SelfCheck />} />
          <Route path="/results/preview" element={<ResultsPreview />} />
          <Route path="/results/:id" element={<ResultsPreview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
