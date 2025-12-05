import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipLink from "./components/SkipLink";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import About from "./pages/About";
import CapitalMarkets from "./pages/CapitalMarkets";
import EB5Advisory from "./pages/EB5Advisory";
import LoanProducts from "./pages/LoanProducts";
import HospitalityFinancing from "./pages/HospitalityFinancing";
import GCReferral from "./pages/GCReferral";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <SkipLink />
            <Header />
            <Breadcrumb />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/capital-markets" element={<CapitalMarkets />} />
                <Route path="/eb5-advisory" element={<EB5Advisory />} />
                <Route path="/loan-products" element={<LoanProducts />} />
                <Route path="/hospitality-financing" element={<HospitalityFinancing />} />
                <Route path="/gc-referral" element={<GCReferral />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
