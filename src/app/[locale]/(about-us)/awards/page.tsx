'use client';
import { Container, Grid, Card, Title, Text, Image, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { useAwardStore } from '@/store/useAwardStore';
import { useBannerStore } from '@/store/useBannerStore';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import { AwardsSkeleton } from '@/components/skeletons/AwardsSkeleton';
import styles from './awards.module.css';
import { notifications } from '@mantine/notifications';
import { useDictionary } from '@/hooks/useDictionary';

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

  // Get translations from dictionary
  const { dictionary } = useDictionary();
  const t = dictionary?.awards || {};
  const common = dictionary?.common || {};

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('awards');

  if (bannerLoading) return <AwardsSkeleton />;
  if (bannerError) {
    return (
      <Container py="xl">
        <Text ta="center" c="red">
          {common?.errorMessage || 'Error loading page. Please try again later.'}
        </Text>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <main>
        {banner ? (
          <LocalizedBanner
            banner={banner}
            breadcrumbs={[
              { label: common?.home || 'Home', link: `/${locale}` },
              { label: t?.title || 'Awards' }
            ]}
          />
        ) : (
          <Banner
            type="awards"
            title={t?.title || 'Recognition & Awards'}
            description={t?.description || 'Celebrating our achievements and milestones in making a difference.'}
            backgroundImage="/banners/awards-banner.svg"
            breadcrumbs={[
              { label: common?.home || 'Home', link: `/${locale}` },
              { label: t?.title || 'Awards' }
            ]}
          />
        )}

        <Container size="xl" py="xl">
          <Stack gap="xl">
            <Title order={2} ta="center">
              {t?.pageHeading || 'Our Recognition & Achievements'}
            </Title>
            <Text size="lg" ta="center" maw={800} mx="auto" c="dimmed">
              {t?.pageDescription || 'Honored for our commitment and dedication to social change and community empowerment.'}
            </Text>
            <AwardGrid />
          </Stack>
        </Container>
      </main>
    </ErrorBoundary>
  );
}