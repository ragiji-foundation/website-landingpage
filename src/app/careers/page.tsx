'use client';
import { Container, Card, Text, Grid, Badge, Button, Group, Stack, Title, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useState, useEffect } from 'react';
import { IconMapPin, IconClock, IconBriefcase } from '@tabler/icons-react';
import styles from './careers.module.css';
import { mockCareers } from '@/data/mock-careers';
import { notifications } from '@mantine/notifications';

interface Career {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
}

function CareersSkeleton() {
  return (
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, md: 6 }}>
          <Card padding="lg">
            <Skeleton height={24} width="70%" mb="md" />
            <Skeleton height={20} width="40%" mb="sm" />
            <Skeleton height={60} mb="md" />
            <Skeleton height={20} width="30%" />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function CareerList() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/careers');
        if (!response.ok) throw new Error('Failed to fetch careers');
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to mock data
        setCareers(mockCareers);
        setError(error as Error);
        notifications.show({
          title: 'Notice',
          message: 'Using fallback data. Some features might be limited.',
          color: 'yellow'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (loading) return <CareersSkeleton />;

  if (error && !careers.length) {
    return (
      <Stack align="center" py="xl">
        <Title order={3}>Unable to load careers</Title>
        <Text c="dimmed">Please try again later</Text>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Stack>
    );
  }

  return (
    <Grid gutter="lg">
      {careers.map((career) => (
        <Grid.Col key={career.id} span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" className={styles.careerCard}>
            <Stack>
              <Title order={3}>{career.title}</Title>

              <Group gap="lg">
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">{career.location}</Text>
                </Group>
                <Group gap="xs">
                  <IconBriefcase size={16} />
                  <Badge variant="light">{career.type}</Badge>
                </Group>
                <Group gap="xs">
                  <IconClock size={16} />
                  <Text size="sm" c="dimmed">
                    {new Date(career.createdAt).toLocaleDateString()}
                  </Text>
                </Group>
              </Group>

              <Text lineClamp={3}>{career.description}</Text>

              <Group justify="space-between">
                <Text size="sm" c="dimmed" lineClamp={1}>
                  {career.requirements.split('\n')[0]}...
                </Text>
                <Button variant="light" component="a" href={`/careers/${career.id}`}>
                  View Details
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default function CareersPage() {
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="about"
          title="Join Our Team"
          description="Be part of our mission to create positive change. Explore opportunities to contribute and grow with us."
          backgroundImage="/banners/careers-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Careers' }
          ]}
          tags={['Opportunities', 'Growth', 'Impact']}
        />

        <Container size="xl" py="xl">
          <CareerList />
        </Container>
      </main>
    </ErrorBoundary>
  );
}
