import { Grid, Card, Skeleton } from '@mantine/core';

export function CentersSkeleton() {
  return (
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card padding="lg">
            <Skeleton height={200} mb="md" radius="md" />
            <Skeleton height={24} width="70%" mb="sm" />
            <Skeleton height={20} width="40%" mb="sm" />
            <Skeleton height={60} mb="md" />
            <Skeleton height={36} />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
