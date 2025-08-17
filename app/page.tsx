'use client';

import HeroSection from "@/app/components/HeroSection";
import TravelActivity from "@/app/components/TravelActivity";
import TourPackages from "@/app/components/TourPackages";
import Testimonials from "@/app/components/Testimonials";
import ContactSection from "@/app/components/ContactSection";
import TourTypeSection from "./components/TourTypeSection";
import { useEffect, useState } from "react";
import DashboardPage from "../components/pages/Dashboard";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return <DashboardPage />;
  }

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
