'use client';
import { Box, Container } from '@mantine/core';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { PageTransition } from '@/components/Transitions';  // Updated path
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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


        {/* 2. Stats Section */}
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
              <ErrorBoundary>
                <StatsSection />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>



        {/* 4. Success Stories Carousel */}
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
              <SuccessStoriesSection />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 5. Impact Gallery */}
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
              <Gallery type="masonry" />
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
              background: 'white',
              position: 'relative',
              marginTop: '-4rem',
              paddingTop: '8rem',
              paddingBottom: '4rem',
              clipPath: 'polygon(0 0, 100% 4rem, 100% 100%, 0 100%)'
            }}
          >
            <Container size="xl">
              <Testimonials type="carousel" />
            </Container>
          </Box>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}
