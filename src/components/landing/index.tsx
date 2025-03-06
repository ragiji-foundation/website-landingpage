'use client';

import { Box } from '@mantine/core';

import FeaturesSection from './features-section';
import StatsSection from './stats-section';
import SuccessStoriesSection from './success-stories-section';

export default function LandingPage() {
  return (
    <Box>
   
      <StatsSection />
      <FeaturesSection
        heading="Our Initiatives"
        ctaButton={{
          text: "View All Initiatives",
          url: "/initiatives"
        }}
      />
      <SuccessStoriesSection />
    </Box>
  );
}
