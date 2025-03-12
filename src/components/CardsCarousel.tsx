"use client";
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { Paper, Title, Center, Stack, Loader, Text, Box } from '@mantine/core';
import { useEffect, useState } from 'react';

import classes from './CardsCarousel.module.css';

interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string | null;
  link: string | null;
  active: boolean;
  order: number;
  type?: 'image' | 'video';  // Make type optional
  videoUrl?: string | null;
}

function Card({ imageUrl, videoUrl, title, type = 'image', link = '#' }: Omit<CarouselItem, 'id' | 'active' | 'order'>) {
  // Add default image for missing sources
  const defaultImage = '/placeholder-image.jpg'; // Make sure this exists in your public folder

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="vs"
      component="a"
      href={link || undefined}
      style={{
        position: 'relative',
        height: 'var(--carousel-height)',
        overflow: 'hidden',
      }}
      className={classes.card}
    >
      {type === 'image' ? (
        <div
          style={{
            backgroundImage: `linear-gradient(169deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%), url(${imageUrl || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      ) : type === 'video' && videoUrl ? (
        <Box className={classes.videoContainer}>
          <video
            key={videoUrl}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div className={classes.videoOverlay} />
        </Box>
      ) : (
        // Fallback for when neither image nor video is available
        <div
          style={{
            backgroundImage: `linear-gradient(169deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%), url(${defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      <Center>
        <div className={classes.contentWrapper}>
          <Stack align="center" gap="xl">
            <Title order={2} className={classes.title} ta="center">
              {title}
            </Title>
            <Paper
              className={classes.ctaButton}
              p="md"
              radius="md"
            >
              Learn More
            </Paper>
          </Stack>
        </div>
      </Center>
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

        // Filter active items, sort by order, and ensure required fields
        const activeItems = items
          .filter(item => item.active)
          .sort((a, b) => a.order - b.order)
          .map(item => ({
            ...item,
            type: item.videoUrl ? 'video' : 'image',
            // Ensure we never pass empty strings
            imageUrl: item.imageUrl || null,
            videoUrl: item.videoUrl || null,
            link: item.link || '#'
          }));

        setData(activeItems);
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

  if (loading) {
    return (
      <Center style={{ height: '90vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '80vh' }}>
        <Stack align="center" gap="md">
          <Text c="red" size="xl" fw={700}>Error</Text>
          <Text>{error}</Text>
        </Stack>
      </Center>
    );
  }

  if (data.length === 0) {
    return (
      <Center style={{ height: '90vh' }}>
        <Title order={2}>No gallery items found</Title>
      </Center>
    );
  }
  const slides = data.map((item) => (
    <Carousel.Slide key={item.id}>
      <Card
        imageUrl={item.imageUrl}
        videoUrl={item.videoUrl}
        title={item.title}
        link={item.link}
        type={item.type}
      />
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
      classNames={classes}
      className={classes.carousel}
      styles={{
        root: {
          height: 'var(--carousel-height)',
        },
        controls: {
          transition: 'opacity 0.3s ease',
          opacity: 0,
          '&:hover': {
            opacity: 0.1,
          },
        },
        control: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0)',
          color: 'white',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0)',
          },
        },
        indicators: {
          bottom: 40,
          gap: '0.5rem',
        },
        indicator: {
          width: 12,
          height: 4,
          transition: 'width 250ms ease, background-color 250ms ease',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          '&[dataActive]': {
            width: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        },
      }}
    >
      {slides}
    </Carousel>
  );
}