import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const services = [
    "AC Repair & Installation",
    "Electrician Service",
    "Plumber Service",
    "Home Cleaning",
    "Pest Control",
   
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src="/logo.png" alt="logo" className="h-12 mb-10" />
            <p className="text-sm opacity-80 mb-4">
              LB Services Gorakhpur provides verified and affordable home services with trained 
              technicians across Gorakhpur and nearby areas.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61585150221368" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/lbservicesgkp/" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="opacity-80">+91 9918012227</p>
                  
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">lbservicesgkp@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">Office No.8, House No. 806/A, Vishwakarma Sadan, Ashok Nagar, Basharatpur, Gorakhpur – 273004</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">24 hr </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} LB Services Gorakhpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
