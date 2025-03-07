import Image from 'next/image';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import classes from './hero-section.module.css';

export default function HeroSection() {
  return (
    <div className={classes.heroContainer}>
      <div className={classes.imageWrapper}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          sizes="100vw"
          priority
          className={classes.backgroundImage}
        />
      </div>
      <Container size="lg" className={classes.content}>
        <Title className={classes.title}>Welcome to Our Foundation</Title>
        <Text className={classes.subtitle}>
          Empowering communities through education, healthcare, and development.
        </Text>
        <Group justify="center" mt="md">
          <Button size="lg" className={classes.ctaButton}>
            Get Involved
          </Button>
          <Button size="lg" variant="outline" className={classes.ctaButton}>
            Learn More
          </Button>
        </Group>
      </Container>
    </div>
  );
}