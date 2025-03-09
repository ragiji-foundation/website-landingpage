"use client";
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { Paper, Title, Center, Stack, Loader, Text, Badge, Button, Alert, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconAlertCircle } from '@tabler/icons-react';
import classes from './CardsCarousel.module.css';
import { CarouselSectionLoader } from './CarouselSectionLoader';

interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

function CarouselCard({ imageUrl, title, link }: Omit<CarouselItem, 'id'>) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={classes.motionWrapper}
    >
      <Paper
        shadow="md"
        radius={0}
        className={classes.card}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.cardOverlay}>
          <Stack gap="xl" align="center" justify="center">
            <Title order={1} className={classes.cardTitle}>
              {title}
            </Title>
            <Button
              component="a"
              href={link}
              size="xl"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'teal' }}
              rightSection={<IconArrowRight size={20} />}
              className={classes.cardButton}
            >
              Learn More
            </Button>
          </Stack>
        </div>
      </Paper>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <Paper shadow="md" radius={0} className={classes.card}>
      <div className={classes.skeletonOverlay}>
        <div className={classes.skeletonGradient} />
        <div className={classes.cardOverlay}>
          <Stack gap="xl" align="center" justify="center" style={{ width: '100%' }}>
            <Skeleton height={60} width="70%" radius="md" />
            <Skeleton height={50} width={200} radius="xl" />
          </Stack>
        </div>
      </div>
    </Paper>
  );
}

export function CardsCarousel() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        setError(null);
        const response = await fetch('/api/carousel', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const items = await response.json();
        if (!Array.isArray(items)) {
          throw new Error('Invalid data format received');
        }

        setData(items);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
        setError(error instanceof Error ? error.message : 'Failed to load carousel items');
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  const fallbackData = [
    {
      id: 1,
      title: 'Education Initiative',
      imageUrl: '/carousel/education.jpg',
      link: '/initiatives/education'
    },
    // ...more fallback items
  ];

  if (loading) {
    return <CarouselSectionLoader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Error loading carousel"
        color="red"
        radius="md"
        className={classes.error}
      >
        {error}
      </Alert>
    );
  }

  // Use API data if available, otherwise use fallback
  const carouselData = data.length > 0 ? data : fallbackData;

  const slides = carouselData.map((item) => (
    <Carousel.Slide key={item.id}>
      <CarouselCard
        imageUrl={item.imageUrl}
        title={item.title}
        link={item.link}
      />
    </Carousel.Slide>
  ));

  return (
    <div className={classes.wrapper}>
      <Carousel
        slideSize="100%"
        slideGap={0}
        align="start"
        slidesToScroll={1}
        loop
        withControls
        withIndicators
        initialSlide={active}
        onSlideChange={setActive}
        classNames={classes}
        styles={{
          root: {
            width: '100vw',
            marginLeft: '0',
            marginRight: '0',
            height: '100vh'
          },
          viewport: { overflow: 'visible' },
          control: {
            backgroundColor: 'var(--mantine-color-dark-6)',
            border: 'none',
            color: 'var(--mantine-color-white)',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-dark-5)',
            },
          },

        }}
      >
        {slides}
      </Carousel>
    </div>
  );
}