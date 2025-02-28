import { SimpleGrid, Skeleton, Card } from '@mantine/core';

interface GallerySkeletonProps {
  count?: number;
}

export function GallerySkeleton({ count = 6 }: GallerySkeletonProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} padding="md" radius="md">
          <Skeleton height={220} radius="md" mb="md" />
          <Skeleton height={20} width={80} radius="xl" mb="md" />
          <Skeleton height={24} radius="sm" mb="sm" />
          <Skeleton height={16} width="60%" radius="sm" />
        </Card>
      ))}
    </SimpleGrid>
  );
}
