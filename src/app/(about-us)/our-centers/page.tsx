'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Image,
  Text,
  Grid,
  Group,
  Stack,
  Button,
  Title,
  Alert,
  Skeleton,
  ActionIcon,
  Transition,
  Box
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  IconMapPin,
  IconPhone,
  IconBuildingCommunity
} from '@tabler/icons-react';
import { useBanner } from '@/hooks/useBanner';
import styles from './centers.module.css';
import { useCenterStore } from '@/store/useCenterStore';
import { CentersSkeleton } from '@/components/skeletons/CentersSkeleton';

function CenterList() {
  const { centers, loading, error, fetchCenters } = useCenterStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchCenters();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchCenters]);


  if (loading) return <CentersSkeleton />;

  if (error && !centers.length) {
    return (
      <Alert
        icon={<IconMapPin size={16} />} // Changed IconInfoCircle to IconMapPin
        title="Unable to load centers"
        color="red"
        mb="xl"
      >
        <Stack>
          <Text>We couldn't retrieve our centers information. Please try again later.</Text>
          <Button
            variant="outline"
            onClick={() => fetchCenters()}
            leftSection={<IconBuildingCommunity size={16} />}
          >
            Retry Loading Centers
          </Button>
        </Stack>
      </Alert>
    );
  }

  if (error) {
    notifications.show({
      title: 'Notice',
      message: 'Using fallback data. Some features might be limited.',
      color: 'yellow',
      autoClose: 5000
    });
  }

  return (
    <>
      {/* Center List */}
      {centers.length === 0 ? (
        <Stack align="center" py="xl">
          <Title order={3}>No centers found</Title>
          <Text c="dimmed">Please try again later</Text>
        </Stack>
      ) : (
        <Grid gutter="lg">
          {centers.map((center) => (
            <Grid.Col key={center.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className={styles.centerCard}
                withBorder
              >
                {center.imageUrl ? (
                  <Card.Section>
                    <Image
                      src={center.imageUrl}
                      height={200}
                      alt={center.name}
                    />
                    {!center.imageUrl && (
                      <div className={styles.imagePlaceholder}>
                        <IconBuildingCommunity size={40} opacity={0.5} />
                      </div>
                    )}
                  </Card.Section>
                ) : (
                  <Card.Section className={styles.noImage}>
                    <IconBuildingCommunity size={40} opacity={0.5} />
                  </Card.Section>
                )}

                <Stack mt="md" gap="xs">
                  <Title order={3} className={styles.centerTitle}>{center.name}</Title>

                  <Group gap="xs" className={styles.locationTag}>
                    <IconMapPin size={16} />
                    <Text size="sm">{center.location}</Text>
                  </Group>

                  <Text size="sm" className={styles.description} lineClamp={3}>
                    {center.description}
                  </Text>

                  {center.contactInfo && (
                    <Group gap="xs" mt="xs">
                      <IconPhone size={16} style={{ flexShrink: 0 }} />
                      <Text size="sm">{center.contactInfo}</Text>
                    </Group>
                  )}

                  <Button
                    variant="light"
                    fullWidth
                    mt="md"
                    component="a"
                    href={`/centers/${center.id}`}
                    className={styles.learnMoreButton}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Scroll to top button */}
      <Transition transition="slide-up" mounted={showScrollTop}>
        {(transitionStyles) => (
          <ActionIcon
            size="lg"
            radius="xl"
            variant="filled"
            color="blue"
            className={styles.scrollTopButton}
            style={transitionStyles}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
          </ActionIcon>
        )}
      </Transition>
    </>
  );
}

export default function CentersPage() {
  const { banner, loading: bannerLoading, error: bannerError } = useBanner('centers');

  if (bannerLoading) {
    return (
      <Box>
        <Skeleton height={400} radius={0} />
        <Container size="xl" py="xl">
          <CentersSkeleton />
        </Container>
      </Box>
    );
  }

  if (bannerError) {
    // Show error notification but continue with fallback banner
    notifications.show({
      title: 'Error',
      message: 'Could not load banner information. Using default banner.',
      color: 'orange'
    });
  }

  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="centers"
          title={banner?.title || "Our Centers"}
          description={banner?.description || "Discover our learning centers across the country"}
          backgroundImage={banner?.backgroundImage || "/banners/centers-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Centers' }
          ]}
        />
        <Container size="xl" py="xl">
          <Title order={2} mb="xl" className={styles.pageTitle}>Explore Our Centers</Title>
          <CenterList />
        </Container>
      </main>
    </ErrorBoundary>
  );
}