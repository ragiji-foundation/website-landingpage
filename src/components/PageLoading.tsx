import { Container, Skeleton, Stack } from '@mantine/core';

export function PageLoading() {
  return (
    <Container size="xl" py="xl">
      <Stack>
        <Skeleton height={200} radius="md" />
        <Skeleton height={50} width="50%" radius="md" />
        <Skeleton height={20} radius="md" />
        <Skeleton height={20} radius="md" />
      </Stack>
    </Container>
  );
}
