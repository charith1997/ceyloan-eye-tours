import ContactSection from '@/app/components/ContactSection'
import HeroSection from '@/app/components/HeroSection'
import Testimonials from '@/app/components/Testimonials'
import TourPackages from '@/app/components/TourPackages'
import TourTypeSection from '@/app/components/TourTypeSection'
import TravelActivity from '@/app/components/TravelActivity'
import React from 'react'

function HomePage() {
  return (
    <>
        <HeroSection />
        <TourTypeSection />
        <TravelActivity />
        <TourPackages />
        <Testimonials />
        <ContactSection />
      </>
  )
}

export default HomePage