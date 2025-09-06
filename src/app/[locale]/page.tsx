'use client';
import React from 'react';
import { Box, Container } from '@mantine/core';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
// import EnhancedElectronicMediaSection from '@/components/landing/enhanced-electronic-media';
import NewsCoverageSection from '@/components/landing/news-coverage-section';
import { useMediaQuery } from '@mantine/hooks';

import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials/index';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { PageTransition } from '@/components/Transitions';  
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import GallerySection from '@/components/GallerySection';
import classes from './page.module.css';
import sectionClasses from './page-sections.module.css';
import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Define the proper type for page params in client component
interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function App({ params }: PageProps) {
  const { language, setLanguage, t } = useLanguage();
  
  // Use React.use to unwrap the params Promise (Next.js 15+ requirement)
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;

  // Add debugging
  useEffect(() => {
    console.log('Page params locale:', locale);
    console.log('Context language:', language);
  }, [locale, language]);

  // Synchronize the context language with the URL locale
  useEffect(() => {
    if (locale && locale !== language) {
      console.log(`Updating language from ${language} to ${locale}`);
      setLanguage(locale as 'en' | 'hi');
    }
  }, [locale, language, setLanguage]);
  
  // Add additional effect for fetching localized content
  useEffect(() => {
    // This is where you'd fetch homepage-specific content with localization
    // For example: fetchHomePageContent(locale);
    console.log('Language changed, refreshing content for:', locale);
    
    // You might want to refetch carousel, features, initiatives, etc.
    // Or you could do this in the respective components
  }, [locale]);

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
              minHeight: isMobile ? 'auto' : '30vh',
              height: isMobile ? 'auto' : 'auto',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Container size="xl" px={isMobile ? 0 : 'md'}>
              <CardsCarousel />
            </Container>
          </Box>
        </AnimatedSection>

        {/* 2. Features Section */}
        <AnimatedSection>
          <Box
            component="section"
            className={sectionClasses.featuresSection}
            style={{
              position: 'relative',
            }}
          >
            <Container size="xl" className={sectionClasses.enhancedContainer}>
              <ErrorBoundary>
                <FeaturesSection
                  heading={t('footer.organization.name')}
                  subheading={t('home.features.subheading')}
                  description={t('home.features.description')}
                  ctaButton={{
                    text: t('joinus.downloadBrochure'),
                    url: `/${language}/brochure`,
                    variant: "gradient",
                    gradient: { from: '#FF4B2B', to: '#FF416C' },
                    size: isMobile ? "md" : "lg",
                    leftIcon: "📄",
                    className: classes.downloadButton
                  }}
                />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>
        
        {/* Stats Section */}
        <AnimatedSection>
          <Box
            component="section"
            className={sectionClasses.statsSection}
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Container size="xl" className={sectionClasses.enhancedContainer}>
              <ErrorBoundary>
                <StatsSection />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection> 
        
        {/* 3. Our Initiatives Section */}
        <AnimatedSection>
          <Box
            component="section"
            className={sectionClasses.initiativesSection}
            style={{
              position: 'relative',
            }}
          >
            <Container size="xl" className={sectionClasses.enhancedContainer}>
              <ErrorBoundary>
                <Initiatives
                  heading={t('initiatives.banner.title')}
                  ctaButton={{
                    text: t('home.initiatives.viewAll'),
                    url: `/${language}/our-initiatives`
                  }}
                />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        {/* 4. Success Stories Section */}
        <AnimatedSection>
          {/* <Box
            component="section"
            py={{ base: 60, md: 80 }}
            className={sectionClasses.successStoriesSection}
            style={{
              position: 'relative',
            }}
          > */}
            <Container size="xl" className={sectionClasses.enhancedContainer}>
              <ErrorBoundary>
                <SuccessStoriesSection />
              </ErrorBoundary>
            </Container>
          {/* </Box> */}
        </AnimatedSection>

        {/* 5. Our Gallery */}
        <AnimatedSection>
          <Box
            component="section"
            className={sectionClasses.gallerySection}
            style={{
              position: 'relative',
            }}
          >
            <Container size="xl" className={sectionClasses.enhancedContainer}>
              <ErrorBoundary>
                <GallerySection />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        {/* 6. News Coverage Section */}
        <AnimatedSection>
          <Box
            component="section"
            style={{
              width: '100vw',
              maxWidth: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
              position: 'relative',
              padding: '2rem 0',
              borderTop: '1px solid var(--mantine-color-gray-2)',
            }}
          >
            <Container size="xl">
              <ErrorBoundary>
                <NewsCoverageSection />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        {/* 7. Electronic Media Section */}
        {/* <AnimatedSection>
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
                <EnhancedElectronicMediaSection />
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection> */}

        {/* 8. Testimonials */}
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
              <Testimonials heading={t('home.testimonials.heading')} />
            </ErrorBoundary>
          </Box>
        </AnimatedSection>

        
      </main>
    </PageTransition>
  );
}
