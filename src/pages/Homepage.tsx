
import Hero from '../components/Hero';
import WhyWyffle from '../components/WhyWyffle';
import HowItWorks from '../components/HowItWorks';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import Community from '../components/Community';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

const Homepage = () => {
  return (
    <div className="smooth-scroll">
      <Hero />
      <WhyWyffle />
      <HowItWorks />
      <Timeline />
      <Testimonials />
      <Community />
      <FAQ />
      <FinalCTA />
    </div>
  );
};

export default Homepage;