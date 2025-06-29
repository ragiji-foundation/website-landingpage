'use client';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import classes from './hero-section.module.css';

export default function HeroSection() {
  const { t, language } = useLanguage();
  
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title} 
              style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
              {t('home.hero.heading')}
            </Title>
            <Text className={classes.description}
              style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
              {t('home.hero.subheading')}
            </Text>
            <Group className={classes.buttons}>
              <Link href={`/${language}/contact-us`}>
                <Button 
                  size="lg" 
                  className={classes.control}
                  style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
                  {t('home.hero.ctaButton')}
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}