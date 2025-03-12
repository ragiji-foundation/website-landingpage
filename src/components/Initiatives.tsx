'use client';
import { useEffect } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text } from '@mantine/core';
import { useInitiativesStore } from '@/store/useInitiativesStore';
import { InitiativesSkeleton } from './skeletons/InitiativesSkeleton';
import classes from './Initiatives.module.css';

export function Initiatives() {
  const { items, loading, error, fetchInitiatives } = useInitiativesStore();

  useEffect(() => {
    fetchInitiatives();
  }, [fetchInitiatives]);

  if (loading) {
    return <InitiativesSkeleton />;
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mb="xl">Our Initiatives</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((initiative) => (
          <Card key={initiative.id} shadow="sm" padding="lg" radius="md">
            <Card.Section>
              <Image
                src={initiative.imageUrl}
                height={160}
                alt={initiative.title}
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              {initiative.title}
            </Text>

            <Text mt="xs" c="dimmed" size="sm" lineClamp={2}>
              {initiative.description ? 
                new DOMParser().parseFromString(initiative.description, 'text/html')
                .body.textContent || initiative.description 
                : ''}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}