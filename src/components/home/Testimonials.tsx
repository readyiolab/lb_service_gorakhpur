import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Basaratpur, Gorakhpur",
    rating: 5,
    text: "Best home service in Gorakhpur! Quick AC repair, same-day visit. The technician was very professional and fixed the issue in no time.",
    service: "AC Repair",
  },
  {
    name: "Priya Sharma",
    location: "Rapti Nagar, Gorakhpur",
    rating: 5,
    text: "Electrician arrived in 30 minutes. Professional and affordable. They fixed all the electrical issues in my home quickly.",
    service: "Electrician",
  },
  {
    name: "Amit Verma",
    location: "Mohaddipur, Gorakhpur",
    rating: 5,
    text: "Excellent home cleaning service! My house has never looked this clean. Will definitely book again for regular cleaning.",
    service: "Home Cleaning",
  },
  
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied 
            customers have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
