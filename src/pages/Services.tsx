import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const serviceCategories = [
  
  {
    title: "Home Repair & Maintenance",
    services: [
      { name: "Electrician", slug: "electrician" },
      { name: "Plumber", slug: "plumber" },
      { name: "Carpenter", slug: "carpenter" },
      { name: "Home Painter", slug: "painter" },
      { name: "Gardening Services", slug: "gardening" },
    ],
  },
  {
    title: "Cleaning & Hygiene",
    services: [
      { name: "Home Deep Cleaning", slug: "home-cleaning" },
      { name: "Kitchen Cleaning", slug: "kitchen-cleaning" },
      { name: "Sofa Cleaning", slug: "sofa-cleaning" },
      { name: "Mattress Cleaning", slug: "mattress-cleaning" },
      { name: "Carpet Cleaning", slug: "carpet-cleaning" },
      { name: "Pest Control", slug: "pest-control" },
      { name: "Sanitization Service", slug: "sanitization" },
      { name: "Glass Cleaning", slug: "glass-cleaning" },
      { name: "Car Washing", slug: "car-washing" },
      { name: "Car Detailing", slug: "car-detailing" },
      { name: "Car Cleaning", slug: "car-cleaning" },
    ],
  },
  {
    title: "Lifestyle & Personal Services",
    services: [
      { name: "Makeup Artist", slug: "makeup-artist" },
      { name: "Bridal Makeup", slug: "bridal-makeup" },
      { name: "Mehndi Artist", slug: "mehndi-artist" },
    ],
  },
  {
    title: "Movers & Packers",
    services: [
      { name: "Local Shifting", slug: "local-shifting" },
      { name: "Domestic Shifting", slug: "domestic-shifting" },
      { name: "Packing Materials", slug: "packing-materials" },
      { name: "Labour Services", slug: "labour-services" },
    ],
  },
  {
    title: "Healthcare at Home",
    services: [
      { name: "Physiotherapy at Home", slug: "physiotherapy" },
    ],
  },
  {
    title: "Event Management & Entertainment",
    services: [
      { name: "Event Management", slug: "event-management" },
      { name: "Marriage Planning", slug: "marriage-planning" },
      { name: "Birthday Party", slug: "birthday-party" },
      { name: "Marriage Hall", slug: "marriage-hall" },
      { name: "Flower Decoration", slug: "flower-decoration" },
      { name: "Catering Services", slug: "catering" },
      { name: "Bhajan Mandali for Events", slug: "bhajan-mandali" },
      { name: "Kirtan Party Booking", slug: "kirtan-party" },
      { name: "Dholak & Tabla Players", slug: "dholak-tabla" },
      { name: "Geet/Bhakti Singer Booking", slug: "singer-booking" },
      { name: "Shiv Charcha Group Booking", slug: "shiv-charcha" },
      { name: "Satyanarayan Katha & Puja-Paath Pandit", slug: "puja-pandit" },
      { name: "Choreographer", slug: "choreographer" },
      { name: "Photographer", slug: "photographer" },
    ],
  },
  {
    title: "Interior Design & Décor",
    services: [
      { name: "Interior Designing", slug: "interior-design" },
      { name: "3D Design", slug: "3d-design" },
      { name: "2D Design", slug: "2d-design" },
    ],
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>All Services | LB Services Gorakhpur - Complete Home Services</title>
        <meta 
          name="description" 
          content="Explore all home services offered by LB Services Gorakhpur - AC repair, electrician, plumber, cleaning, pest control, movers & packers, event management, and more. Services starting from ₹99." 
        />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                All Services
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Choose from our comprehensive range of home services. 
                All services come with verified technicians and service warranty.
              </p>
              <p className="text-2xl font-bold text-primary">
                Services Starting from ₹99/-
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Banner */}
        <section className="bg-primary text-primary-foreground py-6">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Call us for instant booking:</p>
              <div className="flex justify-center gap-6 mt-2 flex-wrap">
                <a href="tel:9918012227" className="hover:opacity-80 transition-opacity font-bold text-xl">
                  9918012227
                </a>
                
              </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {serviceCategories.map((category, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 group"
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {service.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;