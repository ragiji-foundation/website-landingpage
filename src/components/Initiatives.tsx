'use client';
import { useEffect } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, Button } from '@mantine/core';
import { useInitiativesStore } from '@/store/useInitiativesStore';
import { InitiativesSkeleton } from './skeletons/InitiativesSkeleton';
import classes from './Initiatives.module.css';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface Initiative {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  imageUrl: string;
}

interface InitiativesProps {
  heading: string;
  ctaButton: {
    text: string;
    url: string;
  };
}

export function Initiatives({ heading, ctaButton }: InitiativesProps) {
  const { items, loading, error, fetchInitiatives } = useInitiativesStore();
  const { language } = useLanguage();

  useEffect(() => {
    fetchInitiatives();
  }, [fetchInitiatives]);

  if (loading) {
    return <InitiativesSkeleton />;
  }

  return (
    <Container size="xl" py="xl">
      <Title 
        order={2} 
        ta="center" 
        mb="xl"
        style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
      >
        {heading}
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((initiative) => {
          const displayTitle = language === 'hi' && initiative.titleHi ? initiative.titleHi : initiative.title;
          const displayDescription = language === 'hi' && initiative.descriptionHi ? initiative.descriptionHi : initiative.description;
          const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
          return (
            <Card key={initiative.id} shadow="sm" padding="lg" radius="md">
              <Card.Section>
                <Image
                  src={initiative.imageUrl}
                  height={160}
                  alt={displayTitle}
                />
              </Card.Section>

              <Text fw={500} size="lg" mt="md" style={{ fontFamily }}>
                {displayTitle}
              </Text>

              <Text mt="xs" c="dimmed" size="sm" lineClamp={2} style={{ fontFamily }}>
                {displayDescription ?
                  new DOMParser().parseFromString(displayDescription, 'text/html')
                    .body.textContent || displayDescription
                  : ''}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button 
          component={Link} 
          href={ctaButton.url} 
          variant="filled"
          style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
        >
          {ctaButton.text}
        </Button>
      </div>
    </Container>
  );
}