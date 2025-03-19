'use client';
import { useEffect, useState } from 'react';  // Add this import
import { Container, Title, SimpleGrid, Card, Image, Text, Badge, Button, Group, Modal, Center } from '@mantine/core';
import Link from 'next/link';
import { IconPhoto } from '@tabler/icons-react';
import { useGalleryStore } from '@/store/useGalleryStore';
import { GallerySkeleton } from '../skeletons/GallerySkeleton';
import classes from './GallerySection.module.css';
import { useDisclosure } from '@mantine/hooks';

export default function GallerySection() {
  const { items, loading, error, fetchGallery } = useGalleryStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Group justify="space-between" align="center" mb="xl">
          <Title order={2}>Our Gallery</Title>
          <Button variant="light" rightSection={<IconPhoto size={16} />} disabled>
            View All Photos
          </Button>
        </Group>
        <GallerySkeleton count={6} />
      </Container>
    );
  }

  // Take only the latest 6 items for homepage
  const recentItems = items.slice(0, 6);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    open();
  };

  return (
    <Container size="xl" py="xl" className={classes.container}>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} className={classes.title}>
          Our Gallery
        </Title>
        <Button
          component={Link}
          href="/gallery"
          variant="light"
          rightSection={<IconPhoto size={16} />}
        >
          View All Photos
        </Button>
      </Group>

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
                src={item.imageUrl || '/placeholder.jpg'} // Add fallback directly
                alt={item.title}
                height={220}
                className={classes.image}
              />
              <div
                className={classes.overlay}
                onClick={() => handleImageClick(item.imageUrl)}
                role="button"
                tabIndex={0}
              >
                <div className={classes.viewButton}>
                  View Image
                </div>
              </div>
            </Card.Section>

            <Text fw={500} size="lg" mt="md" lineClamp={2}>
              {item.title}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        size="90vw" // Make modal larger
        centered
        className={classes.modal}
        withCloseButton
      >
        {selectedImage && (
          <div className={classes.modalImageContainer}>
            <Image
              src={selectedImage}
              alt="Full size gallery image"
              className={classes.modalImage}
              fit="contain"
            />
          </div>
        )}
      </Modal>
    </Container>
  );
}

