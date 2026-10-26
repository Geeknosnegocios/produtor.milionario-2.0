import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upsell from "./pages/Upsell";
import Upsell2 from "./pages/Upsell2";
import Captura from "./pages/Captura";
import BlackFriday from "./pages/BlackFriday";
import BlackFridayThanks from "./pages/BlackFridayThanks";
import BlackFridayPrivacy from "./pages/BlackFridayPrivacy";
import BlackFridayOferta from "./pages/BlackFridayOferta";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upsell" element={<Upsell />} />
          <Route path="/upsell-2" element={<Upsell2 />} />
          <Route path="/aula" element={<Captura />} />
          <Route path="/blackfriday" element={<BlackFriday />} />
          <Route path="/blackfriday/obrigado" element={<BlackFridayThanks />} />
          <Route path="/blackfriday/privacidade" element={<BlackFridayPrivacy />} />
          <Route path="/blackfriday/oferta" element={<BlackFridayOferta />} />
          <Route path="/captura" element={<Captura />} />
          <Route path="/obrigado" element={<Obrigado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
