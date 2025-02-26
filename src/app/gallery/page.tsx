'use client';
import { useState, useEffect } from 'react';
import { Container, Grid, Card, Image, Text, Group, Button, Title, Stack, SegmentedControl, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { mockGallery } from '@/data/mock-gallery';
import { notifications } from '@mantine/notifications';
import classes from './gallery.module.css';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  date: string;
}

function GallerySkeleton() {
  return (
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card padding="lg">
            <Skeleton height={200} mb="md" />
            <Skeleton height={20} width="70%" mb="sm" />
            <Skeleton height={40} />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to mock data
        setImages(mockGallery.images);
        setError(error as Error);
        notifications.show({
          title: 'Notice',
          message: 'Using fallback gallery data. Some features might be limited.',
          color: 'yellow'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredImages = category === 'All'
    ? images
    : images.filter(img => img.category === category);

  if (loading) return <GallerySkeleton />;

  return (
    <Stack gap="xl">
      <SegmentedControl
        value={category}
        onChange={setCategory}
        data={mockGallery.categories}
        fullWidth
        size="md"
      />

      <Grid gutter="lg">
        {filteredImages.map((image) => (
          <Grid.Col key={image.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" className={classes.card}>
              <Card.Section>
                <Image
                  src={image.imageUrl}
                  height={200}
                  alt={image.title}
                />
              </Card.Section>

              <Stack mt="md" gap="sm">
                <Text fw={500} size="lg">{image.title}</Text>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {image.description}
                </Text>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {new Date(image.date).toLocaleDateString()}
                  </Text>
                  <Button
                    variant="light"
                    size="xs"
                    onClick={() => {
                      // Implement lightbox or modal view
                    }}
                  >
                    View
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export default function GalleryPage() {
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="about"
          title="Our Gallery"
          description="A visual journey through our mission, impact, and community engagement"
          backgroundImage="/banners/gallery-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Gallery' }
          ]}
          tags={['Photos', 'Events', 'Impact']}
        />

        <Container size="xl" py="xl">
          <GalleryGrid />
        </Container>
      </main>
    </ErrorBoundary>
  );
}
