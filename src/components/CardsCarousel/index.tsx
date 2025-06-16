'use client';
import { Box, Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import classes from './CardsCarousel.module.css';

interface CarouselItem {
  id: string;
  imageUrl?: string;
  videoUrl?: string;
  title: string;
  type?: 'image' | 'video';
  link?: string;
  active: boolean;
  order: number;
}

function Card({ imageUrl, videoUrl, title, type = 'image', link = '#' }: Omit<CarouselItem, 'id' | 'active' | 'order'>) {
  const isMobile = window.innerWidth <= 768;
  const defaultImage = '/placeholder-image.jpg';

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
          <Title className={classes.title} ta="center">
            {title}
          </Title>
          <Button
            variant="outline"
            color="white"
            size={isMobile ? "sm" : "lg"}
            radius="xl"
            className={classes.ctaButton}
          >
            Learn More
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

export function CardsCarousel() {
  const { t } = useLanguage();

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
          <Title className={classes.title}>
            {t('home.hero.heading')}
          </Title>
          <Text className={classes.description} size="xl">
            {t('home.hero.subheading')}
          </Text>
          <Group mt={40}>
            <Button
              size="lg"
              variant="filled"
              color="var(--color-primary)"
              rightSection={<IconArrowRight size={20} />}
              className={classes.primaryButton}
            >
              {t('home.hero.ctaButton')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              className={classes.secondaryButton}
            >
              {t('common.readMore')}
            </Button>
          </Group>
        </motion.div>
      </Container>
    </Box>
  );
}
