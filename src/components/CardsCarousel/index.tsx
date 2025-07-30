'use client';
import { Box, Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './CardsCarousel.module.css';

interface CarouselItem {
  id: string | number;
  imageUrl?: string;
  videoUrl?: string | null;
  title: string;
  titleHi?: string | null;
  type?: 'image' | 'video';
  link?: string;
  active: boolean;
  order: number;
}

// Fallback data
const fallbackCarouselItems: CarouselItem[] = [
  {
    id: '1',
    imageUrl: '/images/carousel-default.jpg',
    title: 'Welcome to Ragiji Foundation',
    titleHi: 'रागिजी फाउंडेशन में आपका स्वागत है',
    type: 'image',
    active: true,
    order: 1
  }
];

function Card({ imageUrl, videoUrl, title, titleHi, type = 'image', link = '#', language, t }: Omit<CarouselItem, 'id' | 'active' | 'order'> & { language: string, t: (key: string) => string }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const defaultImage = '/placeholder-image.jpg';
  const displayTitle = language === 'hi' && titleHi ? titleHi : title;
  const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
  console.log('Rendering Card:', { language, title, titleHi, displayTitle });

  return (
    <Paper
      shadow="md"
      radius={0}
      component="a"
      href={link || undefined}
      className={classes.card}
    >
      {type === 'video' && videoUrl ? (
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
              height: isMobile ? '30vh' : '100vh',
              objectFit: 'cover',
            }}
          />
          <div className={classes.videoOverlay} />
        </Box>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(169deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%), url(${imageUrl || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
            height: isMobile ? '30vh' : '100vh',
          }}
        />
      )}

      <div className={classes.contentWrapper}>
        <Stack align="center" gap={isMobile ? "md" : "xl"}>
          <Title className={classes.title} ta="center" style={{ fontFamily }}>
            {displayTitle}
          </Title>
          <Text
            className={classes.description}
            size="xl"
            style={{ fontFamily }}
          >
            {t('home.hero.subheading')}
          </Text>
          <Button
            variant="outline"
            color="white"
            size={isMobile ? "sm" : "lg"}
            radius="xl"
            className={classes.ctaButton}
            style={{ fontFamily }}
          >
            {t('home.hero.ctaButton')}
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

export function CardsCarousel() {
  const { t, language } = useLanguage();
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const carouselData = await safeApiCall(
          () => apiClient.get<CarouselItem[]>('/carousel', fallbackCarouselItems, { locale: language }),
          fallbackCarouselItems,
          'carousel'
        );
        setCarouselItems(carouselData.filter((item: CarouselItem) => item.active));
      } catch (error) {
        console.error('Error fetching carousel:', error);
        setCarouselItems(fallbackCarouselItems);
      }
    };
    fetchCarousel();
  }, [language]);

  return (
    <Box className={classes.wrapper}>
      <div className={classes.videoBackground}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={classes.video}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={classes.overlay} />
      </div>

      <Container size="xl" className={classes.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={classes.content}
        >
          {carouselItems.length > 0 ? (
            <Card {...carouselItems[0]} language={language} t={t} />
          ) : (
            <>
              <Title 
                className={classes.title}
                style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
              >
                {t('home.hero.heading')}
              </Title>
              <Text 
                className={classes.description} 
                size="xl"
                style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
              >
                {t('home.hero.subheading')}
              </Text>
              <Group mt={40}>
                <Button
                  size="lg"
                  variant="filled"
                  color="var(--color-primary)"
                  rightSection={<IconArrowRight size={20} />}
                  className={classes.primaryButton}
                  style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                >
                  {t('home.hero.ctaButton')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  className={classes.secondaryButton}
                  style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                >
                  {t('common.readMore')}
                </Button>
              </Group>
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
