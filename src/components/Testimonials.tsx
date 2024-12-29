'use client';
import React from 'react';
import { Container, Text, Card, Avatar } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import styles from './Testimonials.module.css';

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Student",
    content: "Thanks to RAGI JI FOUNDATION, I was able to continue my education and pursue my dreams. The support and guidance I received were invaluable.",
    avatar: "https://placeholderimage.com/avatar1.jpg"
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Parent",
    content: "The foundation has made a tremendous impact on my child's education. The teachers are dedicated and caring.",
    avatar: "https://placeholderimage.com/avatar2.jpg"
  },
  {
    id: 3,
    name: "Amit Sharma",
    role: "Volunteer",
    content: "Being part of RAGI JI FOUNDATION has been a rewarding experience. Seeing the children grow and learn is truly inspiring.",
    avatar: "https://placeholderimage.com/avatar3.jpg"
  },
  {
    id: 4,
    name: "Meera Patel",
    role: "Former Student",
    content: "The foundation's scholarship program changed my life. Today, I'm a software engineer and mentor other students. Their support goes beyond financial aid - they build confidence and create opportunities.",
    avatar: "https://placeholderimage.com/avatar4.jpg"
  },
  {
    id: 5,
    name: "Dr. Suresh Verma",
    role: "Education Partner",
    content: "Working with RAGI JI FOUNDATION has been exceptional. Their commitment to quality education and holistic development sets them apart. Together, we've helped hundreds of students reach their potential.",
    avatar: "https://placeholderimage.com/avatar5.jpg"
  },
  {
    id: 6,
    name: "Anita Desai",
    role: "Community Leader",
    content: "I've witnessed the foundation's impact on our local community first-hand. They don't just provide education; they create future leaders and change-makers.",
    avatar: "https://placeholderimage.com/avatar6.jpg"
  },
  {
    id: 7,
    name: "Rajesh Gupta",
    role: "Corporate Donor",
    content: "The transparency and dedication of RAGI JI FOUNDATION impressed us immensely. Every contribution is utilized effectively, creating real impact in children's lives.",
    avatar: "https://placeholderimage.com/avatar7.jpg"
  },
  {
    id: 8,
    name: "Lakshmi Krishnan",
    role: "Teacher",
    content: "Being a teacher at RAGI JI FOUNDATION is incredibly fulfilling. The support system and resources they provide help us bring out the best in every student.",
    avatar: "https://placeholderimage.com/avatar8.jpg"
  }
];

export function Testimonials() {
  return (
    <Container size="xl" className={styles.container}>
      <Text size="xl" fw={700} ta="center" mb={30}>
        What People Say About Us
      </Text>
      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap="md"
        align="start"
        slidesToScroll={1}
        withControls
        loop
        styles={{
          slide: {
            transition: 'all 500ms ease',
            '&[dataActive="true"]': {
              opacity: 1,
            },
          },
          control: {
            backgroundColor: 'var(--mantine-color-dark-6)',
            color: 'var(--mantine-color-white)',
            opacity: 0.8,
            '&:hover': {
              backgroundColor: 'var(--mantine-color-blue-6)',
              opacity: 1,
            },
          },
        }}
      >
        {MOCK_TESTIMONIALS.map((testimonial) => (
          <Carousel.Slide key={testimonial.id}>
            <Card className={styles.testimonialCard} padding="lg">
              <Card.Section className={styles.cardHeader}>
                <Avatar src={testimonial.avatar} size="lg" radius="xl" />
                <div>
                  <Text fw={500}>{testimonial.name}</Text>
                  <Text size="sm" c="dimmed">{testimonial.role}</Text>
                </div>
              </Card.Section>
              <Text className={styles.testimonialContent}>
                {testimonial.content}
              </Text>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}