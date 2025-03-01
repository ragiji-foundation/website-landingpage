import { Container, Grid, Skeleton, SimpleGrid } from '@mantine/core';
import classes from '../our-story.module.css';

export function OurStorySkeleton() {
  return (
    <Container size="lg">
      {/* Story Section Skeleton */}
      <Skeleton height={50} width="30%" mb="xl" />
      <Grid gutter="xl">
        <Grid.Col span={5}>
          <Skeleton height={300} radius="md" />
        </Grid.Col>
        <Grid.Col span={7}>
          <Skeleton height={20} mb="sm" />
          <Skeleton height={20} mb="sm" />
          <Skeleton height={20} width="80%" />
        </Grid.Col>
      </Grid>

      {/* Model Section Skeleton */}
      <Skeleton height={50} width="30%" mt={40} mb="xl" />
      <SimpleGrid cols={2}>
        <div>
          <Skeleton height={20} mb="sm" />
          <Skeleton height={20} mb="sm" />
          <Skeleton height={20} width="80%" />
        </div>
        <Skeleton height={200} radius="md" />
      </SimpleGrid>

      {/* Vision & Mission Skeleton */}
      <Skeleton height={50} width="30%" mt={40} mb="xl" />
      <SimpleGrid cols={2} spacing="xl">
        {[1, 2].map((i) => (
          <div key={i} style={{ padding: '20px' }}>
            <Skeleton height={80} width={80} circle mb="md" mx="auto" />
            <Skeleton height={24} width="60%" mb="sm" mx="auto" />
            <Skeleton height={60} />
          </div>
        ))}
      </SimpleGrid>

      {/* Timeline Skeleton */}
      <Skeleton height={50} width="30%" mt={40} mb="xl" />
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <Skeleton height={100} radius="md" />
        </div>
      ))}
    </Container>
  );
}
