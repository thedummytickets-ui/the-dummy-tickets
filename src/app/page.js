import Hero from "@/components/sections/Hero";
import LandingVisuals from "@/components/sections/LandingVisuals";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AirlineCards from "@/components/sections/AirlineCards";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LandingVisuals />
      <HowItWorks />
      <Features />
      <AirlineCards />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
