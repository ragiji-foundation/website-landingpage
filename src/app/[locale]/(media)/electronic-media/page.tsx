'use client';

import { Container, Title, Grid, Card, Text, Group, Stack, AspectRatio } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useElectronicMediaStore } from '@/store/useElectronicMediaStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';

export default function ElectronicMediaPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { mediaItems, loading, error, fetchMediaItems } = useElectronicMediaStore();
  
  useEffect(() => {
    fetchBanners();
    fetchMediaItems();
  }, [fetchBanners, fetchMediaItems]);
  
  // Get localized media
  const localizedMedia = withLocalizedArray(mediaItems, locale);
  
  // Get banner
  const banner = getBannerByType('electronic-media');
  
  if (loading) return <div>Loading media...</div>;
  if (error) return <div>Error loading media: {error.message}</div>;
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Electronic Media' }
          ]}
        />
      ) : (
        <Banner
          type="electronic-media"
          title={locale === 'hi' ? 'इलेक्ट्रॉनिक मीडिया' : 'Electronic Media'}
          backgroundImage="/banners/media-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Electronic Media' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {locale === 'hi' ? 'हमारी वीडियो और प्रस्तुतियाँ' : 'Our Videos and Presentations'}
          </Title>
          
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
                  
                  <Group justify="apart" mt="md" mb="xs">
                    <Title order={3}>{media.title}</Title>
                  </Group>
                  
                  {media.description && (
                    <Text size="sm">
                      {media.description}
                    </Text>
                  )}
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}
