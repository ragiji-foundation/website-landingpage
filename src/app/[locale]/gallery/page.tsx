'use client';

import { Container, Title, Grid, Image, Stack, Group, Badge, Select, Text, ActionIcon } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useBannerStore } from '@/store/useBannerStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { withLocalizedArray } from '@/utils/localization';
import { useDictionary } from '@/hooks/useDictionary';
import { IconPhoto, IconVideo, IconCalendar, IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';
import classes from './gallery.module.css';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Minimum distance for a swipe
  const minSwipeDistance = 50;
  
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

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    const handleClose = () => {
      setModalVisible(false);
      setSelectedImage(null);
    };

    const handlePrevious = () => {
      if (!filteredGallery.length) return;
      setCurrentImageIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : filteredGallery.length - 1;
        setSelectedImage(filteredGallery[newIndex].imageUrl);
        return newIndex;
      });
    };

    const handleNext = () => {
      if (!filteredGallery.length) return;
      setCurrentImageIndex((prev) => {
        const newIndex = prev < filteredGallery.length - 1 ? prev + 1 : 0;
        setSelectedImage(filteredGallery[newIndex].imageUrl);
        return newIndex;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalVisible) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };

    // Lock body scroll when modal is open
    if (modalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [modalVisible, filteredGallery]);
  
  const handleImageClick = (imageUrl: string) => {
    if (!imageUrl) return;
    const index = filteredGallery.findIndex(item => item.imageUrl === imageUrl);
    setCurrentImageIndex(index);
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!filteredGallery.length) return;
    setCurrentImageIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : filteredGallery.length - 1;
      setSelectedImage(filteredGallery[newIndex].imageUrl);
      return newIndex;
    });
  };

  const handleNext = () => {
    if (!filteredGallery.length) return;
    setCurrentImageIndex((prev) => {
      const newIndex = prev < filteredGallery.length - 1 ? prev + 1 : 0;
      setSelectedImage(filteredGallery[newIndex].imageUrl);
      return newIndex;
    });
  };

  // Touch event handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
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
      
      {/* Modal Lightbox for viewing images */}
      {modalVisible && selectedImage && (
        <div
          className={classes.modalBackdrop}
          onClick={handleClose}
          role="presentation"
        >
          <div
            className={classes.modalContainer}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
          >
            <ActionIcon
              className={`${classes.navButton} ${classes.prevButton}`}
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <IconArrowLeft size={24} />
            </ActionIcon>

            <div className={classes.modalImageWrapper}>
              <Image
                src={selectedImage}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className={classes.modalImage}
                fit="contain"
                loading="eager"
              />
            </div>

            <ActionIcon
              className={`${classes.navButton} ${classes.nextButton}`}
              onClick={handleNext}
              aria-label="Next image"
            >
              <IconArrowRight size={24} />
            </ActionIcon>

            <ActionIcon
              className={classes.closeButton}
              onClick={handleClose}
              aria-label="Close gallery"
              title="Close (Esc)"
            >
              <IconX size={24} stroke={2.5} />
            </ActionIcon>
          </div>
        </div>
      )}
    </main>
  );
}
