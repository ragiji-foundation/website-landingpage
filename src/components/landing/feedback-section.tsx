import { Container, Title, Text, SimpleGrid, Card, Stack } from "@mantine/core"

export default function FeedbackSection() {
  return (
    <div style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
      <Container size="xl" py="xl">
        <Stack align="center" mb="xl">
          <Title ta="center" order={2} size="h1">
            Quality feedbacks for
            <br />
            your SaaS products
          </Title>
          <Text c="dimmed" ta="center">
            The blocks & components you need
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Card padding="xl" radius="md" withBorder>
            <Text size="lg" fw={500} mb="lg">
              Take authentic feedbacks from customers of your app.{" "}
              <Text span c="blue" td="underline">
                Build a quick list.
              </Text>
            </Text>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Customer feedback"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "0.5rem",
              }}
            />
          </Card>

          <Card padding="xl" radius="md" withBorder>
            <Text size="lg" fw={500} mb="lg">
              Make quick fixes based on the feedbacks you've received. With a happy smile.
            </Text>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Quick fixes"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "0.5rem",
              }}
            />
          </Card>

          <Card padding="xl" radius="md" withBorder>
            <Text size="lg" fw={500} mb="lg">
              Enjoy more than 10x revenue with{" "}
              <Text span c="blue">
                real-time conversions.
              </Text>{" "}
              Grow your business.
            </Text>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Revenue growth"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "0.5rem",
              }}
            />
          </Card>
        </SimpleGrid>
      </Container>
    </div>
  )
}

