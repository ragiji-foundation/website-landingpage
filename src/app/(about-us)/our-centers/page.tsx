'use client';
import { Container, Card, Image, Text, Grid, Group, Stack, Button, Title, Skeleton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useState, useEffect } from 'react';
import { IconMapPin, IconPhone } from '@tabler/icons-react';
import styles from './centers.module.css';
import { mockCenters } from '@/data/mock-centers';

interface Center {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  contactInfo?: string;
}

function CentersSkeleton() {
  return (
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card padding="lg">
            <Skeleton height={200} mb="md" />
            <Skeleton height={24} width="70%" mb="sm" />
            <Skeleton height={20} width="40%" mb="sm" />
            <Skeleton height={60} />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function CenterList() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/centers');
        if (!response.ok) throw new Error('Failed to fetch centers');
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to mock data
        setCenters(mockCenters);
        setError(error as Error);
   

        showNotification({
          title: 'Notice',
          message: 'Using fallback data. Some features might be limited.',
          color: 'yellow'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  if (loading) return <CentersSkeleton />;

  if (error && !centers.length) {
    return (
      <Stack align="center" py="xl">
        <Title order={3}>Unable to load centers</Title>
        <Text c="dimmed">Please try again later</Text>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Stack>
    );
  }

  return (
    <Grid gutter="lg">
      {centers.map((center) => (
        <Grid.Col key={center.id} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" className={styles.centerCard}>
            {center.imageUrl && (
              <Card.Section>
                <Image
                  src={center.imageUrl}
                  height={200}
                  alt={center.name}
                />
              </Card.Section>
            )}

            <Stack mt="md">
              <Title order={3}>{center.name}</Title>

              <Group gap="xs">
                <IconMapPin size={16} />
                <Text size="sm">{center.location}</Text>
              </Group>

              <Text size="sm" lineClamp={3}>
                {center.description}
              </Text>

              {center.contactInfo && (
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">{center.contactInfo}</Text>
                </Group>
              )}

              <Button
                variant="light"
                fullWidth
                mt="md"
                component="a"
                href={`/centers/${center.id}`}
              >
                Learn More
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default function CentersPage() {
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="about"
          title="Our Centers"
          description="Discover our learning centers across the country where we create impact through education and community development."
          backgroundImage="/banners/centers-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'About', link: '/about' },
            { label: 'Our Centers' }
          ]}
          tags={['Education', 'Community', 'Development']}
        />

        <Container size="xl" py="xl">
          <CenterList />
        </Container>
      </main>
    </ErrorBoundary>
  );
}
