'use client';
import { Container, Grid, Card, Title, Text, Image, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { useAwardStore } from '@/store/useAwardStore';
import { useBannerStore } from '@/store/useBannerStore';
import { AwardsSkeleton } from '@/components/skeletons/AwardsSkeleton';
import styles from './awards.module.css';
import { notifications } from '@mantine/notifications';
import { BannerType } from '@/types/banner';
import { PageTransition } from '@/components/PageTransition';

function AwardGrid() {
  const { awards, loading, error, fetchAwards } = useAwardStore();

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  if (loading) return <AwardsSkeleton />;

  if (error) {
    notifications.show({
      title: 'Notice',
      message: 'Using fallback data. Some features might be limited.',
      color: 'yellow'
    });
  }

  return (
    <Grid gutter="xl">
      {awards.map((award) => (
        <Grid.Col key={award.id} span={{ base: 12, sm: 6, md: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.awardCard}
          >
            <Card.Section>
              <Image
                src={award.imageUrl}
                height={200}
                alt={award.title}
                fallbackSrc="/award-placeholder.jpg"
              />
            </Card.Section>

            <Stack mt="md">
              <Title order={3}>{award.title}</Title>
              <Text size="sm" c="dimmed" fw={500}>
                {award.organization} • {award.year}
              </Text>
              <Text size="sm" lineClamp={3}>
                {award.description}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default function AwardsPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('awards');

  if (bannerLoading) return <AwardsSkeleton />;
  if (bannerError) return <div>Error loading page: {bannerError.message}</div>;
  if (!banner) return <div>Banner not found</div>;

  return (
    <PageTransition>
      <ErrorBoundary>
        <main>
          <Banner
            type={banner.type as BannerType}
            title={banner.title}
            description={banner.description ?? 'Celebrating our achievements and milestones in making a difference.'}
            backgroundImage={banner.backgroundImage || '/banners/awards-banner.jpg'}
            breadcrumbs={[
              { label: 'Home', link: '/' },
              { label: 'Awards' }
            ]}
            tags={['Excellence', 'Impact', 'Recognition']}
          />

          <Container size="xl" py="xl">
            <AwardGrid />
          </Container>
        </main>
      </ErrorBoundary>
    </PageTransition>
  );
}