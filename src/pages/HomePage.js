import React from "react";
import Navbar from "components/Navbar";
import HeroSection from "components/HeroSection";
import ServicesSection from "components/ServicesSection";
import RequestQuote from "components/RequestQuote";
import FeaturesSection from "components/FeaturesSection";
import Testimonials from "components/Testimonials";
import CallToAction from "components/CallToAction";
import Footer from "components/Footer" ; 
import ContactUs from "./ContactUs";

const HomePage = () => {
  return (
    <div className="font-sans bg-gray-100">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <RequestQuote /> 
      <FeaturesSection />
      <Testimonials />
      <CallToAction /> 
      <ContactUs/>
      <Footer />
    </div>
  );
}

export default HomePage;
