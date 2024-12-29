"use client";
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { Button, Paper, Title, Center, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

import classes from './CardsCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  href: string;
}

function Card({ image, title, href }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      className={classes.card}
      component="a"
      href={href}
    >
      <Center>
        <Stack align="center" gap="md">
          <Title order={2} className={classes.title} ta="center">
            {title}
          </Title>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            size="lg"
            className={classes.button}
          >
            Read More
          </Button>
        </Stack>
      </Center>
    </Paper>
  );
}

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    href: '#',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    href: '#',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    href: '#',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    href: '#',
  },
];

export function CardsCarousel() {
  const [active, setActive] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % data.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      slideGap="xs"
      align="center"
      slidesToScroll={1}
      loop
      withIndicators
      withControls
      initialSlide={active}
      onSlideChange={setActive}
      controlSize={44}
      styles={{
        root: {
          height: '90vh',
        },
        indicator: {
          width: 12,
          height: 4,
          transition: 'width 550ms ease',
          '&[dataActive="true"]': {
            width: 40,
          },
        },
      }}
    >
      {slides}
    </Carousel>
  );
}