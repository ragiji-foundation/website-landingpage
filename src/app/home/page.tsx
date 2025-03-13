'use client';
import React, { Suspense } from 'react';
import { Loader, Container, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/Transitions';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/GallerySection';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
// import HeroSection from '@/components/landing/hero-section';

const SectionLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <Loader size="xl" variant="dots" />
  </div>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

function App() {
  return (
    <PageTransition>
      <ScrollProgress />
      <main>
        {/* 1. Hero Section - Cards Carousel */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'var(--gradient-primary)',
              minHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: 'var(--pattern-dots)',
                opacity: 0.1
              }
            }}
          >
            <Container size="xl">
              <CardsCarousel />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 2. Stats Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'white',
              position: 'relative',
              marginTop: '-4rem',
              paddingTop: '8rem',
              paddingBottom: '4rem',
              clipPath: 'polygon(0 0, 100% 4rem, 100% 100%, 0 100%)'
            }}
          >
            <Container size="xl">
              <StatsSection />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 3. Features Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'var(--gradient-light)',
              padding: '6rem 0',
              position: 'relative'
            }}
          >
            <Container size="xl">
              <FeaturesSection
                heading="Our Initiatives"
                ctaButton={{
                  text: "Learn More",
                  url: "/initiatives"
                }}
              />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 4. Success Stories Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'white',
              padding: '6rem 0',
              position: 'relative'
            }}
          >
            <Container size="xl">
              <SuccessStoriesSection />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 5. Gallery Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'var(--gradient-warm)',
              padding: '6rem 0',
              position: 'relative',
              clipPath: 'polygon(0 2rem, 100% 0, 100% calc(100% - 2rem), 0 100%)'
            }}
          >
            <Container size="xl">
              <Gallery />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 6. Testimonials Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'white',
              padding: '6rem 0',
              position: 'relative'
            }}
          >
            <Container size="xl">
              <Testimonials
                type="carousel"
                heading="What Our Community Says"
              />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 7. Initiatives Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              background: 'var(--gradient-light)',
              padding: '6rem 0',
              position: 'relative',
              clipPath: 'polygon(0 2rem, 100% 0, 100% 100%, 0 100%)'
            }}
          >
            <Container size="xl">
              <Initiatives
                heading="Get Involved"
                ctaButton={{
                  text: "View All Initiatives",
                  url: "/initiatives"
                }}
              />
            </Container>
          </Box>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}

export default App;