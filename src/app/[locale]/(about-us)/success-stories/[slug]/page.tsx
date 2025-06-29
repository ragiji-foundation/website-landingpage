'use client';

import { Container, Title, Grid, Card, Text, Image, Box, Stack, Paper } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import { useSuccessStoriesStore, SuccessStory } from '@/store/useSuccessStoriesStore';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';
import { withLocalization } from '@/utils/localization';
import { SimpleRichText } from '@/components/SimpleRichText';
import { useFallbackImages } from '@/hooks/useFallbackImages';
import { useDictionary } from '@/hooks/useDictionary';

function getRelatedSlug(params: { slug?: string | string[] }): string {
  // Extract slug from params and ensure it's a string
  if (Array.isArray(params.slug)) {
    return params.slug[0] || '';
  }
  return params.slug || '';
}

interface RelatedStoriesProps {
  stories: SuccessStory[];
  locale: string;
  title: string;
}

function RelatedStories({ stories, locale, title }: RelatedStoriesProps) {
  const { getPlaceholderImage } = useFallbackImages();
  
  if (stories.length === 0) return null;
  
  return (
    <Stack mt="xl">
      <Title order={3}>{title}</Title>
      <Grid>
        {stories.map(story => (
          <Grid.Col key={story.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              {story.imageUrl && (
                <Card.Section>
                  <Image
                    src={story.imageUrl}
                    height={200}
                    alt={story.title}
                    fallbackSrc={getPlaceholderImage('story')}
                  />
                </Card.Section>
              )}
              <Stack mt="md">
                <Title order={4}>{story.title}</Title>
                <Text size="sm" c="dimmed">{story.personName}, {story.location}</Text>
                <Link href={`/${locale}/success-stories/${story.slug}`}>Read more</Link>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export default function SuccessStoryDetail() {
  const { stories, loading: storyLoading, error: storyError, currentStory, fetchStoryBySlug } = useSuccessStoriesStore();
  const { banner, loading: bannerLoading, error: bannerError } = useBanner('successstories');
  const [relatedStories, setRelatedStories] = useState<SuccessStory[]>([]);
  const router = useRouter();
  const params = useParams();
  const slug = getRelatedSlug(params);
  const locale = (params.locale as string) || 'en';
  
  // Get translations
  const { dictionary } = useDictionary();
  const t = dictionary?.successstories || {};
  const common = dictionary?.common || {};
  
  // Get fallback images
  const { getPlaceholderImage } = useFallbackImages();
  
  useEffect(() => {
    // Fetch the story by slug
    const loadStory = async () => {
      const story = await fetchStoryBySlug(slug, locale);
      if (!story) {
        // If story not found, redirect to 404 page
        router.push(`/${locale}/404`);
      }
    };
    
    if (slug) {
      loadStory();
    }
  }, [slug, locale, fetchStoryBySlug, router]);
  
  // Find related stories whenever the current story changes
  useEffect(() => {
    if (currentStory && stories.length > 0) {
      // Get 2-3 related stories that are not the current one
      const related = stories
        .filter(s => s.id !== currentStory.id)
        .sort(() => Math.random() - 0.5) // Simple randomization
        .slice(0, 3);
      setRelatedStories(related);
    }
  }, [currentStory, stories]);
  
  // Show loading state
  if (storyLoading) {
    return (
      <Container>
        <Box py="xl">
          <Text ta="center">{common?.loading || 'Loading story...'}</Text>
        </Box>
      </Container>
    );
  }
  
  // Show error state
  if (storyError || !currentStory) {
    return (
      <Container>
        <Box py="xl">
          <Text ta="center" c="red">
            {storyError?.message || common?.errorMessage || 'Story not found or error loading details.'}
          </Text>
        </Box>
      </Container>
    );
  }
  
  // Get localized story
  const localizedStory = withLocalization(currentStory, locale);
  
  return (
    <main>
      <Banner
        type="story"
        title={localizedStory.title}
        backgroundImage={localizedStory.imageUrl || '/banners/story-banner.svg'}
        breadcrumbs={[
          { label: common.home || 'Home', link: `/${locale}` },
          { label: t.title || 'Success Stories', link: `/${locale}/success-stories` },
          { label: localizedStory.title }
        ]}
      />
      
      <Container size="lg" py="xl">
        <Paper shadow="xs" p="xl" withBorder>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Image
                src={localizedStory.imageUrl || getPlaceholderImage('story')}
                alt={localizedStory.title}
                radius="md"
              />
              <Box mt="md">
                <Title order={4}>{localizedStory.personName}</Title>
                <Text size="sm" c="dimmed">{localizedStory.location}</Text>
              </Box>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} mb="lg">{localizedStory.title}</Title>
              
              <SimpleRichText content={localizedStory.content} />
            </Grid.Col>
          </Grid>
        </Paper>
        
        {relatedStories.length > 0 && (
          <RelatedStories 
            stories={relatedStories.map(story => withLocalization(story, locale))} 
            locale={locale}
            title={t.relatedStories || 'Related Stories'}
          />
        )}
      </Container>
    </main>
  );
}