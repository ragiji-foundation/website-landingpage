'use client';
import { useEffect } from 'react';
import { Container, Title, Card, Avatar, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useTestimonialsStore } from '@/store/useTestimonialsStore';
import { TestimonialsSkeleton } from '@/components/skeletons/TestimonialsSkeleton';
import classes from './Testimonials.module.css';

export function Testimonials() {
  const { items, loading, error, fetchTestimonials } = useTestimonialsStore();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">
        What People Say
      </Title>

      {loading ? (
        <TestimonialsSkeleton />
      ) : (
        <Carousel
          slideSize="33.333333%"
          slideGap="lg"
          align="start"
          slidesToScroll={1}
        // Handle responsive design with CSS or another method
        >
          {items.map((testimonial) => (
            <Carousel.Slide key={testimonial.id}>
              <Card withBorder radius="md" className={classes.card}>
                <Card.Section className={classes.section}>
                  <Group>
                    <Avatar src={testimonial.imageUrl} size={40} radius="xl" />
                    <div>
                      <Text fw={500}>{testimonial.name}</Text>
                      <Text size="xs" c="dimmed">{testimonial.role}</Text>
                    </div>
                  </Group>
                </Card.Section>
                <Text fz="sm" className={classes.content}>
                  {testimonial.content}
                </Text>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Container>
  );
}