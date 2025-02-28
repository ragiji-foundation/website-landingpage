'use client';
import { useEffect } from 'react';
import { Container, Title, Grid, Card, Image, Text, Badge, Button, Group, Overlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowRight } from '@tabler/icons-react';
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import { RichTextContent } from '@/components/RichTextContent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessStoriesSkeleton } from '../skeletons/SuccessStoriesSkeleton';
import classes from './success-stories-section.module.css';

export default function SuccessStoriesSection() {
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();
  const router = useRouter();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) return <SuccessStoriesSkeleton count={6} />;

  // Get latest 6 stories
  const latestStories = [...stories]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title>Success Stories</Title>
        <Button
          component={Link}
          href="/success-stories"
          variant="light"
          rightSection={<IconArrowRight size={16} />}
        >
          View All Stories
        </Button>
      </Group>

      <Grid>
        {latestStories.map((story) => (
          <Grid.Col key={story.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
              <Card.Section className={classes.imageSection} onClick={() => router.push(`/success-stories/${story.id}`)}>
                {story.imageUrl && (
                  <>
                    <Image
                      src={story.imageUrl}
                      height={200}
                      alt={story.title}
                      className={classes.image}
                    />
                    <Overlay className={classes.overlay} opacity={0.2} />
                    <div className={classes.imageCaption}>
                      <Text size="sm" c="white" fw={500}>Click to read full story</Text>
                    </div>
                  </>
                )}
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} lineClamp={1}>{story.title}</Text>
                {story.featured && (
                  <Badge color="blue" variant="light">Featured</Badge>
                )}
              </Group>

              <RichTextContent
                content={story.content}
                truncate
                maxLength={100}
              />

              <Group mt="md">
                <div>
                  <Text fw={500}>{story.personName}</Text>
                  <Text size="sm" c="dimmed">{story.location}</Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

