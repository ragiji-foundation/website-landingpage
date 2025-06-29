'use client';
import { useEffect, useState } from 'react';
import { Box, Container, Title, SimpleGrid, Card, Image, Text, Button, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto, IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';
import { useGalleryStore } from '@/store/useGalleryStore';
import { GallerySkeleton } from '../skeletons/GallerySkeleton';
import classes from './GallerySection.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useLanguage } from '@/context/LanguageContext';

export default function GallerySection() {
  const { language } = useLanguage();
  const { galleryItems: items = [], loading, fetchGalleryItems } = useGalleryStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch gallery items
  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalVisible) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVisible]);

  const handleImageClick = (imageUrl: string) => {
    console.log('Opening modal for:', imageUrl);
    if (!imageUrl) return; // Don't open modal if no image
    const index = recentItems.findIndex(item => item.imageUrl === imageUrl);
    setCurrentImageIndex(index);
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!items.length) return;
    setCurrentImageIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : items.length - 1;
      setSelectedImage(items[newIndex].imageUrl);
      return newIndex;
    });
  };

  const handleNext = () => {
    if (!items.length) return;
    setCurrentImageIndex((prev) => {
      const newIndex = prev < items.length - 1 ? prev + 1 : 0;
      setSelectedImage(items[newIndex].imageUrl);
      return newIndex;
    });
  };

  // Take only the latest 6 items or return empty array if items is undefined
  const recentItems = items?.slice(0, 6) || [];

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <div className={classes.header}>
          <Title 
            className={classes.title}
            style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
          >
            {language === 'hi' ? 'हमारा गैलरी' : 'Our Gallery'}
          </Title>
          <Button
            component={Link}
            href={`/${language}/gallery`}
            variant="light"
            rightSection={<IconPhoto size={16} />}
            style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
          >
            {language === 'hi' ? 'सभी फ़ोटो देखें' : 'View All Photos'}
          </Button>
        </div>

        {loading ? (
          <GallerySkeleton count={6} />
        ) : (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {recentItems.map((item) => (
                <Card
                  key={item.id}
                  shadow="sm"
                  padding="md"
                  radius="md"
                  className={classes.card}
                >
                  <Card.Section className={classes.imageSection}>
                    <Image
                      src={item.imageUrl || '/placeholder.jpg'}
                      alt={language === 'hi' && item.titleHi ? item.titleHi : item.title}
                      height={220}
                      className={classes.image}
                    />
                    <div
                      className={classes.overlay}
                      onClick={() => handleImageClick(item.imageUrl)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={classes.viewButton} style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>
                        {language === 'hi' ? 'छवि देखें' : 'View Image'}
                      </div>
                    </div>
                  </Card.Section>

                  <Text 
                    fw={500} 
                    size="lg" 
                    mt="md" 
                    lineClamp={2}
                    style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                  >
                    {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>

            {modalVisible && selectedImage && (
              <div
                className={classes.modalBackdrop}
                onClick={handleClose}
                role="presentation"
              >
                <div
                  className={classes.modalContainer}
                  onClick={e => e.stopPropagation()}
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
          </>
        )}
      </Container>
    </Box>
  );
}

