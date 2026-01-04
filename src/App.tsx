import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import WordCounter from "./pages/WordCounter";
import BinaryTranslator from "./pages/BinaryTranslator";
import MorseTranslator from "./pages/MorseTranslator";
import TextFormatter from "./pages/TextFormatter";
import TextCleaner from "./pages/TextCleaner";
import JsonFormatter from "./pages/JsonFormatter";
import PasswordGenerator from "./pages/PasswordGenerator";
import LoremIpsumGenerator from "./pages/LoremIpsumGenerator";
import Base64Encoder from "./pages/Base64Encoder";
import UrlEncoder from "./pages/UrlEncoder";
import HashGenerator from "./pages/HashGenerator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route path="/binary-translator" element={<BinaryTranslator />} />
              <Route path="/morse-translator" element={<MorseTranslator />} />
              <Route path="/text-formatter" element={<TextFormatter />} />
              <Route path="/text-cleaner" element={<TextCleaner />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/lorem-ipsum" element={<LoremIpsumGenerator />} />
              <Route path="/base64" element={<Base64Encoder />} />
              <Route path="/url-encoder" element={<UrlEncoder />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
