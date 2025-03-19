'use client';
import { useEffect } from 'react';
import { Container, Title, Card, Avatar, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useTestimonialsStore } from '@/store/useTestimonialsStore';
import { TestimonialsSkeleton } from '@/components/skeletons/TestimonialsSkeleton';
import classes from './Testimonials.module.css';

interface TestimonialsProps {
  type?: 'default' | 'carousel';
  heading?: string;
}

export function Testimonials({ type = 'default', heading = 'What People Say' }: TestimonialsProps) {
  const { items, loading, error, fetchTestimonials } = useTestimonialsStore();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title className={classes.title}>
          {heading}
        </Title>

        {loading ? (
          <TestimonialsSkeleton />
        ) : (
          <Carousel
            slideSize="33.333333%"
            slideGap="lg"
            align="start"
            slidesToScroll={1}
            styles={{
              control: {
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 75, 43, 0.1)',
                color: '#FF4B2B',
                '&:hover': {
                  background: 'white',
                },
              },
            }}
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
    </div>
  );
}