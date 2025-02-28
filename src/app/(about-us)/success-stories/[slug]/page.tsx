'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Image, Badge, Group, Stack, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { RichTextContent } from '@/components/RichTextContent'; // Updated import path
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import classes from './success-story.module.css';

function StoryDetailSkeleton() {
  return (
    <Container size="md" py="xl">
      <Stack>
        <Skeleton height={300} radius="md" mb="xl" />
        <Skeleton height={40} width="70%" mb="md" />
        <Group mb="xl">
          <Skeleton height={24} width={120} />
          <Skeleton height={24} width={100} />
        </Group>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={16} width={`${Math.random() * 30 + 70}%`} mb="sm" />
        ))}
      </Stack>
    </Container>
  );
}

export default function SuccessStoryPage() {
  const params = useParams();
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();

  // Add type safety for params
  const storySlug = params?.slug?.toString();
  const [story, setStory] = useState(storySlug ? stories.find(s => s.id === storySlug) : null);

  useEffect(() => {
    if (!story) {
      fetchStories();
    }
  }, [fetchStories, story]);

  useEffect(() => {
    if (storySlug) {
      setStory(stories.find(s => s.id === storySlug));
    }
  }, [stories, storySlug]);

  // Handle case when slug is missing
  if (!storySlug) {
    return (
      <main>
        <Banner
          type="about"
          title="Story Not Found"
          backgroundImage="/banners/success-stories-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Success Stories', link: '/success-stories' },
            { label: 'Not Found' }
          ]}
        />
        <Container size="md" py="xl">
          <Text>Story not found</Text>
        </Container>
      </main>
    );
  }

  if (loading || !story) {
    return (
      <main>
        <Banner
          type="about"
          title="Success Story"
          backgroundImage="/banners/success-stories-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Success Stories', link: '/success-stories' },
            { label: 'Story Details' }
          ]}
        />
        <StoryDetailSkeleton />
      </main>
    );
  }

  return (
    <main>
      <Banner
        type="about"
        title={story.title}
        backgroundImage={story.imageUrl || '/banners/success-stories-banner.jpg'}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Success Stories', link: '/success-stories' },
          { label: story.title }
        ]}
      />

      <Container size="md" py="xl">
        {story.imageUrl && (
          <Image
            src={story.imageUrl}
            alt={story.title}
            radius="md"
            className={classes.mainImage}
          />
        )}

        <Title order={1} mt="xl" mb="md">
          {story.title}
        </Title>

        <Group mb="xl">
          <Text fw={500}>{story.personName}</Text>
          <Text c="dimmed">•</Text>
          <Text c="dimmed">{story.location}</Text>
          {story.featured && (
            <Badge color="blue" variant="light">Featured</Badge>
          )}
        </Group>

        <div className={classes.content}>
          <RichTextContent content={story.content} />
        </div>
      </Container>
    </main>
  );
}
