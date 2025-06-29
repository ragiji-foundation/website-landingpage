'use client';
import { Container, Grid, Card, Title, Text, Image, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { useAwardStore } from '@/store/useAwardStore';
import { useBannerStore } from '@/store/useBannerStore';
import { useParams } from 'next/navigation';
import { withLocalization, withLocalizedArray } from '@/utils/localization';
import { AwardsSkeleton } from '@/components/skeletons/AwardsSkeleton';
import styles from './awards.module.css';
import { notifications } from '@mantine/notifications';
import { BannerType } from '@/types/banner';

function AwardGrid() {
  const { awards, loading, error, fetchAwards } = useAwardStore();
  const params = useParams();
  const locale = params.locale as string || 'en';

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
  
  // Apply localization to awards data
  const localizedAwards = withLocalizedArray(awards, locale);

  return (
    <Grid gutter="xl">
      {localizedAwards.map((award) => (
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
  const params = useParams();
  const locale = params.locale as string || 'en';

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('awards');
  // Localize banner content
  const localizedBanner = banner ? withLocalization(banner, locale) : null;

  if (bannerLoading) return <AwardsSkeleton />;
  if (bannerError) return <div>Error loading page: {bannerError.message}</div>;
  if (!banner) return <div>Banner not found</div>;

  return (
    <ErrorBoundary>
      <main>
        <Banner
          type={localizedBanner?.type as BannerType}
          title={localizedBanner?.title}
          description={localizedBanner?.description ?? (locale === 'hi' ? 'हमारी उपलब्धियों और मील के पत्थरों का जश्न मनाना।' : 'Celebrating our achievements and milestones in making a difference.')}
          backgroundImage={localizedBanner?.backgroundImage || '/banners/awards-banner.jpg'}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'awards' }
          ]}
  
        />

        <Container size="xl" py="xl">
          <AwardGrid />
        </Container>
      </main>
    </ErrorBoundary>
  );
}