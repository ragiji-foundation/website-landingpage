import { Container, Skeleton } from '@mantine/core';

export function SectionLoader() {
  return (
    <Container fluid p={0}>
      <Skeleton height="90vh" width="100%" radius={0} animate />
    </Container>
  );
}
