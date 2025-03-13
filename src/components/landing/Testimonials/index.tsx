'use client';
import { useEffect } from 'react';
import { Container, Title, Text, Avatar, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { useTestimonialsStore } from '@/store/useTestimonialsStore';
import { TestimonialsSkeleton } from '@/components/skeletons/TestimonialsSkeleton';
import classes from './Testimonials.module.css';

interface TestimonialsProps {
  heading?: string;
}

export function Testimonials({ heading = 'What People Say' }: TestimonialsProps) {
  const { items, loading, error, fetchTestimonials } = useTestimonialsStore();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) {
    return <TestimonialsSkeleton />;
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Text c="red" ta="center">Failed to load testimonials</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">
        {heading}
      </Title>
      <div className={classes.testimonialGrid}>
        {items.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={classes.testimonialCard}
          >
            <Group>
              <Avatar src={testimonial.imageUrl} size={40} radius="xl" />
              <div>
                <Text fw={500}>{testimonial.name}</Text>
                <Text size="xs" c="dimmed">{testimonial.role}</Text>
              </div>
            </Group>
            <Text mt="md" fz="sm" className={classes.content}>
              {testimonial.content}
            </Text>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
