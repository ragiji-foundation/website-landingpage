'use client';
import { Box, Container, Title, Text, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './CardsCarousel.module.css';

export function CardsCarousel() {
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
            Empowering Communities
            <br />
            Transforming Lives
          </Title>
          <Text className={classes.description} size="xl">
            Join us in creating sustainable change and building stronger communities together.
          </Text>
          <Group mt={40}>
            <Button
              size="lg"
              variant="filled"
              color="var(--color-primary)"
              rightSection={<IconArrowRight size={20} />}
              className={classes.primaryButton}
            >
              Get Involved
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              className={classes.secondaryButton}
            >
              Learn More
            </Button>
          </Group>
        </motion.div>
      </Container>
    </Box>
  );
}
