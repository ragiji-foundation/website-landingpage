"use client";
import '@mantine/carousel/styles.css';
import { Paper, Title, Center, Stack, Loader, Text, Box, Button, ActionIcon, Group } from '@mantine/core';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';

import classes from './CardsCarousel.module.css';

interface CarouselItem {
  id: number;
  title: string;
  titleHi?: string;
  imageUrl: string | null;
  link: string | null;
  active: boolean;
  order: number;
  type?: 'image' | 'video';
  videoUrl?: string | null;
}

function Card({ imageUrl, videoUrl, title, titleHi, type = 'image', link = '#' }: Omit<CarouselItem, 'id' | 'active' | 'order'>) {
  const defaultImage = '/placeholder-image.jpg';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  const { language } = useLanguage();

  // Determine which title to display based on language
  const displayTitle = language === 'hi' && titleHi ? titleHi : title;
  const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';

  // Get the correct height values to match CSS
  const getMinHeight = () => {
    if (isSmallMobile) return '35vh';
    if (isMobile) return '32vh';
    return '100%';
  };

  const getMaxHeight = () => {
    if (isSmallMobile) return '320px';
    if (isMobile) return '280px';
    return 'none';
  };

  return (
    <Paper
      shadow="md"
      radius={0}
      component="a"
      href={link || undefined}
      className={classes.card}
    >
      {type === 'image' ? (
        <div
          style={{
            backgroundImage: `linear-gradient(169deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%), url(${imageUrl || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            minHeight: getMinHeight(),
            maxHeight: getMaxHeight(),
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
      ) : null}

      <div className={classes.contentWrapper}>
        <Stack align="center" gap={isMobile ? "xs" : "xl"} style={{ zIndex: 2, marginTop: isMobile ? 'auto' : '0', paddingBottom: isMobile ? '2rem' : '0' }}>
          <Title 
            className={classes.title} 
            ta="center"
            size={isMobile ? "h5" : "h1"}
            style={{ 
              fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1.2rem)' : 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: isMobile ? 1.1 : 1.3,
              fontWeight: isMobile ? 500 : 700,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
              margin: isMobile ? '0' : '0 0 1rem 0',
              fontFamily: fontFamily
            }}
          >
            {displayTitle}
          </Title>
          <Button
            variant="outline"
            color="white"
            size={isMobile ? "sm" : "lg"}
            radius="xl"
            className={classes.ctaButton}
            style={{
              fontSize: isMobile ? '0.75rem' : '1rem',
              padding: isMobile ? '6px 12px' : '12px 24px',
              fontWeight: isMobile ? 500 : 600,
              minWidth: isMobile ? 'auto' : undefined,
              height: isMobile ? '28px' : 'auto'
            }}
          >
            Learn More
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

export function CardsCarousel() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (isTransitioning || data.length === 0) return;
    setIsTransitioning(true);
    setActive((current) => (current + 1) % data.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [data.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || data.length === 0) return;
    setIsTransitioning(true);
    setActive((current) => (current - 1 + data.length) % data.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [data.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === active) return;
    setIsTransitioning(true);
    setActive(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [active, isTransitioning]);

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isAutoPlaying && data.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  }, [isAutoPlaying, data.length, nextSlide]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, toggleAutoPlay]);

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

        const activeItems = items
          .filter(item => item.active)
          .sort((a, b) => a.order - b.order)
          .map(item => ({
            ...item,
            type: item.videoUrl ? 'video' : 'image',
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

  // Auto-play effect
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

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

  return (
    <div 
      className={classes.carouselContainer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Slides Container */}
      <div 
        className={classes.slidesContainer}
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
      >
        {data.map((item) => (
          <div key={item.id} className={classes.slide}>
            <Card
              imageUrl={item.imageUrl}
              videoUrl={item.videoUrl}
              title={item.title}
              titleHi={item.titleHi}
              link={item.link}
              type={item.type}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {!isMobile && data.length > 1 && (
        <>
          <ActionIcon
            className={`${classes.navButton} ${classes.prevButton}`}
            onClick={prevSlide}
            disabled={isTransitioning}
            size="lg"
            variant="filled"
            color="rgba(255, 255, 255, 0.1)"
            aria-label="Previous slide"
          >
            <IconChevronLeft size={24} />
          </ActionIcon>
          
          <ActionIcon
            className={`${classes.navButton} ${classes.nextButton}`}
            onClick={nextSlide}
            disabled={isTransitioning}
            size="lg"
            variant="filled"
            color="rgba(255, 255, 255, 0.1)"
            aria-label="Next slide"
          >
            <IconChevronRight size={24} />
          </ActionIcon>
        </>
      )}

      {/* Auto-play Control */}
      {!isMobile && data.length > 1 && (
        <ActionIcon
          className={classes.playButton}
          onClick={toggleAutoPlay}
          size="md"
          variant="filled"
          color="rgba(255, 255, 255, 0.2)"
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
        </ActionIcon>
      )}

      {/* Indicators */}
      {data.length > 1 && (
        <Group className={classes.indicators} gap="xs">
          {data.map((_, index) => (
            <button
              key={index}
              className={`${classes.indicator} ${index === active ? classes.indicatorActive : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Group>
      )}
    </div>
  );
}