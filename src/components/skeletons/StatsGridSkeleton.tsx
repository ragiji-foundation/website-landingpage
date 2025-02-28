'use client';
import { Container, SimpleGrid, Paper, Group, Skeleton } from '@mantine/core';

export function StatsGridSkeleton() {
  return (
    <Container size="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {[...Array(4)].map((_, index) => (
          <Paper key={index} withBorder p="md" radius="md">
            <Group align="flex-start">
              <Skeleton circle height={32} />
              <div>
                <Skeleton height={24} width={80} mb="xs" />
                <Skeleton height={16} width={120} />
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}
