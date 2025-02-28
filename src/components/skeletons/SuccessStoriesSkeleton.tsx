'use client';
import { Container, Grid, Card, Skeleton, Title } from '@mantine/core';

interface SuccessStoriesSkeletonProps {
  count?: number;
}

export function SuccessStoriesSkeleton({ count = 6 }: SuccessStoriesSkeletonProps) {
  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mb="xl">Success Stories</Title>
      <Grid gutter="xl">
        {Array.from({ length: count }).map((_, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Card.Section>
                <Skeleton height={200} />
              </Card.Section>

              <Skeleton height={24} mt="md" width="80%" />
              <Skeleton height={16} mt="sm" />
              <Skeleton height={16} mt={4} width="90%" />
              <Skeleton height={16} mt={4} width="60%" />

              <Grid mt="md" gutter="xs">
                <Grid.Col span={6}>
                  <Skeleton height={20} width="80%" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Skeleton height={20} width="60%" />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
