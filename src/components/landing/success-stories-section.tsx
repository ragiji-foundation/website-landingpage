'use client';
import { useEffect } from 'react';
import { Container, Title, Grid, Card, Image, Text, Button, Group, Box } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessStoriesSkeleton } from '../skeletons/SuccessStoriesSkeleton';
import { RichTextContent } from '@/components/RichTextContent';
import classes from './success-stories-section.module.css';

export default function SuccessStoriesSection() {
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();
  const router = useRouter();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) return <SuccessStoriesSkeleton count={3} />;

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Text c="dimmed" ta="center">Unable to load success stories. Please try again later.</Text>
      </Container>
    );
  }

  // Get latest 3 stories for a cleaner design
  const latestStories = [...stories]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (latestStories.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Text c="dimmed" ta="center">No success stories available at the moment.</Text>
      </Container>
    );
  }

  // Update to use slug instead of ID
  interface Story {
    id: string;
    slug: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
  }

  const handleCardClick = (story: Story) => {
    router.push(`/success-stories/${story.slug}`);
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="center" mb="xl" align="center">
        <Title order={2} ta="center">Success Stories</Title>
      </Group>

      <Group justify="right" mb="md">
        <Button
          component={Link}
          href="/success-stories"
          variant="subtle"
          rightSection={<IconArrowRight size={16} />}
        >
          View All
        </Button>
      </Group>

      <Grid gutter="xl">
        {latestStories.map((story) => (
          <Grid.Col key={story.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              shadow="sm"
              padding={0}
              radius="md"
              className={classes.card}
              onClick={() => handleCardClick(story)}
            >
              {story.imageUrl && (
                <Card.Section>
                  <Image
                    src={story.imageUrl}
                    height={180}
                    alt={story.title}
                  />
                </Card.Section>
              )}

              <div className={classes.cardContent}>
                <Title order={3} size="h4" mb="xs">{story.title}</Title>

                <RichTextContent
                  content={story.content}
                  truncate
                  maxLength={120}
                />

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                >
                  Read Story
                </Button>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

