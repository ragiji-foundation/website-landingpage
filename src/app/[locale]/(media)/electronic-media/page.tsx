'use client';

import { Container, Title, Grid, Card, Text, Stack, AspectRatio } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useElectronicMediaStore } from '@/store/useElectronicMediaStore';
import { useDictionary } from '@/hooks/useDictionary';

export default function ElectronicMediaPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { mediaItems, loading, error, fetchMediaItems } = useElectronicMediaStore();
  
  // Get translations from dictionary
  const { dictionary } = useDictionary();
  const t = dictionary?.electronicmedia || {};
  const common = dictionary?.common || {};
  
  useEffect(() => {
    fetchBanners();
    fetchMediaItems();
  }, [fetchBanners, fetchMediaItems]);
  
  // Get localized media
  const localizedMedia = withLocalizedArray(mediaItems, locale);
  
  // Get banner
  const banner = getBannerByType('electronicmedia');
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Electronic Media' }
          ]}
        />
      ) : (
        <Banner
          type="electronic-media"
          title={t?.title || 'Electronic Media'}
          backgroundImage="/banners/electronic-media-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Electronic Media' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {t?.pageHeading || 'Our Videos and Presentations'}
          </Title>
          
          <Text size="lg" ta="center" maw={800} mx="auto" c="dimmed">
            {t?.pageDescription || 'Watch and read how the media covers our work and mission.'}
          </Text>
          
          {loading ? (
            <Text ta="center">{common?.loading || 'Loading media content...'}</Text>
          ) : error ? (
            <Text ta="center" c="red">
              {common?.errorMessage || 'Error loading content. Please try again later.'}
            </Text>
          ) : localizedMedia.length === 0 ? (
            <Text ta="center">{t?.noMedia || 'No media content available yet.'}</Text>
          ) : (
            <Grid gutter="xl">
              {localizedMedia.map((media) => (
                <Grid.Col key={media.id} span={{ base: 12, md: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <AspectRatio ratio={16/9}>
                        <iframe
                          src={media.videoUrl}
                          title={media.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </AspectRatio>
                    </Card.Section>
                    
                    <Stack mt="md">
                      <Title order={3}>{media.title}</Title>
                      {media.description && (
                        <Text size="sm" c="dimmed">
                          {media.description}
                        </Text>
                      )}
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </main>
  );
}
