'use client';
import { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto } from '@tabler/icons-react';
import { GallerySkeleton } from './skeletons/GallerySkeleton';
import classes from './Gallery.module.css';

interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  order: number;
  category: string;
  createdAt: string;
}

interface GalleryProps {
  type?: 'masonry' | 'grid';
}

export  default function Gallery({ type = 'grid' }: GalleryProps) {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://admin.ragijifoundation.com/api/gallery', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setImages(data.sort((a: GalleryItem, b: GalleryItem) => a.order - b.order));
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError(error instanceof Error ? error.message : 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    const attemptFetch = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          await fetchGallery();
          return;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    attemptFetch();
  }, []);

  if (loading) {
    return <GallerySkeleton count={6} />;
  }

  // Take only the latest 6 items
  const recentItems = images.slice(0, 6);

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
          <Card key={item.id} shadow="sm" padding="md" radius="md">
            <Card.Section>
              <Image
                src={item.imageUrl}
                height={220}
                alt={item.title}
                fallbackSrc="/placeholder.jpg"
              />
            </Card.Section>

            <Badge mt="md" variant="light" color="blue">
              {item.category}
            </Badge>

            <Text fw={500} size="lg" mt="md">
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