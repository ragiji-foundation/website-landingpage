"use client"

import { Container, Title, Text, Image, Stack, Button, Group } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';

export default function StoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  // In a real app, fetch story details based on slug
  // For now, we'll use mock data
  const storyDetails = {
    title: "Story Title",
    content: "Full story content...",
    image: "/path/to/image.jpg",
  };

  return (
    <Container size="lg" py="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.back()}
        mb="xl"
      >
        Back to Stories
      </Button>

      <Stack gap="xl">
        <Title order={1}>{storyDetails.title}</Title>

        <Image
          src={storyDetails.image}
          alt={storyDetails.title}
          height={400}
          radius="md"
        />

        <Text>{storyDetails.content}</Text>
      </Stack>
    </Container>
  );
}
