'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Image, Badge, Group, Stack, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import RichTextContent  from '@/components/RichTextContent'; // Updated import path
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import { useBannerStore } from '@/store/useBannerStore';
import classes from './success-story.module.css';
import { BannerType } from '@/types/banner';
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
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();

  // Add type safety for params
  const storySlug = params?.slug?.toString();
  const [story, setStory] = useState(storySlug ? stories.find(s => s.id === storySlug) : null);

  useEffect(() => {
    fetchBanners();
    if (!story) {
      fetchStories();
    }
  }, [fetchBanners, fetchStories, story]);

  useEffect(() => {
    if (storySlug) {
      setStory(stories.find(s => s.id === storySlug));
    }
  }, [stories, storySlug]);

  const banner = getBannerByType('successstories');

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

  if (bannerLoading || loading || !story) {
    return (
      <main>
        <Banner
          type="successstories"
          title="Loading..."
          backgroundImage="/banners/success-stories-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Success Stories', link: '/success-stories' },
          ]}
        />
        <StoryDetailSkeleton />
      </main>
    );
  }

  if (bannerError || error || !banner) {
    // ...error handling...
  }

  return (
    <main>
      {banner && (
        <Banner
          type={banner.type as BannerType}
          title={story.title}
          description={banner.description ?? undefined}
          backgroundImage={story.imageUrl || banner.backgroundImage}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Success Stories', link: '/success-stories' },
            { label: story.title }
          ]}
        />
      )}

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
