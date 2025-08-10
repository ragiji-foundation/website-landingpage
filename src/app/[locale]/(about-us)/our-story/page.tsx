'use client';

import { Container, Title, Text, Image, Box, Stack, Group, Card, Divider, Grid, ThemeIcon } from '@mantine/core';
import { IconBook, IconBulb, IconTargetArrow, IconTimeline } from '@tabler/icons-react';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalization } from '@/utils/localization';
import { useBannerStore } from '@/store/useBannerStore';
import { useOurStoryStore } from '@/store/useOurStoryStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import styles from './our-story.module.css';

export default function OurStoryPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { 
    story, 
    loading: storyLoading, 
    error: storyError, 
    fetchStory,
    getLocalizedStory,
    getLocalizedModel,
    getLocalizedVisionMission,
    getLocalizedTimeline
  } = useOurStoryStore();

  useEffect(() => {
    fetchBanners();
    fetchStory();
  }, [fetchBanners, fetchStory]);



  const localizedStory = getLocalizedStory(locale);
  const localizedModel = getLocalizedModel(locale);
  const localizedVisionMission = getLocalizedVisionMission(locale);
  const localizedTimeline = getLocalizedTimeline(locale);

  // Log all data for debugging (move after variable initialization)
  console.log('story:', story);
  console.log('localizedStory:', localizedStory);
  console.log('model:', localizedModel);
  console.log('visionMission:', localizedVisionMission);
  console.log('timeline:', localizedTimeline);

  const banner = getBannerByType('our-story');
  const loading = storyLoading;
  const error = storyError;

  if (loading) return <div>Loading story...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  // Fix: Ensure timeline is always an array with proper typing
  const timelineArray: Array<{
    id: string;
    year: string;
    title: string;
    titleHi?: string;
    centers: number;
    volunteers: number;
    children: number;
  }> = Array.isArray(localizedTimeline)
    ? localizedTimeline
    : Object.values(localizedTimeline ?? {});

  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: locale === 'hi' ? 'हमारी कहानी' : 'Our Story' }
          ]}
        />
      ) : (
        <Banner
          type="our-story"
          title={locale === 'hi' ? 'हमारी कहानी' : 'Our Story'}
          backgroundImage="/banners/our-story-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: locale === 'hi' ? 'हमारी कहानी' : 'Our Story' }
          ]}
        />
      )}

      <Container size="xl" py={{ base: 'md', md: 'xl' }}>
        <Stack gap="xl">
          {/* Story Section */}
          {localizedStory && (
            <div className={styles.section}>
              <Title className={styles.sectionTitle} order={2} mb="xl">
                <ThemeIcon size={32} radius="xl" variant="light" color="blue" className={styles.titleIcon}>
                  <IconBook style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
                {localizedStory.title}
              </Title>
              <Grid gutter={40}>
                <Grid.Col span={{ base: 12, md: 7 }}>
                  <Text size="lg" className={styles.storyText}>
                    <span dangerouslySetInnerHTML={{ __html: localizedStory.content }} />
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 5 }}>
                  {localizedStory.media && localizedStory.media.url && (
                    <div className={styles.mediaWrapper}>
                      <Image
                        src={localizedStory.media.url}
                        alt={localizedStory.media.alt || localizedStory.title}
                        radius="md"
                        className={styles.storyImage}
                      />
                    </div>
                  )}
                </Grid.Col>
              </Grid>
            </div>
          )}

          {/* Model Section */}
          {localizedModel && (
            <div className={styles.section}>
              <Title className={styles.sectionTitle} order={2} mb="xl">
                <ThemeIcon size={32} radius="xl" variant="light" color="blue" className={styles.titleIcon}>
                  <IconTargetArrow style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
                {locale === 'hi' ? 'हमारा मॉडल' : 'Our Model'}
              </Title>
              <Grid gutter={40}>
                <Grid.Col span={{ base: 12, md: 7 }}>
                  <Text size="lg" className={styles.modelText}>
                    <span dangerouslySetInnerHTML={{ __html: localizedModel.description }} />
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 5 }}>
                  {localizedModel.imageUrl && (
                    <div className={styles.mediaWrapper}>
                      <Image
                        src={localizedModel.imageUrl}
                        alt={localizedModel.description}
                        radius="md"
                        className={styles.modelImage}
                      />
                    </div>
                  )}
                </Grid.Col>
              </Grid>
            </div>
          )}

          {/* Vision & Mission Section */}
          {localizedVisionMission && (
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" p={{ base: 'md', md: 'lg' }} withBorder className={styles.visionCard}>
                  <Group justify="center" mb="sm">
                    <ThemeIcon size={36} radius="xl" color="orange">
                      <IconBulb />
                    </ThemeIcon>
                    <Title order={3} mb={0}>
                      {locale === 'hi' ? 'दृष्टि' : 'Vision'}
                    </Title>
                  </Group>
                  <Text size="md" mb="md">
                    <span dangerouslySetInnerHTML={{ __html: localizedVisionMission.vision }} />
                  </Text>
                  {localizedVisionMission.visionIcon && (
                    <Image src={localizedVisionMission.visionIcon} alt="Vision Icon" radius="md" my="md" fit="contain" maw={100} mx="auto" />
                  )}
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" p={{ base: 'md', md: 'lg' }} withBorder className={styles.missionCard}>
                  <Group justify="center" mb="sm">
                    <ThemeIcon size={36} radius="xl" color="green">
                      <IconBulb />
                    </ThemeIcon>
                    <Title order={3} mb={0}>
                      {locale === 'hi' ? 'मिशन' : 'Mission'}
                    </Title>
                  </Group>
                  <Text size="md" mb="md">
                    <span dangerouslySetInnerHTML={{ __html: localizedVisionMission.mission }} />
                  </Text>
                  {localizedVisionMission.missionIcon && (
                    <Image src={localizedVisionMission.missionIcon} alt="Mission Icon" radius="md" my="md" fit="contain" maw={100} mx="auto" />
                  )}
                </Card>
              </Grid.Col>
            </Grid>
          )}

          {/* Timeline Section */}
          {timelineArray.length > 0 && (
            <>
              <Divider my={{ base: 'md', md: 'xl' }} />
              <Group justify="center" mb="md">
                <ThemeIcon size={40} radius="xl" color="blue">
                  <IconTimeline />
                </ThemeIcon>
                <Title order={3} mt="xl" ta="center" className={styles.timelineTitle}>
                  {locale === 'hi' ? 'हमारी यात्रा' : 'Our Journey'}
                </Title>
              </Group>
              <div className={styles.timelineContainer}>
                <div className={styles.timeline}>
                  {timelineArray.map((item) => (
                    <div key={item.id} style={{ position: 'relative', marginBottom: '3rem', width: '100%' }}>
                      <div className={styles.timelineBullet}>
                        <span>{item.year}</span>
                      </div>
                      <div className={styles.timelineCard}>
                        <div className={styles.timelineCardTitle}>
                          {locale === 'hi' && item.titleHi ? item.titleHi : item.title}
                        </div>
                        <div className={styles.timelineCardContent}>
                          <span>
                            {locale === 'hi' ? 'केंद्र:' : 'Centers:'} {item.centers}
                          </span>
                          <span>
                            {locale === 'hi' ? 'स्वयंसेवक:' : 'Volunteers:'} {item.volunteers}
                          </span>
                          <span>
                            {locale === 'hi' ? 'बच्चे:' : 'Children:'} {item.children}
                          </span>
                        </div>
                        <div className={styles.timelineYear}>{item.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Stack>
      </Container>
    </main>
  );
}
