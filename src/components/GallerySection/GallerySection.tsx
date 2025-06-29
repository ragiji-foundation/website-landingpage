'use client';

import React, { useEffect, useState } from 'react';
import { Box, Title, Text, SimpleGrid, Button, Card, Image, Group } from '@mantine/core';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { IconCalendar, IconPhoto } from '@tabler/icons-react';
import classes from './GallerySection.module.css';
import { withLocalizedArray } from '@/utils/localization';

/**
 * GallerySection component for displaying recent gallery items on the homepage
 * With improved error handling and fallbacks
 */
export default function GallerySection() {
  const { galleryItems = [], fetchGalleryItems } = useGalleryStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchGalleryItems();
      } catch (err) {
        console.error('Error loading gallery items:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [fetchGalleryItems]);

  // Safely get localized gallery items with fallbacks
  const items = Array.isArray(galleryItems) 
    ? withLocalizedArray(galleryItems, language) 
    : [];

  // Take only the latest 6 items with safe access
  const recentItems = Array.isArray(items) ? items.slice(0, 6) : [];

  return (
    <Box className={classes.wrapper}>
      <Title className={classes.title} order={2}>
        {t('home.gallery.heading') || 'Our Gallery'}
      </Title>

      <Text className={classes.description} size="lg">
        {t('home.gallery.description') || 'Explore moments captured from our initiatives and events'}
      </Text>

      {loading ? (
        <Text ta="center" mt="xl">{t('common.loading') || 'Loading...'}</Text>
      ) : error ? (
        <Text ta="center" color="red" mt="xl">
          {t('common.errorOccurred') || 'An error occurred while loading gallery items'}
        </Text>
      ) : recentItems.length === 0 ? (
        <Text ta="center" mt="xl">{t('home.gallery.noItems') || 'No gallery items available yet'}</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt={40}>
          {recentItems.map((item) => (
            <Card key={item.id} padding="md" radius="md" withBorder className={classes.card}>
              <Card.Section>
                <Image
                  src={item.imageUrl}
                  height={200}
                  alt={item.title}
                  fallbackSrc="/images/fallbacks/gallery-image.svg"
                />
              </Card.Section>
              <Group mt="md" mb="xs" justify="apart">
                <Text fw={500} lineClamp={1}>{item.title}</Text>
                <IconPhoto size={18} />
              </Group>
              <Group justify="left" gap="xs" mt="xs">
                <IconCalendar size={16} />
                <Text size="sm" color="dimmed">
                  {new Date(item.date || item.createdAt || item.updatedAt || Date.now()).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                </Text>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}

      <Group justify="center" mt={40}>
        <Button 
          component={Link}
          href={`/${language}/gallery`}
          size="md"
          variant="outline"
        >
          {t('home.gallery.viewAll') || 'View All Gallery Items'}
        </Button>
      </Group>
    </Box>
  );
}