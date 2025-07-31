'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Title, SimpleGrid, Card, Image, Text, Button, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto, IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGalleryStore } from '@/store/useGalleryStore';
import classes from './GallerySection.module.css';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Use language context for translations
  const { language } = useLanguage();
  
  // Use gallery store for data
  const { galleryItems, loading, fetchGalleryItems } = useGalleryStore();

  // Fetch gallery items on component mount
  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Display only first 8 items for the section
  const displayItems = galleryItems.slice(0, 8);

  const handleImageClick = (imageUrl: string) => {
    const index = displayItems.findIndex(item => item.imageUrl === imageUrl);
    setCurrentImageIndex(index);
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : displayItems.length - 1;
      setSelectedImage(displayItems[newIndex].imageUrl);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev < displayItems.length - 1 ? prev + 1 : 0;
      setSelectedImage(displayItems[newIndex].imageUrl);
      return newIndex;
    });
  };

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Title 
          className={classes.title}
          ta="center"
          mb="xl"
        >
          {language === 'hi' ? 'हमारा गैलरी' : 'Our Gallery'}
        </Title>

        {loading ? (
          <Text ta="center">Loading...</Text>
        ) : (
          <>
            <SimpleGrid cols={{ base: 3, xs: 3, sm: 3, md: 4, lg: 4 }} spacing={{ base: 'xs', sm: 'md', md: 'lg' }}>
              {displayItems.map((item) => (
                <Card
                  key={item.id}
                  shadow="sm"
                  padding="sm"
                  radius="md"
                  className={classes.card}
                >
                  <Card.Section className={classes.imageSection}>
                    <Image
                      src={item.imageUrl || '/images/placeholder.svg'}
                      alt={item.title}
                      className={classes.image}
                      height={120}
                    />
                    <div
                      className={classes.overlay}
                      onClick={() => handleImageClick(item.imageUrl)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={classes.viewButton}>
                        {language === 'hi' ? 'छवि देखें' : 'View Image'}
                      </div>
                    </div>
                  </Card.Section>

                  <Text 
                    fw={500} 
                    size="sm"
                    mt="sm"
                    lineClamp={2}
                    className={classes.cardTitle}
                  >
                    {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>

            {/* Bottom Button */}
            <Box mt="xl" ta="center">
              <Button
                component={Link}
                href={`/${language}/gallery`}
                variant="outline"
                size="sm"
                rightSection={<IconPhoto size={16} />}
              >
                {language === 'hi' ? 'सभी फोटो देखें' : 'See All Images'}
              </Button>
            </Box>
          </>
        )}
      </Container>

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
    </Box>
  );
}

