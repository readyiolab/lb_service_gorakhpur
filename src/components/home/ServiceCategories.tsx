import { Link } from "react-router-dom";
import {
  Wind,
  Zap,
  Droplets,
  Hammer,
  Sparkles,
  Bug,
  Truck,
  Heart,
  Activity,
  PartyPopper,
  Glasses,
  Palette,        // for Interior Design
  Wrench,
  PaintBucket,         // for AC & Tiles Fitter + Home Repair
} from "lucide-react";

const services = [
  { name: "AC Repair & Installation", icon: Wind, slug: "ac-repair" },
  { name: "Electrician Service", icon: Zap, slug: "electrician" },
  { name: "Plumber Service", icon: Droplets, slug: "plumber" },
  { name: "Carpenter Service", icon: Hammer, slug: "carpenter" },
  { name: "Home Cleaning", icon: Sparkles, slug: "home-cleaning" },
  { name: "Pest Control Service", icon: Bug, slug: "pest-control" },
  { name: "Movers and Packers", icon: Truck, slug: "movers-packers" },
  { name: "Makeup & Mehndi Artist", icon: Heart, slug: "makeup-artist" },
  { name: "Physiotherapy at Home", icon: Activity, slug: "physiotherapy" },
  { name: "Event Management", icon: PartyPopper, slug: "event-management" },
  { name: "Glass Cleaning", icon: Sparkles, slug: "glass-cleaning" },
  {name :"False Ceiling Service", icon: PaintBucket, slug: "false-ceiling-painting"},

  // Newly Added Services
  { name: "Interior Design", icon: Palette, slug: "interior-design" },
  { name: " Tiles Fitting", icon: Wrench, slug: "tiles-fitter" },
  { name: "Home Repair & Maintenance", icon: Wrench, slug: "home-repair-maintenance" },
];

const ServiceCategories = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Quick Service Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of professional home services in Gorakhpur. 
            All services come with verified technicians and service warranty.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group flex flex-col items-center p-6 bg-background rounded-2xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-center text-foreground font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                {service.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;