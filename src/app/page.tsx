import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import StatsMarquee from "@/components/StatsMarquee";
import Works from "@/components/Works";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <StatsMarquee />
      <Works />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
