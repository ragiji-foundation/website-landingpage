'use client';

import { Container, Title, Grid, Image, Stack, Group, Badge, Select, Text } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useBannerStore } from '@/store/useBannerStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { withLocalizedArray } from '@/utils/localization';
import { useDictionary } from '@/hooks/useDictionary';
import { IconPhoto, IconVideo, IconCalendar } from '@tabler/icons-react';
import { Lightbox } from '@/components/Lightbox';

export interface GalleryItem {
  id: string | number;
  title: string;
  titleHi?: string | null;
  description?: string | null;
  descriptionHi?: string | null;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  categoryHi?: string | null;
  tags?: string[];
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  type?: 'image' | 'video';
}

export default function GalleryPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { galleryItems, loading, error, fetchGalleryItems } = useGalleryStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [lightboxOpened, setLightboxOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Get translations
  const { dictionary } = useDictionary();
  const t = dictionary?.gallery || {};
  const common = dictionary?.common || {};
  
  // We don't need fallback images as we're using the fallbackSrc prop directly
  
  useEffect(() => {
    fetchBanners();
    fetchGalleryItems();
  }, [fetchBanners, fetchGalleryItems]);
  
  // Get banner
  const banner = getBannerByType('gallery');
  
  // Get localized gallery items
  const localizedGalleryItems = withLocalizedArray(galleryItems, locale);
  
  // Filter gallery items by selected category
  const filteredGallery = selectedCategory === 'all' 
    ? localizedGalleryItems 
    : localizedGalleryItems.filter(item => item.category === selectedCategory);
  
  // Get unique categories for the filter
  const categories = Array.from(
    new Set(['all', ...localizedGalleryItems.map(item => item.category)])
  );
  
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setLightboxOpened(true);
  };
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Gallery' }
          ]}
        />
      ) : (
        <Banner
          type="gallery"
          title={t?.title || 'Gallery'}
          backgroundImage="/banners/gallery-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Gallery' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Category filter */}
          <Group justify="apart">
            <Title order={2}>{t?.pageHeading || 'Our Gallery'}</Title>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              data={categories.map(category => ({
                value: category,
                label: category === 'all' 
                  ? (t?.allCategories || 'All Categories')
                  : category.charAt(0).toUpperCase() + category.slice(1)
              }))}
              placeholder={t?.selectCategory || 'Select Category'}
              style={{ minWidth: 200 }}
            />
          </Group>
          
          {loading ? (
            <Text ta="center">{common?.loading || 'Loading gallery...'}</Text>
          ) : error ? (
            <Text ta="center" c="red">
              {common?.errorMessage || 'Error loading content. Please try again later.'}
            </Text>
          ) : filteredGallery.length === 0 ? (
            <Text ta="center">{t?.noItems || 'No gallery items available yet.'}</Text>
          ) : (
            <Grid gutter="md">
              {filteredGallery.map((item) => (
                <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleImageClick(item.imageUrl)}>
                  <Image 
                    src={item.imageUrl} 
                    height={300}
                    fit="cover"
                    radius="md"
                    alt={item.title}
                    fallbackSrc="/images/fallbacks/gallery-image.svg"
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    padding: '1rem',
                    borderBottomLeftRadius: 'var(--mantine-radius-md)',
                    borderBottomRightRadius: 'var(--mantine-radius-md)'
                  }}>
                    <Group justify="apart">
                      <Text 
                        c="white" 
                        fw={500}
                        style={{ fontFamily: locale === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                      >
                        {locale === 'hi' && item.titleHi ? item.titleHi : item.title}
                      </Text>
                      <Badge 
                        leftSection={item.type === 'image' ? <IconPhoto size={14} /> : <IconVideo size={14} />}
                        style={{ fontFamily: locale === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                      >
                        {item.type === 'image' ? (locale === 'hi' ? 'छवि' : 'Image') : (locale === 'hi' ? 'वीडियो' : 'Video')}
                      </Badge>
                    </Group>
                    <Group gap="xs" mt="xs">
                      <IconCalendar size={14} color="white" />
                      <Text size="xs" c="white">
                        {new Date(item.date || item.createdAt || item.updatedAt || Date.now()).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
                      </Text>
                    </Group>
                  </div>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
      
      {/* Lightbox for viewing images */}
      <Lightbox
        opened={lightboxOpened}
        onClose={() => setLightboxOpened(false)}
        imageUrl={selectedImage || ''}
      />
    </main>
  );
}
