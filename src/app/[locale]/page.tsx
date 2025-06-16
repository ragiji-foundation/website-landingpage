'use client';
import { Box, Container } from '@mantine/core';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import ElectronicMediaSection from '@/components/landing/electronic-media';
import { useMediaQuery } from '@mantine/hooks';

import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials/index';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { PageTransition } from '@/components/Transitions';  // Updated path
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import GallerySection from '@/components/GallerySection';
import classes from './page.module.css';
import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function App({ params: { locale } }: { params: { locale: string } }) {
  const { language, setLanguage, t } = useLanguage();

  // Synchronize the context language with the URL locale
  useEffect(() => {
    if (locale && locale !== language) {
      setLanguage(locale as 'en' | 'hi');
    }
  }, [locale, language, setLanguage]);

  // Add this hook to detect mobile/tablet screens
  const isMobile = useMediaQuery('(max-width: 768px)');

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
              minHeight: isMobile ? '30vh' : '30vh',
              maxHeight: isMobile ? '30vh' : '90vh',
              height: isMobile ? '30vh' : 'auto',
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



        {/* 2. Features Section */}
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
                heading="RAGIJI FOUNDATION"
                subheading="The Solution for Social Change"
                description="Empowering Communities Through Sustainable Development"
                ctaButton={{
                  text: "Download Brochure",
                  url: "/brochure",
                  variant: "gradient",
                  gradient: { from: '#FF4B2B', to: '#FF416C' },
                  size: "lg",
                  leftIcon: "📄",
                  className: classes.downloadButton
                }}
                sectionStyles={{
                  backgroundColor: 'var(--mantine-color-gray-0)',
                  paddingTop: '6rem',
                  paddingBottom: '6rem'
                }}
                titleStyles={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}
              />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>

        {/* 3. Our Initiatives Section */}
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
                heading="Our Initiatives"
                ctaButton={{
                  text: "View All Initiatives",
                  url: "/our-initiatives"
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

        {/* 6. Electronic Media Section */}
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
              <ElectronicMediaSection />
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
              <Testimonials />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>


        {/* 8. Stats Section */}
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
      </main>
    </PageTransition>
  );
}
