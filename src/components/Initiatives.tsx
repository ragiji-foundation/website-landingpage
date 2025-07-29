'use client';
import { useEffect } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, Button } from '@mantine/core';
import { useInitiativesStore } from '@/store/useInitiativesStore';
import { InitiativesSkeleton } from './skeletons/InitiativesSkeleton';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface InitiativesProps {
  heading: string;
  ctaButton: {
    text: string;
    url: string;
  };
}

export function Initiatives({ heading, ctaButton }: InitiativesProps) {
  const { items, loading, fetchInitiatives } = useInitiativesStore();
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
        style={{ 
          fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--mantine-color-dark-8)',
          marginBottom: '3rem',
          lineHeight: 1.2,
        }}
      >
        {heading}
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {items.map((initiative) => {
          const displayTitle = language === 'hi' && initiative.titleHi ? initiative.titleHi : initiative.title;
          const displayDescription = language === 'hi' && initiative.descriptionHi ? initiative.descriptionHi : initiative.description;
          const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
          return (
            <Card 
              key={initiative.id} 
              shadow="sm" 
              padding="lg" 
              radius="lg"
              withBorder
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)',
                border: '1px solid var(--mantine-color-gray-2)',
              }}
              styles={{
                root: {
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: 'var(--mantine-color-gray-3)',
                  }
                }
              }}
            >
              <Card.Section>
                <Image
                  src={initiative.imageUrl}
                  height={200}
                  alt={displayTitle}
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Card.Section>

              <Text 
                fw={600} 
                size="lg" 
                mt="md" 
                mb="xs"
                style={{ 
                  fontFamily,
                  color: 'var(--mantine-color-dark-7)',
                  lineHeight: 1.3,
                }}
              >
                {displayTitle}
              </Text>

              <Text 
                mt="xs" 
                c="dimmed" 
                size="sm" 
                lineClamp={3} 
                style={{ 
                  fontFamily,
                  lineHeight: 1.5,
                  color: 'var(--mantine-color-gray-6)',
                }}
              >
                {displayDescription ?
                  new DOMParser().parseFromString(displayDescription, 'text/html')
                    .body.textContent || displayDescription
                  : ''}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Button 
          component={Link} 
          href={ctaButton.url} 
          variant="gradient"
          gradient={{ from: '#FF4B2B', to: '#FF416C' }}
          size="lg"
          radius="xl"
          style={{ 
            fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(255, 75, 43, 0.39)',
            transition: 'all 0.3s ease',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px 0 rgba(255, 75, 43, 0.5)',
              }
            }
          }}
        >
          {ctaButton.text}
        </Button>
      </div>
    </Container>
  );
}