import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | LB Services Gorakhpur</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/services" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Browse Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
