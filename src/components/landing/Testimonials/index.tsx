'use client';
import { useEffect, useRef } from 'react';
import { Container, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useTestimonialsStore } from '@/store/useTestimonialsStore';
import { TestimonialsSkeleton } from '@/components/skeletons/TestimonialsSkeleton';
import classes from './Testimonials.module.css';

interface TestimonialsProps {
  heading?: string;
}

export function Testimonials({ heading = 'What People Say' }: TestimonialsProps) {
  const { items, loading, error, fetchTestimonials } = useTestimonialsStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) return <TestimonialsSkeleton />;
  if (error) {
    return (
      <Container size="lg" py="xl">
        <Text c="red" ta="center">Failed to load testimonials</Text>
      </Container>
    );
  }

  const duplicatedItems = [...items, ...items]; // Duplicate items for seamless scroll

  return (
    <div style={{ width: '100vw', overflow: 'hidden' }}>
      <Title order={2} ta="center" mb="xl">
        {heading}
      </Title>
      <motion.div
        ref={containerRef}
        className={classes.testimonialGrid}
        animate={{
          x: [0, -window.innerWidth],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className={classes.testimonialCard}
          >
            <Text mt="md" fz="sm" className={classes.content}>
              {testimonial.content}
            </Text>
            <div className={classes.authorInfo}>
              <Text fw={500}>{testimonial.name}</Text>
              <Text size="xs" c="dimmed">{testimonial.role}</Text>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
