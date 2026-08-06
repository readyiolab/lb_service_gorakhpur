import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularServices = [
  {
    title: "AC Gas Filling & Repair",
    description: "Expert AC repair and gas filling for all brands. Same-day service available.",
    price: "From ₹799",
    slug: "ac-repair",
  },
  {
    title: "Electrician on Call",
    description: "Professional electricians for wiring, switches, MCB, and all electrical work.",
    price: "From ₹149",
    slug: "electrician",
  },
 
  {
    title: "Complete Home Cleaning",
    description: "Deep cleaning for your entire home including kitchen, bathroom, and living areas.",
    price: "From ₹499",
    slug: "home-cleaning",
  },
 
  {
    title: "Interior Renovation",
    description: "Complete interior renovation including false ceiling, painting, and woodwork.",
    price: "Get Quote",
    slug: "carpenter",
  },
];

const PopularServices = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Most Booked
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Popular Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most requested services by customers in Gorakhpur. 
            Quality service guaranteed with every booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service, index) => (
            <div
              key={index}
              className="bg-background rounded-xl border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
