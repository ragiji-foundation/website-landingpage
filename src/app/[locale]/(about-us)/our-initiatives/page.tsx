'use client';

import { Container, Title, Grid, Card, Text, Image as MantineImage, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useBannerStore } from '@/store/useBannerStore';
import { useInitiativesStore } from '@/store/useInitiativesStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import classes from './our-initiatives.module.css';

export default function OurInitiativesPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { items, loading, error, fetchInitiatives } = useInitiativesStore();

  useEffect(() => {
    fetchBanners();
    fetchInitiatives(locale);
  }, [fetchBanners, fetchInitiatives, locale]);
  
  // Get localized initiatives
  const localizedInitiatives = items?.map(initiative => ({
    ...initiative,
    title: locale === 'hi' && initiative.titleHi ? initiative.titleHi : initiative.title,
    description: locale === 'hi' && initiative.descriptionHi ? initiative.descriptionHi : initiative.description
  })) || [];
  
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
            { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
            { label: locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives' }
          ]}
        />
      ) : (
        <Banner
          type="initiatives"
          title={locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives'}
          backgroundImage="/banners/initiatives-banner.jpg"
          breadcrumbs={[
            { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
            { label: locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives' }
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
                <Card 
                  component={Link}
                  href={`/${locale}/our-initiatives/${initiative.slug}`}
                  shadow="sm" 
                  padding="lg" 
                  radius="md" 
                  withBorder 
                  className={classes.card}
                >
                  {initiative.imageUrl && (
                    <Card.Section>
                      <MantineImage
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

