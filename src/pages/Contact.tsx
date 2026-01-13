import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api/forms";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location:"",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = await contactApi.submitServices({
        contact_name: formData.name,
        contact_phone: formData.phone,
        contact_email: formData.email,
        contact_service: formData.service,
        contact_location: formData.location,
        contact_message: formData.message,
      });

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 30 minutes.",
        });
        setFormData({ name: "", phone: "", email: "", service: "", message: "", location: "" });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit form",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+919918012227"],
      action: "tel:+919918012227",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+919918012227"],
      action: "https://wa.me/919918012227",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["lbservicesgkp@gmail.com"],
      action: "mailto:lbservicesgkp@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Office No.8, House No. 806/A, Vishwakarma Sadan",
        "Ashok Nagar, Basharatpur",
        "Gorakhpur – 273004"
      ],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [ "24 hr"],
    },
  ];

 const services = [
  // Home Repair & Maintenance
  "AC Repair & Installation",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Home Painter",
  "Gardening Services",

  // Cleaning & Hygiene
  "Home Cleaning",
  "Home Deep Cleaning",
  "Kitchen Cleaning",
  "Sofa Cleaning",
  "Mattress Cleaning",
  "Carpet Cleaning",
  "Pest Control",
  "Sanitization Service",
  "Glass Cleaning",

  // Car Services
  "Car Washing",
  "Car Detailing",
  "Car Cleaning",

  // Lifestyle & Personal Services
  "Makeup Artist",
  "Bridal Makeup",
  "Mehndi Artist",

  // Movers & Packers
  "Local Shifting",
  "Domestic Shifting",
  "Packing Materials",
  "Labour Services",

  // Healthcare at Home
  "Physiotherapy at Home",

  // Event Management & Entertainment
  "Event Management",
  "Marriage Planning",
  "Birthday Party",
  "Marriage Hall",
  "Flower Decoration",
  "Catering Services",
  "Bhajan Mandali for Events",
  "Kirtan Party Booking",
  "Dholak & Tabla Players",
  "Geet/Bhakti Singer Booking",
  "Shiv Charcha Group Booking",
  "Satyanarayan Katha & Puja-Paath Pandit",
  "Choreographer",
  "Photographer",

  // Interior Design & Décor
  "Interior Designing",
  "3D Design",
  "2D Design",

  // Other
  "Other"
];


  return (
    <>
      <Helmet>
        <title>Contact Us | LB Services Gorakhpur</title>
        <meta 
          name="description" 
          content="Contact LB Services Gorakhpur for all your home service needs. Call +91 98209 95910 or WhatsApp us for instant booking. Working hours: 8 AM – 10 PM." 
        />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question or need to book a service? Reach out to us and 
                we'll respond within 30 minutes during working hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                      Service Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="locations" className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      type="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your requirement..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl border border-border p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">
                              {info.action && idx === 0 ? (
                                <a 
                                  href={info.action} 
                                  target={info.action.startsWith("http") ? "_blank" : undefined}
                                  rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="hover:text-primary transition-colors"
                                >
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact CTA */}
                <div className="bg-primary rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">
                    Need Urgent Service?
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Call us directly for immediate assistance
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="secondary" size="lg" asChild>
                      <a href="tel:+919918012227" className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Call Now
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild
                      className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    >
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
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
