import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import CoAdminLayout from "./components/admin/CoAdminLayout";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactServicesPage from "./pages/admin/ContactServicesPage";
import ContactInteriorsPage from "./pages/admin/ContactInteriorsPage";
import BlogServicesPage from "./pages/admin/BlogServicesPage";
import BlogInteriorsPage from "./pages/admin/BlogInteriorsPage";
import CreateBlogServicesPage from "./pages/admin/CreateBlogServicesPage";
import CreateBlogInteriorsPage from "./pages/admin/CreateBlogInteriorsPage";
import EditBlogServicesPage from "./pages/admin/EditBlogServicesPage";
import EditBlogInteriorsPage from "./pages/admin/EditBlogInteriorsPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<CoAdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/contact/services" element={<ContactServicesPage />} />
              <Route path="/admin/contact/interiors" element={<ContactInteriorsPage />} />
              <Route path="/admin/blog/services" element={<BlogServicesPage />} />
              <Route path="/admin/blog/services/create" element={<CreateBlogServicesPage />} />
              <Route path="/admin/blog/services/edit/:id" element={<EditBlogServicesPage />} />
              <Route path="/admin/blog/interiors" element={<BlogInteriorsPage />} />
              <Route path="/admin/blog/interiors/create" element={<CreateBlogInteriorsPage />} />
              <Route path="/admin/blog/interiors/edit/:id" element={<EditBlogInteriorsPage />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
