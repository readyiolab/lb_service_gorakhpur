import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingData = [
  {
    service: "AC Service",
    price: "₹299",
    description: "Basic AC service & cleaning",
    features: ["Filter Cleaning", "General Checkup", "Gas Pressure Check"],
    popular: false,
    slug: "ac-repair",
  },
  {
    service: "AC Gas Filling",
    price: "₹799",
    description: "Complete gas refill for split/window AC",
    features: ["Gas Top-up", "Leak Detection", "Pressure Test", "30 Days Warranty"],
    popular: true,
    slug: "ac-repair",
  },
  {
    service: "Electrician Visit",
    price: "₹149",
    description: "Professional electrician on call",
    features: ["Minor Repairs", "Switch/Socket Fix", "Fan Repair"],
    popular: false,
    slug: "electrician",
  },
  {
    service: "Plumber Visit",
    price: "₹149",
    description: "Expert plumber at your doorstep",
    features: ["Leak Repair", "Tap Fix", "Pipe Repair"],
    popular: false,
    slug: "plumber",
  },
  {
    service: "RO Service",
    price: "₹299",
    description: "Water purifier maintenance",
    features: ["Filter Cleaning", "General Service", "Quality Check"],
    popular: false,
    slug: "ro-service",
  },
  {
    service: "Home Cleaning",
    price: "₹499",
    description: "2BHK deep cleaning",
    features: ["All Rooms", "Kitchen & Bath", "Balcony", "4-5 Hours"],
    popular: true,
    slug: "home-cleaning",
  },
  {
    service: "Pest Control",
    price: "₹399",
    description: "Basic pest control treatment",
    features: ["Cockroach Control", "General Pests", "60 Days Warranty"],
    popular: false,
    slug: "pest-control",
  },
  {
    service: "Geyser Service",
    price: "₹249",
    description: "Geyser repair & maintenance",
    features: ["Element Check", "Thermostat Fix", "General Service"],
    popular: false,
    slug: "geyser-service",
  },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing | LB Services Gorakhpur - Affordable Home Services</title>
        <meta 
          name="description" 
          content="Transparent and affordable pricing for all home services. AC repair from ₹299, electrician from ₹149, plumber from ₹149, home cleaning from ₹499." 
        />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Pricing
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Transparent & Affordable Pricing
              </h1>
              <p className="text-lg text-muted-foreground">
                No hidden charges. Know the price before you book. 
                All prices are starting prices and may vary based on work complexity.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pricingData.map((item, index) => (
                <div
                  key={index}
                  className={`relative bg-card rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
                    item.popular ? "border-primary shadow-md" : "border-border"
                  }`}
                >
                  {item.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.service}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-primary">
                        {item.price}
                      </span>
                      <span className="text-muted-foreground text-sm">onwards</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={item.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to={`/services/${item.slug}`}>Book Now</Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-12 p-6 bg-card rounded-xl border border-border max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">Note:</strong> Prices shown are starting prices. 
                Final cost may vary based on the complexity of work, spare parts required, and location. 
                Our technician will provide an exact quote before starting the work.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Pricing;
