import { 
  UserCheck, 
  Clock, 
  IndianRupee, 
  Shield, 
  Wrench, 
  HeadphonesIcon 
} from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Verified & Trained Technicians",
    description: "All our technicians are background verified and professionally trained.",
  },
  {
    icon: Clock,
    title: "Same-Day Service Available",
    description: "Book now and get service within 60 minutes in Gorakhpur.",
  },
  {
    icon: IndianRupee,
    title: "Affordable & Transparent Pricing",
    description: "No hidden charges. Get upfront pricing before service starts.",
  },
  {
    icon: Shield,
    title: "Service Warranty on Every Job",
    description: "30-90 days warranty on all repairs and installations.",
  },
  {
    icon: Wrench,
    title: "Genuine Spare Parts",
    description: "We use only original and high-quality spare parts.",
  },
  {
    icon: HeadphonesIcon,
    title: "Safe & Professional Support",
    description: "24/7 customer support for all your queries and concerns.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Why Choose LB Services Gorakhpur?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best home services experience 
            with quality, reliability, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
