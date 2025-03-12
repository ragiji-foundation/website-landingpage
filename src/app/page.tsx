'use client';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';

export default function App() {
  return (
    <main>
      <CardsCarousel />
      <FeaturesSection 
        heading="RAGIJI FOUNDATION : The Solution" 
        ctaButton={{ 
          text: "Learn More", 
          url: "#" 
        }} 
      />
      <Initiatives />
      <StatsSection />
      <Gallery />
      <Testimonials />
      <SuccessStoriesSection />
    </main>
  );
}
