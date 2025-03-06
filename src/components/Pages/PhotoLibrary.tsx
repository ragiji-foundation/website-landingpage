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

interface Photo {
  id: string;
  title: string;
  url: string;
  category: string;
  date: string;
  description?: string;
}

interface PhotoLibraryProps {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  viewMode?: 'grid' | 'masonry';
}

// Demo photos data - in a real implementation, this would come from an API
const DEMO_PHOTOS: Photo[] = [
  {
    id: '1',
    title: 'Community Event',
    url: 'https://picsum.photos/seed/event1/800/600',
    category: 'events',
    date: '2023-10-15',
    description: 'Our annual community gathering event'
  },
  {
    id: '2',
    title: 'New School Building',
    url: 'https://picsum.photos/seed/building1/800/600',
    category: 'facilities',
    date: '2023-09-20',
    description: 'Our newly constructed school building'
  },
  {
    id: '3',
    title: 'Student Graduation',
    url: 'https://picsum.photos/seed/grad1/800/600',
    category: 'events',
    date: '2023-08-05',
    description: 'Graduation ceremony for our students'
  },
  {
    id: '4',
    title: 'Library Opening',
    url: 'https://picsum.photos/seed/lib1/800/600',
    category: 'facilities',
    date: '2023-07-12',
    description: 'Opening ceremony of our new library'
  },
  {
    id: '5',
    title: 'Community Leaders',
    url: 'https://picsum.photos/seed/people1/800/600',
    category: 'people',
    date: '2023-06-28',
    description: 'Our dedicated community leaders'
  },
  {
    id: '6',
    title: 'New Project Launch',
    url: 'https://picsum.photos/seed/project1/800/600',
    category: 'projects',
    date: '2023-05-15',
    description: 'Launching our new education initiative'
  },
];

export function PhotoLibrary({ category, searchTerm, sortBy = 'newest', viewMode = 'grid' }: PhotoLibraryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Simulate API call with setTimeout
    setLoading(true);
    setTimeout(() => {
      let filteredPhotos = [...DEMO_PHOTOS];

      // Apply category filter
      if (category) {
        filteredPhotos = filteredPhotos.filter(photo => photo.category === category);
      }

      // Apply search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredPhotos = filteredPhotos.filter(photo =>
          photo.title.toLowerCase().includes(term) ||
          (photo.description && photo.description.toLowerCase().includes(term))
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          filteredPhotos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
        case 'oldest':
          filteredPhotos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'popular':
          // In real app, you might sort by view count or likes
          break;
      }

      setPhotos(filteredPhotos);
      setLoading(false);
    }, 800);
  }, [category, searchTerm, sortBy]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    open();
  };

  // Pagination
  const totalPages = Math.ceil(photos.length / itemsPerPage);
  const paginatedPhotos = photos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  if (photos.length === 0) {
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
                src={photo.url}
                height={viewMode === 'masonry' ? (Math.random() * 100 + 150) : 200}
                alt={photo.title}
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
          />
        </Group>
      )}

      {/* Photo Modal */}
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title={selectedPhoto?.title}
        centered
      >
        {selectedPhoto && (
          <Box>
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              maw="100%"
              mah="70vh"
              fit="contain"
            />
            <Text mt="md" size="lg">{selectedPhoto.title}</Text>
            <Text color="dimmed" size="sm">
              {new Date(selectedPhoto.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text mt="sm">{selectedPhoto.description}</Text>
          </Box>
        )}
      </Modal>
    </>
  );
}
