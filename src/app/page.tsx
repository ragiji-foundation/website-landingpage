'use client';
import React from 'react';
import { ContentItem } from '@/types/content-types';

import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { Box } from '@mantine/core';


function App() {

  return (
    <main>
      <CardsCarousel />
      <FeaturesSection />
      <Initiatives /> {/* No props needed anymore */}
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <StatsSection />
      </Box>
      <Gallery />
      <Testimonials />
      <SuccessStoriesSection />
    </main>
  );
}

export default App;