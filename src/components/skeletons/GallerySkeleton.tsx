'use client';

import { Card, SimpleGrid, Skeleton } from '@mantine/core';
import React from 'react';

interface GallerySkeletonProps {
  count?: number;
}

/**
 * Skeleton loading component for gallery items
 */
export function GallerySkeleton({ count = 6 }: GallerySkeletonProps) {
  return (
    <SimpleGrid cols={{ base: 3, xs: 3, sm: 3, md: 4, lg: 4 }} spacing={{ base: 'xs', sm: 'md', md: 'lg' }}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} shadow="sm" padding="md" radius="md">
          <Card.Section>
            <Skeleton height={220} radius="md" />
          </Card.Section>
          <Skeleton height={20} mt="md" width="80%" />
          <Skeleton height={15} mt="sm" width="50%" />
        </Card>
      ))}
    </SimpleGrid>
  );
}
