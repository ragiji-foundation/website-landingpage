"use client";

import { Carousel } from '@mantine/carousel';
import { Paper, Stack, Skeleton } from '@mantine/core';
import classes from './CardsCarousel.module.css';

function LoadingSlide() {
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

export function CarouselSectionLoader() {
  return (
    <div className={classes.wrapper}>
      <Carousel
        slideSize="100%"
        slideGap={0}
        align="start"
        slidesToScroll={1}
        withControls
        withIndicators
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
            opacity: 0.5,
          }
        }}
      >
        {[1, 2, 3].map((n) => (
          <Carousel.Slide key={n}>
            <LoadingSlide />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
