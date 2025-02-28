'use client';
import { useEffect } from 'react';  // Add this import
import { Container, Title, SimpleGrid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto } from '@tabler/icons-react';
import { useGalleryStore } from '@/store/useGalleryStore';
import { GallerySkeleton } from '../skeletons/GallerySkeleton';
import classes from './GallerySection.module.css';

export default function GallerySection() {
  const { items, loading, error, fetchGallery } = useGalleryStore();

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Group justify="space-between" align="center" mb="xl">
          <Title order={2}>Our Gallery</Title>
          <Button variant="light" rightSection={<IconPhoto size={16} />} disabled>
            View All Photos
          </Button>
        </Group>
        <GallerySkeleton count={6} />
      </Container>
    );
  }

  // Take only the latest 6 items for homepage
  const recentItems = items.slice(0, 6);

  return (
    <Container size="xl" py="xl" className={classes.container}>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} className={classes.title}>
          Our Gallery
        </Title>
        <Button
          component={Link}
          href="/gallery"
          variant="light"
          rightSection={<IconPhoto size={16} />}
        >
          View All Photos
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {recentItems.map((item) => (
          <Card
            key={item.id}
            shadow="sm"
            padding="md"
            radius="md"
            className={classes.card}
          >
            <Card.Section className={classes.imageSection}>
              <Image
                src={item.imageUrl}
                height={220}
                alt={item.title}
                fallbackSrc="/placeholder.jpg"
                className={classes.image}
              />
              <div className={classes.overlay}>
                <Text c="white" size="xl" fw={600}>
                  View
                </Text>
              </div>
            </Card.Section>

            <Badge mt="md" variant="light" color="blue">
              {item.category}
            </Badge>

            <Text fw={500} size="lg" mt="md" lineClamp={2}>
              {item.title}
            </Text>

            <Text size="sm" c="dimmed" mt={5}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

