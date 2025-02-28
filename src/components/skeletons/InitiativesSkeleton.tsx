import { Container, SimpleGrid, Card, Skeleton, Title } from '@mantine/core';

interface InitiativesSkeletonProps {
  count?: number;
}

export function InitiativesSkeleton({ count = 3 }: InitiativesSkeletonProps) {
  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mb="xl">Our Initiatives</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md">
            <Card.Section>
              <Skeleton height={160} />
            </Card.Section>

            <Skeleton height={28} mt="md" width="70%" />
            <Skeleton height={16} mt="xs" />
            <Skeleton height={16} mt={4} width="80%" />
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
