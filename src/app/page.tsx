'use client';
import React, { Suspense } from 'react';
import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/landing/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Container, Box } from '@mantine/core';
import { PageTransition } from '@/components/Transitions';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Loading component for suspense fallbacks
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
        <AnimatedSection>
          <Box component="section">
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <CardsCarousel />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section" style={(theme) => ({
            backgroundColor: theme.colors.gray[0]
          })}>
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <FeaturesSection />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section">
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <Initiatives />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section" style={(theme) => ({
            backgroundColor: theme.colors.gray[0]
          })}>
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <StatsSection />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section">
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <Gallery />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section" style={(theme) => ({
            backgroundColor: theme.colors.gray[0]
          })}>
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <Testimonials />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>

        <AnimatedSection>
          <Box component="section">
            <Container size="xl">
              <ErrorBoundary>
                <motion.div variants={sectionVariants}>
                  <Suspense fallback={<SectionLoader />}>
                    <SuccessStoriesSection />
                  </Suspense>
                </motion.div>
              </ErrorBoundary>
            </Container>
          </Box>
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}

export default App;