'use client';

import { Container, Title, Grid, Card, Text, Group, Image, Badge, Button, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useBannerStore } from '@/store/useBannerStore';
import { useCentersStore } from '@/store/useCentersStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';

export default function OurCentersPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { centers, loading, error, fetchCenters, getLocalizedCenters } = useCentersStore();
  
  useEffect(() => {
    fetchBanners();
    fetchCenters();
  }, [fetchBanners, fetchCenters]);

  // Get localized centers with proper error handling
  const localizedCenters = centers && Array.isArray(centers) 
    ? getLocalizedCenters(locale) 
    : [];
    
  // Log all data for debugging
  console.log('centers:', centers);
  console.log('localizedCenters:', localizedCenters);
  
  // Get banner
  const banner = getBannerByType('centers');
  
  if (loading) return <div>Loading centers...</div>;
  if (error) return <div>Error loading centers: {error.message}</div>;
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
            { label: locale === 'hi' ? 'हमारे केंद्र' : 'Our Centers' }
          ]}
        />
      ) : (
        <Banner
          type="centers"
          title={locale === 'hi' ? 'हमारे केंद्र' : 'Our Centers'}
          backgroundImage="/banners/centers-banner.jpg"
          breadcrumbs={[
            { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
            { label: locale === 'hi' ? 'हमारे केंद्र' : 'Our Centers' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {locale === 'hi' ? 'हमारे केंद्रों की जानकारी' : 'Explore Our Centers'}
          </Title>
          
          <Grid gutter="xl">
            {localizedCenters.map((center) => (
              <Grid.Col key={center.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  {center.imageUrl && (
                    <Card.Section>
                      <Image
                        src={center.imageUrl}
                        height={200}
                        alt={center.name}
                      />
                    </Card.Section>
                  )}
                  
                  <Group justify="apart" mt="md" mb="xs">
                    <Title order={3}>{center.name}</Title>
                  </Group>
                  
                  <Badge color="blue" mb="md">{center.location}</Badge>
                  
                  <Text size="sm" lineClamp={3}>
                    {center.description}
                  </Text>
                  
                 <Button 
  component={Link}
  href={`/${locale}/our-centers/${center.slug}`}
  variant="light" 
  fullWidth 
  mt="md" 
  radius="md"
>
  {locale === 'hi' ? 'और अधिक जानें' : 'Learn More'}
</Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}