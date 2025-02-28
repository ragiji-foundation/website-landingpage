import { Grid, Card, Skeleton, Stack } from '@mantine/core';

export function AwardsSkeleton() {
  return (
    <Grid gutter="xl">
      {[...Array(6)].map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
          <Card padding="lg" radius="md">
            <Skeleton height={200} mb="md" />
            <Stack gap="md">
              <Skeleton height={24} width="80%" />
              <Skeleton height={16} width="40%" />
              <Skeleton height={60} />
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
