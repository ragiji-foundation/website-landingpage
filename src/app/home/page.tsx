'use client';
import React from 'react';


import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
// import HeroSection from '@/components/landing/hero-section';

function App() {
  return (
    <main>

      <CardsCarousel />
      {/* <HeroSection /> */}
      <FeaturesSection
        heading="Our Initiatives"
        ctaButton={{
          text: "Learn More",
          url: "/initiatives"
        }}
      />
      <Initiatives /> {/* No props needed anymore */}

      <StatsSection />

      <Gallery />
      <Testimonials />
      <SuccessStoriesSection />
    </main>
  );
}

export default App;