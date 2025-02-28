'use client';
import { Container, Card, Text, Grid, Badge, Button, Group, Stack, Title } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { IconMapPin, IconClock, IconBriefcase } from '@tabler/icons-react';
import styles from './careers.module.css';
import { useCareerStore } from '@/store/useCareerStore';
import { CareersSkeleton } from '@/components/skeletons/CareersSkeleton';
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

function CareerList() {
  const { careers, loading, error, fetchCareers } = useCareerStore();

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  if (loading) return <CareersSkeleton />;

  if (error && !careers.length) {
    return (
      <Stack align="center" py="xl">
        <Title order={3}>Unable to load careers</Title>
        <Text c="dimmed">Please try again later</Text>
        <Button onClick={() => fetchCareers()}>
          Retry
        </Button>
      </Stack>
    );
  }

  if (error) {
    notifications.show({
      title: 'Notice',
      message: 'Using fallback data. Some features might be limited.',
      color: 'yellow'
    });
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
