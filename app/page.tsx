import HeroSection from "@/app/components/HeroSection";
import TravelActivity from "@/app/components/TravelActivity";
import TourPackages from "@/app/components/TourPackages";
import Testimonials from "@/app/components/Testimonials";
import ContactSection from "@/app/components/ContactSection";
import TourTypeSection from "./components/TourTypeSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TourTypeSection />
      <TravelActivity />
      <TourPackages />
      <Testimonials />
      <ContactSection />
    </>
  );
}
