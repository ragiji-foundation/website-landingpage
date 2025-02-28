import { Grid, Card, Skeleton, Group, Stack } from '@mantine/core';

export function CareersSkeleton() {
  return (
    <Grid>
      {[...Array(4)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md">
            <Stack>
              {/* Title */}
              <Skeleton height={28} width="80%" mb="md" />

              {/* Location, Type, Date group */}
              <Group gap="lg" mb="md">
                <Group gap="xs">
                  <Skeleton circle height={16} />
                  <Skeleton height={16} width={80} />
                </Group>
                <Group gap="xs">
                  <Skeleton circle height={16} />
                  <Skeleton height={20} width={60} radius="xl" />
                </Group>
                <Group gap="xs">
                  <Skeleton circle height={16} />
                  <Skeleton height={16} width={90} />
                </Group>
              </Group>

              {/* Description */}
              <Stack gap="xs" mb="lg">
                <Skeleton height={16} />
                <Skeleton height={16} width="90%" />
                <Skeleton height={16} width="95%" />
              </Stack>

              {/* Requirements and button */}
              <Group justify="space-between" align="center">
                <Skeleton height={16} width="60%" />
                <Skeleton height={36} width={120} radius="md" />
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
