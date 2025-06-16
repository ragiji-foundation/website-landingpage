'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Image,
  Text,
  Group,
  Avatar,
  Button,
  Divider,
  Card,
  SimpleGrid,
  Box,
  Breadcrumbs,
  Anchor,
  LoadingOverlay,
  Skeleton,
  Alert
} from '@mantine/core';
import { useRouter, useParams } from 'next/navigation';
import { IconArrowLeft, IconCalendar, IconMapPin, IconShare, IconInfoCircle } from '@tabler/icons-react';
import { useSuccessStoriesStore, SuccessStory } from '@/store/useSuccessStoriesStore';
import { useBanner } from '@/hooks/useBanner';
import { Banner } from '@/components/Banner';
import { RichTextContent } from '@/components/RichTextContent';
import classes from './story-detail.module.css';

export default function SuccessStoryDetail() {
  const { stories, loading: storyLoading, error: storyError, selectedStory, fetchStoryBySlug } = useSuccessStoriesStore();
  const { banner, loading: bannerLoading, error: bannerError } = useBanner('successstories');
  const [relatedStories, setRelatedStories] = useState<SuccessStory[]>([]);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const loading = storyLoading || bannerLoading;

  useEffect(() => {
    // Fetch the story by slug
    if (slug) {
      fetchStoryBySlug(slug as string);
    }
  }, [fetchStoryBySlug, slug]);

  // Find related stories when we have the selected story
  useEffect(() => {
    if (selectedStory && stories.length > 0) {
      // Find stories with the same location
      const related = stories
        .filter(s => s.id !== selectedStory.id && s.location === selectedStory.location)
        .slice(0, 3);
      setRelatedStories(related);
    }
  }, [selectedStory, stories]);

  const formatDate = (dateString: string) => { // Added type annotation
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Display loading skeleton
  if (loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="md" py="xl">
          <Skeleton height={50} width="80%" mb="xl" />
          <Group mb="xl">
            <Skeleton height={40} width={40} radius="xl" />
            <Skeleton height={40} width={200} />
            <Skeleton height={20} width={100} ml="auto" />
          </Group>
          <Skeleton height={350} mb="xl" />
          <Skeleton height={25} mb="md" />
          <Skeleton height={25} width="90%" mb="md" />
          <Skeleton height={25} width="95%" mb="md" />
          <Skeleton height={25} width="85%" mb="md" />
        </Container>
      </main>
    );
  }

  // Handle errors and missing story
  if (storyError || !selectedStory) {
    return (
      <main>
        <Banner
          type="error"
          title="Story Not Found"
          description="We couldn't find the story you're looking for."
          backgroundImage="/banners/error-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Success Stories', link: '/success-stories' },
            { label: 'Story Not Found' }
          ]}
        />

        <Container size="md" py="xl">
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Story Not Found"
            color="red"
            mb="lg"
          >
            The story you're looking for may have been moved or deleted.
          </Alert>

          <Button
            mt="md"
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/success-stories')}
          >
            Back to All Stories
          </Button>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Banner
        type="successstories"
        title={selectedStory.title}
        description={`A story about ${selectedStory.personName} from ${selectedStory.location}`}
        backgroundImage={selectedStory.imageUrl || banner?.backgroundImage}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Success Stories', link: '/success-stories' },
          { label: selectedStory.title }
        ]}
      />

      <Container size="md" py="xl">
        {/* Show error banner if API had an error but we're using cached data */}
        {(storyError || bannerError) && (
          <Alert
            icon={<IconInfoCircle />}
            title="Note"
            color="yellow"
            mb="lg"
          >
            We're experiencing some issues connecting to our servers. Some content might be limited or outdated.
          </Alert>
        )}

        {/* Meta Information */}
        <Group justify="apart" mb="lg">
          <Group>
            <Avatar color="blue" radius="xl">{selectedStory.personName.charAt(0)}</Avatar>
            <div>
              <Text fw={500}>{selectedStory.personName}</Text>
              <Group gap="xs">
                <IconMapPin size={14} stroke={1.5} />
                <Text size="sm" c="dimmed">{selectedStory.location}</Text>
              </Group>
            </div>
          </Group>
          <Group>
            <IconCalendar size={14} stroke={1.5} />
            <Text size="sm" c="dimmed">{formatDate(selectedStory.createdAt)}</Text>
          </Group>
        </Group>

        {/* Featured Image */}
        {selectedStory.imageUrl && (
          <Image
            src={selectedStory.imageUrl}
            height={400}
            alt={selectedStory.title}
            radius="md"
            className={classes.featuredImage}
            mb="xl"
          />
        )}

        {/* Content */}
        <div className={classes.storyContent}>
          <RichTextContent content={selectedStory.content} />
        </div>

        {/* Share Buttons */}
        <Group mt="xl" justify="center">
          <Button
            variant="light"
            leftSection={<IconShare size={16} />}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: selectedStory.title,
                  text: `Read ${selectedStory.title} - A success story`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('URL copied to clipboard!');
              }
            }}
          >
            Share this story
          </Button>
        </Group>

        <Divider my="xl" />

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <Box mb="xl">
            <Title order={2} size="h3" mb="md">More Stories from {selectedStory.location}</Title>
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              {relatedStories.map(relatedStory => (
                <Card
                  key={relatedStory.id}
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                  className={classes.relatedCard}
                  onClick={() => router.push(`/success-stories/${relatedStory.slug}`)}
                >
                  {relatedStory.imageUrl && (
                    <Card.Section>
                      <Image
                        src={relatedStory.imageUrl}
                        height={120}
                        alt={relatedStory.title}
                      />
                    </Card.Section>
                  )}
                  <Text fw={500} mt="sm" lineClamp={2}>
                    {relatedStory.title}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Back Button */}
        <Group justify="center" mt="xl">
          <Button
            variant="outline"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/success-stories')}
          >
            Back to All Stories
          </Button>
        </Group>
      </Container>
    </main>
  );
}