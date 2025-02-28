'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Image, Badge, Group, Stack, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { RichTextContent } from '@/components/RichTextContent';
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import classes from './story.module.css';

interface PageParams {
  params: {
    slug: string;
  };
}

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();
  const [story, setStory] = useState(stories.find(s => s.id === slug));

  useEffect(() => {
    if (!story) {
      fetchStories();
    }
  }, [fetchStories, story]);

  useEffect(() => {
    setStory(stories.find(s => s.id === slug));
  }, [stories, slug]);

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
