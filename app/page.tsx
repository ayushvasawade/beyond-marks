import CartoonNavbar from '../components/CartoonNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import OurStoryMissionSection from '../components/OurStoryMissionSection';

import WhyBeyondMarksSection from '../components/WhyBeyondMarksSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialSection from '../components/TestimonialSection';
import CartoonFooter from '../components/CartoonFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <CartoonNavbar />
      <main className="flex-1 w-full flex flex-col items-center px-2 sm:px-0">
        <HeroSection />
        <FeaturesSection />
        <OurStoryMissionSection />
        <WhyBeyondMarksSection />
        <HowItWorksSection />
        <TestimonialSection />
      </main>
      <CartoonFooter />
    </div>
  );
}
