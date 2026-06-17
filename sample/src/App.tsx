import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPageWrapper from "./pages/CategoryPageWrapper";
import ProductDetailWrapper from "./pages/ProductDetailWrapper";
import CheckoutWrapper from "./pages/CheckoutWrapper";
import TrackOrderWrapper from "./pages/TrackOrderWrapper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:slug" element={<CategoryPageWrapper />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
          <Route path="/checkout" element={<CheckoutWrapper />} />
          <Route path="/cart" element={<CheckoutWrapper />} />
          <Route path="/track-order" element={<TrackOrderWrapper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;