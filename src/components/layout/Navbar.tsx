import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="LB Services Gorakhpur" 
              className="h-16 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  isActive(link.path) ? "text-orange-600" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+919918012227" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to="/contact">Get Free Estimate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer - Full Screen */}
      <div 
        className={`fixed top-0 left-0 h-screen w-screen bg-card z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <img 
              src="/logo.png" 
              alt="LB Services" 
              className="h-14 w-auto object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 p-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-6 py-4 rounded-lg text-base font-medium transition-all ${
                  isActive(link.path) 
                    ? "bg-orange-600 text-white shadow-lg" 
                    : "text-foreground hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 p-6 border-t border-border">
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+919918012227" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
            <Button size="lg" asChild>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Get Free Estimate
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;