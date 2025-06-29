'use client';

import { Container, Title, Grid, Card, Text, Image, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useInitiativeStore } from '@/store/useInitiativeStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import classes from './our-initiatives.module.css';

export default function OurInitiativesPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { initiatives, loading, error, fetchInitiatives } = useInitiativeStore();
  
  useEffect(() => {
    fetchBanners();
    fetchInitiatives();
  }, [fetchBanners, fetchInitiatives]);
  
  // Get localized initiatives
  const localizedInitiatives = withLocalizedArray(initiatives, locale);
  
  // Get banner
  const banner = getBannerByType('initiatives');
  
  if (loading) return <div>Loading initiatives...</div>;
  if (error) return <div>Error loading initiatives: {error.message}</div>;
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Initiatives' }
          ]}
        />
      ) : (
        <Banner
          type="initiatives"
          title={locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives'}
          backgroundImage="/banners/initiatives-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Initiatives' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {locale === 'hi' ? 'हमारे कार्यक्रम और पहल' : 'Our Programs and Initiatives'}
          </Title>
          
          <Grid gutter="xl">
            {localizedInitiatives.map((initiative) => (
              <Grid.Col key={initiative.id} span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
                  {initiative.imageUrl && (
                    <Card.Section>
                      <Image
                        src={initiative.imageUrl}
                        height={300}
                        alt={initiative.title}
                        fallbackSrc="/images/placeholders/initiative-placeholder.jpg"
                        className={classes.cardImage}
                      />
                    </Card.Section>
                  )}
                  
                  <Title order={3} mt="md" mb="xs" className={classes.cardTitle}>
                    {initiative.title}
                  </Title>
                  
                  <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
                    {initiative.description.replace(/<[^>]*>?/gm, '')}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}

