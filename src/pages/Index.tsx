import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ServiceCategories from "@/components/home/ServiceCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import PopularServices from "@/components/home/PopularServices";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Home Services in Gorakhpur | AC, Electrician, Plumber, Cleaning – LB Services</title>
        <meta 
          name="description" 
          content="LB Services Gorakhpur offers AC repair, plumbing, electrician, appliance repair, cleaning, car repair, interior designing & more. Book verified technicians at your doorstep." 
        />
        <meta 
          name="keywords" 
          content="home services gorakhpur, ac repair gorakhpur, plumber in gorakhpur, electrician in gorakhpur, home cleaning gorakhpur, appliance repair gorakhpur" 
        />
        <link rel="canonical" href="https://lbservicesgorakhpur.com" />
      </Helmet>
      
      <Layout>
        <Hero />
        <ServiceCategories />
        <WhyChooseUs />
        <HowItWorks />
        <PopularServices />
        <Testimonials />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
