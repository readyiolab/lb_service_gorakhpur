import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Target, Eye, Users, Clock, HeadphonesIcon, Shield, MapPin } from "lucide-react";

const features = [
  { icon: Users, label: "200+ Home Services" },
  { icon: Clock, label: "Same-Day Booking" },
  { icon: HeadphonesIcon, label: "24/7 Customer Support" },
  { icon: Shield, label: "Warranty on All Services" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | LB Services Gorakhpur - Trusted Home Services</title>
        <meta 
          name="description" 
          content="Learn about LB Services Gorakhpur - your trusted partner for AC repair, electrical work, plumbing, home cleaning and more. Verified technicians, affordable prices." 
        />
      </Helmet>
      
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                About LB Services Gorakhpur
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                LB Services Gorakhpur is a trusted home service company offering AC repair, 
                electrical work,  plumbing, home cleaning, interior design, 
                and automotive services at your doorstep. Our vision is to make home maintenance 
                simple, affordable, and professional for every customer in Gorakhpur.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl border border-border p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To ensure every home in Gorakhpur benefits from simple, professional, 
                  and affordable maintenance services, making daily living comfortable 
                  and worry-free. We strive to be the most trusted name in home services 
                  by delivering quality work every single time.
                </p>
              </div>

              <div className="bg-background rounded-xl border border-border p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading home services platform in Eastern Uttar Pradesh, 
                  connecting skilled technicians with households in need. We envision a 
                  future where getting home repairs and maintenance is as easy as ordering 
                  food online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Offerings
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                What We Offer
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-card rounded-xl border border-border"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Locations */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Service Locations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We proudly serve Basaratpur and all nearby areas in Gorakhpur. 
                Our team of verified technicians is ready to provide quick and 
                reliable home services across the city.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Basaratpur", "Rapti Nagar", "Mohaddipur", "Civil Lines", "Golghar", "Shahmaroof", "Taramandal"].map((area) => (
                  <span 
                    key={area}
                    className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
