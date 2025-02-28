'use client';
import { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGalleryStore } from '@/store/useGalleryStore';
import { GalleryItem } from '@/types/gallery';
import { GallerySkeleton } from '../skeletons/GallerySkeleton';
import classes from './PhotoLibrary.module.css';

export function PhotoLibrary() {
  const { items, loading, error, fetchGallery } = useGalleryStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Title order={2} ta="center" mb="xl">Photo Gallery</Title>
        <GallerySkeleton count={12} />
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mb="xl">Photo Gallery</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {items.map((item) => (
          <Card
            key={item.id}
            shadow="sm"
            padding="md"
            radius="md"
            className={classes.card}
            onClick={() => {
              setSelectedImage(item);
              open();
            }}
          >
            <Card.Section className={classes.imageSection}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                className={classes.image}
              />
              <div className={classes.overlay}>
                <Text c="white" size="lg">View</Text>
              </div>
            </Card.Section>
            <Text fw={500} size="lg" mt="md">{item.title}</Text>
            <Text size="sm" c="dimmed">{item.description}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          setSelectedImage(null);
        }}
        size="xl"
        padding="xl"
      >
        {selectedImage && (
          <Stack>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fit="contain"
            />
            <Title order={3}>{selectedImage.title}</Title>
            <Text>{selectedImage.description}</Text>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}
