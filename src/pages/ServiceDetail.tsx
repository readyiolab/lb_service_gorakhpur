import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Check, ArrowLeft } from "lucide-react";

const serviceData: Record<string, {
  title: string;
  description: string;
  services: string[];
  brands?: string[];
  priceRange: string;
  warranty: string;
}> = {
  "ac-repair": {
    title: "AC Repair Service in Gorakhpur",
    description: "Looking for a reliable AC repair service in Gorakhpur? LB Services provides expert technicians for split AC, window AC, inverter AC, and all AC brands.",
    services: [
      "AC Repair",
      "AC Gas Filling",
      "AC Installation & Uninstallation",
      "AC Cooling Issue Fix",
      "AC Water Leakage Repair",
      "AC Maintenance Service",
    ],
    brands: ["LG", "Samsung", "Voltas", "Daikin", "Hitachi", "Whirlpool", "Blue Star", "Carrier", "Godrej"],
    priceRange: "₹99 - ₹2,999",
    warranty: "30-90 Days",
  },
  "electrician": {
    title: "Electrician Service in Gorakhpur",
    description: "Professional electrician services for all your electrical needs. Our trained electricians handle wiring, switches, MCB, fan installation, and all electrical repairs.",
    services: [
      "Wiring & Rewiring",
      "Switch & Socket Repair",
      "MCB/Fuse Box Repair",
      "Fan Installation & Repair",
      "Light Fitting",
      "Inverter & UPS Installation",
    ],
    priceRange: "₹99 - ₹999",
    warranty: "30 Days",
  },
  "plumber": {
    title: "Plumber Service in Gorakhpur",
    description: "Expert plumbing services for all your water and drainage needs. Our skilled plumbers handle leakages, blockages, tap installation, and complete bathroom fittings.",
    services: [
      "Tap & Faucet Repair",
      "Pipe Leakage Repair",
      "Drainage Cleaning",
      "Toilet Repair",
      "Water Tank Cleaning",
      "Bathroom Fitting",
    ],
    priceRange: "₹99 - ₹1,499",
    warranty: "30 Days",
  },
  "home-cleaning": {
    title: "Home Cleaning Service in Gorakhpur",
    description: "Professional home cleaning services for a spotless home. Our trained cleaners provide deep cleaning, bathroom cleaning, kitchen cleaning, and regular home cleaning.",
    services: [
      "Full Home Deep Cleaning",
      "Bathroom Cleaning",
      "Kitchen Cleaning",
      "Sofa & Carpet Cleaning",
      "Window & Glass Cleaning",
      "Move-in/Move-out Cleaning",
    ],
    priceRange: "₹499 - ₹4,999",
    warranty: "Service Guarantee",
  },
  "carpet-cleaning": {
    title: "Carpet Cleaning Service in Gorakhpur",
    description: "Professional carpet and rug cleaning with latest technology. We handle stain removal, deep cleaning, and odor elimination for all types of carpets.",
    services: [
      "Deep Carpet Cleaning",
      "Stain Removal",
      "Rug Cleaning",
      "Odor Elimination",
      "Carpet Drying",
      "Pet Stain Treatment",
    ],
    priceRange: "₹99 - ₹1,999",
    warranty: "Service Guarantee",
  },
  "ro-service": {
    title: "RO Water Purifier Service in Gorakhpur",
    description: "Complete RO water purifier service including filter change, membrane replacement, and annual maintenance. We service all RO brands.",
    services: [
      "RO Filter Change",
      "Membrane Replacement",
      "RO Repair & Servicing",
      "UV Lamp Replacement",
      "Annual Maintenance Contract",
      "New RO Installation",
    ],
    brands: ["Kent", "Aquaguard", "Livpure", "Pureit", "Blue Star", "Havells"],
    priceRange: "₹99 - ₹2,499",
    warranty: "30-90 Days",
  },
  "pest-control": {
    title: "Pest Control Service in Gorakhpur",
    description: "Professional pest control services to keep your home pest-free. We handle cockroaches, termites, bed bugs, mosquitoes, and all types of pests.",
    services: [
      "Cockroach Control",
      "Termite Treatment",
      "Bed Bug Control",
      "Mosquito Control",
      "Rat Control",
      "General Pest Control",
    ],
    priceRange: "₹399 - ₹3,999",
    warranty: "60-90 Days",
  },
  "car-washing": {
    title: "Car Washing Service in Gorakhpur",
    description: "Professional car washing and cleaning service. Quick and affordable car wash for all vehicle types.",
    services: [
      "Exterior Car Wash",
      "Interior Vacuuming",
      "Window Cleaning",
      "Water Spray Wash",
      "Quick Wash Service",
      "Fleet Washing",
    ],
    priceRange: "₹99 - ₹499",
    warranty: "Same Day Service",
  },
  "car-detailing": {
    title: "Car Detailing Service in Gorakhpur",
    description: "Premium car detailing service including polishing, waxing, and complete interior detailing.",
    services: [
      "Car Polishing",
      "Wax Coating",
      "Interior Deep Clean",
      "Leather Care",
      "Engine Cleaning",
      "Paint Protection",
    ],
    priceRange: "₹499 - ₹3,999",
    warranty: "Service Guarantee",
  },
  "car-cleaning": {
    title: "Complete Car Cleaning in Gorakhpur",
    description: "Comprehensive car cleaning service covering exterior and interior cleaning with professional care.",
    services: [
      "Full Body Wash",
      "Interior Vacuuming",
      "Dashboard Cleaning",
      "Seat Cleaning",
      "Carpet Cleaning",
      "Air Freshening",
    ],
    priceRange: "₹199 - ₹1,499",
    warranty: "Same Day Service",
  },
  "event-management": {
    title: "Event Management Service in Gorakhpur",
    description: "Complete event management services for all types of events - birthdays, weddings, corporate events, and more.",
    services: [
      "Event Planning & Coordination",
      "Venue Selection & Booking",
      "Vendor Management",
      "Decoration & Setup",
      "Catering Coordination",
      "Photography & Videography",
    ],
    priceRange: "₹5,000 - ₹1,00,000+",
    warranty: "100% Satisfaction",
  },
  "marriage-planning": {
    title: "Marriage Planning Service in Gorakhpur",
    description: "Professional wedding planning service to make your special day perfect. Complete wedding management from planning to execution.",
    services: [
      "Wedding Planning",
      "Venue Management",
      "Decoration Design",
      "Catering Management",
      "Guest Coordination",
      "Theme & Styling",
    ],
    priceRange: "₹50,000 - ₹5,00,000+",
    warranty: "100% Satisfaction",
  },
  "marriage-hall": {
    title: "Marriage Hall Booking in Gorakhpur",
    description: "Premium marriage halls and banquet spaces available for weddings, receptions, and all types of events.",
    services: [
      "Indoor Banquet Hall",
      "Outdoor Lawn Space",
      "Catering Facility",
      "Parking Available",
      "Sound & Lighting",
      "Customizable Setup",
    ],
    priceRange: "₹10,000 - ₹2,00,000",
    warranty: "Flexible Cancellation",
  },
  "flower-decoration": {
    title: "Flower Decoration Service in Gorakhpur",
    description: "Beautiful flower arrangements and decorations for weddings, events, and celebrations.",
    services: [
      "Wedding Stage Decoration",
      "Gate Decoration",
      "Floral Arrangements",
      "Table Decorations",
      "Ceiling Drapes",
      "Flower Installation",
    ],
    priceRange: "₹5,000 - ₹1,00,000+",
    warranty: "Custom Design",
  },
  "catering": {
    title: "Catering Services in Gorakhpur",
    description: "Professional catering service for all your events with authentic cuisine and quality service.",
    services: [
      "Menu Planning",
      "Food Preparation",
      "Serving Staff",
      "Equipment Provision",
      "Beverage Service",
      "Dessert & Customization",
    ],
    priceRange: "₹200 - ₹2,000 per plate",
    warranty: "Quality Guarantee",
  },
  "bhajan-mandali": {
    title: "Bhajan Mandali for Events in Gorakhpur",
    description: "Professional bhajan mandali groups for wedding ceremonies, religious events, and celebrations.",
    services: [
      "Bhajan Performance",
      "Traditional Singing",
      "Wedding Ceremony Bhajan",
      "Religious Event Singing",
      "Group Coordination",
      "Custom Song Selection",
    ],
    priceRange: "₹5,000 - ₹50,000",
    warranty: "Professional Performance",
  },
  "kirtan-party": {
    title: "Kirtan Party Booking in Gorakhpur",
    description: "Book professional kirtan performers for your religious events and celebrations.",
    services: [
      "Kirtan Performance",
      "Devotional Singing",
      "Musical Accompaniment",
      "Group Kirtan",
      "Event Coordination",
      "Audio Setup",
    ],
    priceRange: "₹5,000 - ₹40,000",
    warranty: "Professional Service",
  },
  "dholak-tabla": {
    title: "Dholak & Tabla Players in Gorakhpur",
    description: "Professional percussion musicians for your events - Dholak and Tabla players for weddings and celebrations.",
    services: [
      "Dholak Playing",
      "Tabla Performance",
      "Live Music Accompaniment",
      "Wedding Music",
      "Event Performance",
      "Professional Musicians",
    ],
    priceRange: "₹3,000 - ₹30,000",
    warranty: "Professional Performance",
  },
  "singer-booking": {
    title: "Geet/Bhakti Singer Booking in Gorakhpur",
    description: "Book talented singers for bhakti geet and traditional songs for your events.",
    services: [
      "Bhakti Geet Singing",
      "Traditional Folk Songs",
      "Wedding Songs",
      "Event Performance",
      "Custom Repertoire",
      "Professional Quality",
    ],
    priceRange: "₹3,000 - ₹40,000",
    warranty: "Quality Performance",
  },
  "shiv-charcha": {
    title: "Shiv Charcha Group Booking in Gorakhpur",
    description: "Professional Shiv Charcha groups for religious celebrations and spiritual events.",
    services: [
      "Shiv Charcha Performance",
      "Spiritual Discourse",
      "Group Singing",
      "Event Management",
      "Priest Coordination",
      "Full Event Setup",
    ],
    priceRange: "₹10,000 - ₹1,00,000",
    warranty: "Professional Service",
  },
  "puja-pandit": {
    title: "Pandit for Satyanarayan Katha & Puja-Paath in Gorakhpur",
    description: "Experienced pandits for Satyanarayan Katha, Grih Pravesh, and all types of puja ceremonies.",
    services: [
      "Satyanarayan Katha",
      "Grih Pravesh Puja",
      "Housewarming Ceremony",
      "Religious Rituals",
      "Puja Guidance",
      "Mantra Chanting",
    ],
    priceRange: "₹2,000 - ₹50,000",
    warranty: "Experienced Pandits",
  },
  "choreographer": {
    title: "Choreographer Service in Gorakhpur",
    description: "Professional choreographers for wedding dances, performances, and event entertainment.",
    services: [
      "Wedding Dance Choreography",
      "Group Dance Choreography",
      "Theme Dance Creation",
      "Performance Training",
      "Event Coordination",
      "Costume Guidance",
    ],
    priceRange: "₹5,000 - ₹100,000",
    warranty: "Professional Choreography",
  },
  "photographer": {
    title: "Professional Photographer in Gorakhpur",
    description: "Professional photography services for weddings, events, and all occasions.",
    services: [
      "Wedding Photography",
      "Event Photography",
      "Portrait Shoots",
      "Album Creation",
      "Video Coverage",
      "Editing & Delivery",
    ],
    priceRange: "₹10,000 - ₹2,00,000+",
    warranty: "Quality Assurance",
  },
  "interior-design": {
    title: "Interior Design Service in Gorakhpur",
    description: "Professional interior design services for homes, offices, and commercial spaces.",
    services: [
      "Space Planning",
      "Design Consultation",
      "3D Visualization",
      "Material Selection",
      "Furniture Coordination",
      "Project Management",
    ],
    priceRange: "₹10,000 - ₹5,00,000+",
    warranty: "Custom Design",
  },
  "3d-design": {
    title: "3D Design Service in Gorakhpur",
    description: "Professional 3D design and visualization for interior and architectural projects.",
    services: [
      "3D Rendering",
      "Virtual Walkthrough",
      "Interior Visualization",
      "Architectural Design",
      "Product Mockups",
      "Realistic Visualization",
    ],
    priceRange: "₹5,000 - ₹100,000+",
    warranty: "Professional Quality",
  },
  "2d-design": {
    title: "2D Design Service in Gorakhpur",
    description: "Professional 2D design services for architectural and interior design projects.",
    services: [
      "Floor Plans",
      "Elevation Drawings",
      "Technical Drawings",
      "Layout Design",
      "Design Documentation",
      "CAD Drawings",
    ],
    priceRange: "₹2,000 - ₹50,000+",
    warranty: "Professional Design",
  },
};

const defaultService = {
  title: "Home Service in Gorakhpur",
  description: "Professional home services at your doorstep. LB Services provides expert technicians for all your home maintenance needs.",
  services: [
    "Expert Technicians",
    "Same-Day Service",
    "Affordable Pricing",
    "Quality Guarantee",
    "Post-Service Support",
  ],
  priceRange: "₹99 onwards",
  warranty: "Service Warranty",
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug || ""] || { ...defaultService, title: `${slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Service in Gorakhpur` };

  return (
    <>
      <Helmet>
        <title>{service.title} | LB Services</title>
        <meta 
          name="description" 
          content={service.description} 
        />
      </Helmet>
      
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Services
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="tel:+919918012227" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now - +91 9918012227
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a 
                    href="https://wa.me/919918012227" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Services List */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Services We Provide
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.services.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {service.brands && (
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Brands We Service
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {service.brands.map((brand, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Service Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="font-bold text-primary">{service.priceRange}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Warranty</span>
                      <span className="font-semibold text-foreground">{service.warranty}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Service Time</span>
                      <span className="font-semibold text-foreground">Same Day</span>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-primary/5 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Same-Day Service",
                      "30–90 Days Warranty",
                      "Trained Technicians",
                      "Affordable Price Range",
                      "Genuine Spare Parts",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-xl p-6 text-center">
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">
                    Book Service Now
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Get instant booking confirmation
                  </p>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="w-full"
                    asChild
                  >
                    <Link to="/contact">Get Free Estimate</Link>
                  </Button>
                </div>

                {/* Contact Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href="tel:+919918012227"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                      <Phone className="w-5 h-5" />
                      +91 9918012227
                    </a>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ServiceDetail;