import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyWyffle from '../components/WhyWyffle';
import FeaturedProjects from '../components/FeaturedProjects';
import HowItWorks from '../components/HowItWorks';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import Community from '../components/Community';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <div className="smooth-scroll">
      <Navbar />
      <Hero />
      <WhyWyffle />
      <FeaturedProjects />
      <HowItWorks />
      <Timeline />
      <Testimonials />
      <Community />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Homepage;