'use client';
import { Container, Title, SimpleGrid, Text, BackgroundImage, Box, Skeleton } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGalleryStore } from '@/store/useGalleryStore';
import classes from './Gallery.module.css';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  createdAt: string;
}

interface FallbackItem {
  image: string;
  title: string;
  count: string;
}

type GalleryItemType = GalleryItem | FallbackItem;

export default function Gallery() {
  const { items, loading, error, fetchGallery } = useGalleryStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  if (loading) {
    return (
      <Container size="xl" py={100}>
        <Skeleton height={40} width="30%" mx="auto" mb="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={30}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height={440} radius="lg" />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  if (error) {
    // Fallback to static data if API fails
    console.error('Gallery API Error:', error);
    // You can add error UI here if needed
  }

  // Update the fallback data typing
  const fallbackData: FallbackItem[] = [
    {
      image: '/gallery/1.jpg',
      title: 'Education Access',
      count: '1,000+ Students'
    },
    {
      image: '/gallery/2.jpg',
      title: 'Healthcare',
      count: '500+ Families'
    },
    {
      image: '/gallery/3.jpg',
      title: 'Rural Development',
      count: '10 Villages'
    },
    {
      image: '/gallery/4.jpg',
      title: 'Youth Programs',
      count: '250+ Youth'
    },
    {
      image: '/gallery/5.jpg',
      title: 'Green Earth',
      count: '1000+ Trees'
    },
    {
      image: '/gallery/6.jpg',
      title: 'Women Power',
      count: '300+ Women'
    }
  ];

  // Use API data if available, otherwise fallback to static data
  const galleryItems: GalleryItemType[] = items.length > 0 ? items : fallbackData;

  return (
    <div className={classes.wrapper}>
      <Container size="xl" py={100}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title className={classes.title} ta="center">Our Impact</Title>
          <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="sm" mb={50}>
            Transforming communities through sustainable initiatives and empowerment programs
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={30}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <BackgroundImage
                className={classes.card}
                src={'imageUrl' in item ? item.imageUrl : item.image}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={classes.overlay}
                    >
                      <Box className={classes.content}>
                        <Text className={classes.cardTitle}>{item.title}</Text>
                        <Text className={classes.cardCount}>{'count' in item ? item.count : ''}</Text>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BackgroundImage>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
