'use client';

import { Container, Title, Timeline, Text, Image, Box, Stack, Group } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalization, withLocalizedArray } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useOurStoryStore } from '@/store/useOurStoryStore';
import { useTimelineStore } from '@/store/useTimelineStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';

export default function OurStoryPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { story, loading: storyLoading, error: storyError, fetchStory } = useOurStoryStore();
  const { timeline, loading: timelineLoading, error: timelineError, fetchTimeline } = useTimelineStore();
  
  useEffect(() => {
    fetchBanners();
    fetchStory();
    fetchTimeline();
  }, [fetchBanners, fetchStory, fetchTimeline]);
  
  // Get localized data
  const localizedStory = story ? withLocalization(story, locale) : null;
  const localizedTimeline = withLocalizedArray(timeline, locale);
  
  // Type assertion for media property
  interface StoryMedia {
    url: string;
    alt?: string;
  }
  
  // Safely access media property with type checking
  const storyMedia = localizedStory?.media as StoryMedia | undefined;
  
  // Get banner
  const banner = getBannerByType('our-story');
  
  const loading = storyLoading || timelineLoading;
  const error = storyError || timelineError;
  
  if (loading) return <div>Loading story...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Story' }
          ]}
        />
      ) : (
        <Banner
          type="our-story"
          title={locale === 'hi' ? 'हमारी कहानी' : 'Our Story'}
          backgroundImage="/banners/our-story-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Our Story' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        {localizedStory && (
          <Stack gap="xl">
            <Title ta="center" order={2}>
              {localizedStory.title}
            </Title>
            
            <Text size="lg">
              {localizedStory.content}
            </Text>
            
            {storyMedia && storyMedia.url && (
              <Box my="xl">
                <Image
                  src={storyMedia.url}
                  alt={storyMedia.alt || localizedStory.title}
                  radius="md"
                />
              </Box>
            )}
            
            <Title order={3} mt="xl">
              {locale === 'hi' ? 'हमारी यात्रा' : 'Our Journey'}
            </Title>
            
            <Timeline active={localizedTimeline.length - 1}>
              {localizedTimeline.map((item) => (
                <Timeline.Item key={item.id} title={`${item.year} - ${item.title}`}>
                  <Group>
                    <Text c="dimmed" size="sm">
                      {locale === 'hi' ? 'केंद्र:' : 'Centers:'} {item.centers}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {locale === 'hi' ? 'स्वयंसेवक:' : 'Volunteers:'} {item.volunteers}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {locale === 'hi' ? 'बच्चे:' : 'Children:'} {item.children}
                    </Text>
                  </Group>
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>
        )}
      </Container>
    </main>
  );
}
