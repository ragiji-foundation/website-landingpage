'use client';
import { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Center,
  Loader,
  Stack,
  Modal,
  AspectRatio,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './PhotoLibrary.module.css';

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
}

export function PhotoLibrary() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={400}>
        <Stack align="center">
          <Text c="red" size="xl" fw={700}>Error</Text>
          <Text>{error}</Text>
        </Stack>
      </Center>
    );
  }

  if (items.length === 0) {
    return (
      <Center h={400}>
        <Text size="xl">No photos available</Text>
      </Center>
    );
  }

  return (
    <>
      <Stack>
        <Text size="xl" fw={700} ta="center" className={classes.title}>
          Photo Gallery
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="lg"
          verticalSpacing="xl"
        >
          {items.map((item) => (
            <Card
              key={item.id}
              p="xs"
              radius="md"
              className={classes.card}
              onClick={() => {
                setSelectedImage(item);
                open();
              }}
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className={classes.image}
                />
              </AspectRatio>
              <Text size="sm" fw={500} mt="sm" ta="center">
                {item.title}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          setSelectedImage(null);
        }}
        size="xl"
        padding="xs"
        centered
        title={selectedImage?.title}
      >
        {selectedImage && (
          <Stack>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fit="contain"
            />
            {selectedImage.description && (
              <Text size="sm" c="dimmed">
                {selectedImage.description}
              </Text>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
}
