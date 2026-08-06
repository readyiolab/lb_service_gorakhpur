import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CoAdminLayout = lazy(() => import("./components/admin/CoAdminLayout"));
const AdminSignup = lazy(() => import("./pages/admin/AdminSignup"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ContactServicesPage = lazy(() => import("./pages/admin/ContactServicesPage"));
const ContactInteriorsPage = lazy(() => import("./pages/admin/ContactInteriorsPage"));
const BlogServicesPage = lazy(() => import("./pages/admin/BlogServicesPage"));
const BlogInteriorsPage = lazy(() => import("./pages/admin/BlogInteriorsPage"));
const BlogCleanExpertPage = lazy(() => import("./pages/admin/BlogCleanExpertPage"));
const CreateBlogServicesPage = lazy(() => import("./pages/admin/CreateBlogServicesPage"));
const CreateBlogInteriorsPage = lazy(() => import("./pages/admin/CreateBlogInteriorsPage"));
const CreateBlogCleanExpertPage = lazy(() => import("./pages/admin/CreateBlogCleanExpertPage"));
const EditBlogServicesPage = lazy(() => import("./pages/admin/EditBlogServicesPage"));
const EditBlogInteriorsPage = lazy(() => import("./pages/admin/EditBlogInteriorsPage"));
const EditBlogCleanExpertPage = lazy(() => import("./pages/admin/EditBlogCleanExpertPage"));

const queryClient = new QueryClient();

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
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
                <Route path="/admin/blog/clean-expert" element={<BlogCleanExpertPage />} />
                <Route path="/admin/blog/clean-expert/create" element={<CreateBlogCleanExpertPage />} />
                <Route path="/admin/blog/clean-expert/edit/:id" element={<EditBlogCleanExpertPage />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
