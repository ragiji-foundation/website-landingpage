'use client';
import { useEffect } from 'react';
import { Container, Title, Text, Stack, Paper } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { motion } from 'framer-motion';
import { useTestimonialsStore } from '@/store/useTestimonialsStore';
import { TestimonialsSkeleton } from '@/components/skeletons/TestimonialsSkeleton';
import classes from './Testimonials.module.css';

const testimonials = [
  {
    quote: "Their impact on our community has been transformative",
    author: "Community Leader"
  },
  {
    quote: "Making real change through sustainable initiatives",
    author: "Program Participant"
  },
  {
    quote: "Dedicated to creating lasting positive impact",
    author: "Partner Organization"
  }
];

export function Testimonials() {
  const { items, loading, error, fetchTestimonials } = useTestimonialsStore();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Voices of Change</Title>

      {loading ? (
        <TestimonialsSkeleton />
      ) : (
        <Carousel
          slideSize="100%"
          slideGap="md"
          loop
          align="center"
          slidesToScroll={1}
        >
          {testimonials.map((testimonial, index) => (
            <Carousel.Slide key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Paper p="xl" radius="md" ta="center">
                  <Stack>
                    <Text size="xl" style={{ fontStyle: 'italic' }}>
                      "{testimonial.quote}"
                    </Text>
                    <Text size="sm" c="dimmed">
                      - {testimonial.author}
                    </Text>
                  </Stack>
                </Paper>
              </motion.div>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Container>
  );
}