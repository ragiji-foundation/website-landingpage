import { Card, Skeleton, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from '@/components/landing/Testimonials/Testimonials.module.css';

export function TestimonialsSkeleton() {
  return (
    <Carousel
      slideSize="33.333333%"
      slideGap="lg"
      align="start"
      slidesToScroll={1}
    >
      {[...Array(3)].map((_, index) => (
        <Carousel.Slide key={index}>
          <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.section}>
              <Group>
                <Skeleton height={40} circle />
                <div style={{ flex: 1 }}>
                  <Skeleton height={16} width="60%" mb={6} />
                  <Skeleton height={12} width="40%" />
                </div>
              </Group>
            </Card.Section>
            <Skeleton height={12} mt="sm" />
            <Skeleton height={12} mt="sm" />
            <Skeleton height={12} mt="sm" width="70%" />
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
