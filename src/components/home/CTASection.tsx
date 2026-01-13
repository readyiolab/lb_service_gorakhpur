import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Need Home Service Today?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Get professional home services at your doorstep within 60 minutes. 
            Call us now or send a WhatsApp message for instant booking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              asChild 
              className="text-base"
            >
              <a href="tel:+919918012227" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now: +91 9918012227
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild 
              className="text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a 
                href="https://wa.me/919918012227" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm mt-6">
            Working Hours: 24 hr 
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
