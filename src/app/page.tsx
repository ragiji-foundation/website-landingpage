'use client';
import { Box, Container } from '@mantine/core';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';

import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { PageTransition } from '@/components/Transitions';  // Updated path
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import GallerySection from '@/components/GallerySection';

export default function App() {
  return (
    <PageTransition>
      <ScrollProgress />
      <main>
        {/* 1. Hero Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              padding: 0,
              margin: 0,
              background: 'var(--gradient-primary)',
              minHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
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
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%)',
              position: 'relative',
              padding: 0,
              overflow: 'hidden'
            }}
          >
            <ErrorBoundary>
              <StatsSection />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>

        {/* 3. Features Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'var(--mantine-color-gray-0)',
              position: 'relative',
              padding: 0,
              overflow: 'hidden'
            }}
          >
            <ErrorBoundary>
              <FeaturesSection
                heading="RAGIJI FOUNDATION : The Solution"
                ctaButton={{
                  text: "Learn More",
                  url: "/initiatives"
                }}
              />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>

        {/* 4. Success Stories Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'linear-gradient(to right, rgba(255, 75, 43, 0.05), rgba(255, 65, 108, 0.05))',
              position: 'relative',
              padding: 0,
              overflow: 'hidden'
            }}
          >
            <ErrorBoundary>
              <SuccessStoriesSection />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>

        {/* 5. Our Gallery */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'white',
              position: 'relative',
              marginTop: '-4rem',
              paddingTop: '8rem',
              paddingBottom: '4rem',
              clipPath: 'polygon(0 0, 100% 4rem, 100% 100%, 0 100%)'
            }}
          >
            <Container size="xl">
              <GallerySection />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 6. Get Involved Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'white',
              position: 'relative',
              marginTop: '-4rem',
              paddingTop: '8rem',
              paddingBottom: '4rem',
              clipPath: 'polygon(0 0, 100% 4rem, 100% 100%, 0 100%)'
            }}
          >
            <Container size="xl">
              <Initiatives
                heading="Get Involved"
                ctaButton={{
                  text: "View All Initiatives",
                  url: "/our-initiatives"
                }}
              />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 7. Testimonials */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'linear-gradient(135deg, rgba(255, 75, 43, 0.05) 0%, rgba(255, 65, 108, 0.1) 100%)',
              position: 'relative',
              padding: 0,
              overflow: 'hidden'
            }}
          >
            <ErrorBoundary>
              <Testimonials type="carousel" />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}
