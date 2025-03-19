'use client';
import { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Image,
  Text,
  Card,
  Group,
  Modal,
  Center,
  Loader,
  Stack,
  Pagination,
  Button,
  Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGalleryStore } from '@/store/useGalleryStore';
import { GalleryItem } from '@/types/gallery';

interface PhotoLibraryProps {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  viewMode?: 'grid' | 'masonry';
}

export function PhotoLibrary({ category, searchTerm, sortBy = 'newest', viewMode = 'grid' }: PhotoLibraryProps) {
  const { items, loading, error, fetchGallery, selectedImage, setSelectedImage } = useGalleryStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Filter and sort photos
  const filteredPhotos = items.filter(photo => {
    if (category && photo.category !== category) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return photo.title.toLowerCase().includes(term) ||
        photo.description.toLowerCase().includes(term);
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  const paginatedPhotos = filteredPhotos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePhotoClick = (photo: GalleryItem) => {
    setSelectedImage(photo);
    open();
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    close();
  };

  if (loading) {
    return (
      <Center py="xl">
        <Stack align="center">
          <Loader size="lg" />
          <Text>Loading photos...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Stack align="center" py="xl">
        <Text size="lg" fw={500} color="red">Error loading gallery</Text>
        <Button variant="light" onClick={() => fetchGallery()}>
          Retry
        </Button>
      </Stack>
    );
  }

  if (filteredPhotos.length === 0) {
    return (
      <Stack align="center" py="xl">
        <Text size="lg" fw={500}>No photos found</Text>
        <Text color="dimmed">Try adjusting your filters</Text>
        <Button variant="light" onClick={() => window.location.reload()}>
          Reset All Filters
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: viewMode === 'grid' ? 3 : 2 }}
        spacing="lg"
        mb="xl"
      >
        {paginatedPhotos.map((photo) => (
          <Card
            key={photo.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: 'pointer' }}
            onClick={() => handlePhotoClick(photo)}
          >
            <Card.Section>
              <Image
                src={photo.imageUrl}
                height={viewMode === 'masonry' ? (Math.random() * 100 + 150) : 200}
                alt={photo.title}
                fallbackSrc="/placeholders/image-placeholder.jpg"
              />
            </Card.Section>

            <Group justify="apart" mt="md" mb="xs">
              <Text fw={500}>{photo.title}</Text>
            </Group>

            <Text size="sm" color="dimmed" lineClamp={2}>
              {photo.description || 'No description available'}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            color="orange"
            radius="md"
          />
        </Group>
      )}

      <Modal
        opened={opened}
        onClose={handleCloseModal}
        size="lg"
        title={selectedImage?.title}
        centered
      >
        {selectedImage && (
          <Box>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              maw="100%"
              mah="70vh"
              fit="contain"
              fallbackSrc="/placeholders/image-placeholder.jpg"
            />
            <Text mt="md" size="lg">{selectedImage.title}</Text>
            <Text color="dimmed" size="sm">
              {new Date(selectedImage.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text mt="sm">{selectedImage.description}</Text>
          </Box>
        )}
      </Modal>
    </>
  );
}
