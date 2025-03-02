'use client';
import { Container, Card, Image, Text, Grid, Group, Stack, Button, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Banner } from '@/components/Banner';
import { BannerType } from '@/types/banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { IconMapPin, IconPhone } from '@tabler/icons-react';
import styles from './centers.module.css';
import { useCenterStore } from '@/store/useCenterStore';
import { CentersSkeleton } from '@/components/skeletons/CentersSkeleton';
import { useBannerStore } from '@/store/useBannerStore';

function CenterList() {
  const { centers, loading, error, fetchCenters } = useCenterStore();

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  if (loading) return <CentersSkeleton />;

  if (error && !centers.length) {
    return (
      <Stack align="center" py="xl">
        <Title order={3}>Unable to load centers</Title>
        <Text c="dimmed">Please try again later</Text>
        <Button onClick={() => fetchCenters()}>
          Retry
        </Button>
      </Stack>
    );
  }

  if (error) {
    showNotification({
      title: 'Notice',
      message: 'Using fallback data. Some features might be limited.',
      color: 'yellow'
    });
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
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('about');

  if (bannerLoading) return <CentersSkeleton />;
  if (bannerError) return <Text c="red">{bannerError.message}</Text>;
  if (!banner) return <Text>Banner not found</Text>;

  return (
    <ErrorBoundary>
      <main>
        <Banner
          type={banner.type as BannerType}
          title={banner.title}
          description={banner.description ?? "Discover our learning centers"}
          backgroundImage={banner.backgroundImage || "/banners/centers-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Centers' }
          ]}
        />
        <Container size="xl" py="xl">
          <CenterList />
        </Container>
      </main>
    </ErrorBoundary>
  );
}
