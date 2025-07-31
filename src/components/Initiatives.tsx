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
    <Container size="xl" py="xl" style={{ maxWidth: '100vw', padding: '0 1rem' }}>
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
      <SimpleGrid 
        cols={5} 
        spacing="xs"
        style={{ 
          width: '100%',
          maxWidth: '100vw',
          margin: '0 auto',
        }}
        styles={{
          root: {
            '@media (max-width: 768px)': {
              gap: '0.5rem',
            },
            '@media (max-width: 480px)': {
              gap: '0.25rem',
            },
          }
        }}
      >
        {items.map((initiative) => {
          const displayTitle = language === 'hi' && initiative.titleHi ? initiative.titleHi : initiative.title;
          const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
          return (
            <Card 
              key={initiative.id} 
              padding={0}
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                background: 'white',
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                textAlign: 'center',
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <Card.Section>
                <Image
                  src={initiative.imageUrl}
                  alt={displayTitle}
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    display: 'block',
                  }}
                />
              </Card.Section>

              <Text 
                fw={600} 
                size="xs" 
                mt="xs"
                style={{ 
                  fontFamily,
                  color: 'var(--mantine-color-dark-7)',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  padding: '0.25rem',
                }}
              >
                {displayTitle}
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