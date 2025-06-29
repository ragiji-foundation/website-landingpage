'use client';

import React from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, Stack, Grid, Paper, Group, Badge } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useParams } from 'next/navigation';
import { useSuccessStoriesStore, type SuccessStory } from '@/store/useSuccessStoriesStore';
import { useDictionary } from '@/hooks/useDictionary';
import { useBannerStore } from '@/store/useBannerStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import Link from 'next/link';
import { IconQuote } from '@tabler/icons-react';
import classes from './page.module.css';

function FeaturedStory({ story, locale }: { story: SuccessStory; locale: string }) {
  const title = locale === 'hi' && story.titleHi ? story.titleHi : story.title;
  const content = locale === 'hi' && story.contentHi ? story.contentHi : story.content;
  const personName = locale === 'hi' && story.personNameHi ? story.personNameHi : story.personName;
  const location = locale === 'hi' && story.locationHi ? story.locationHi : story.location;

  // Extract first paragraph for summary
  const summary = content.replace(/<[^>]*>/g, ' ').substring(0, 200) + '...';

  return (
    <Paper withBorder radius="md" className={classes.featuredStory}>
      <Grid gutter={0}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div className={classes.featuredImageWrapper}>
            <Image
              src={story.imageUrl}
              height={400}
              alt={title}
              className={classes.featuredImage}
            />
            <div className={classes.featuredOverlay} />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div className={classes.featuredContent}>
            <Badge variant="filled" color="pink" mb="md">Featured Story</Badge>
            <Title order={2} className={classes.featuredTitle}>{title}</Title>
            <Text size="lg" mt="md" className={classes.summary}>
              {summary}
            </Text>
            <Group mt="xl">
              <div>
                <Text fw={500} size="lg">{personName}</Text>
                <Text size="sm" c="dimmed">{location}</Text>
              </div>
            </Group>
            <Link href={`/${locale}/success-stories/${story.slug}`} className={classes.readMore}>
              Read Full Story →
            </Link>
          </div>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

function StoryCard({ story, locale }: { story: SuccessStory; locale: string }) {
  const title = locale === 'hi' && story.titleHi ? story.titleHi : story.title;
  const content = locale === 'hi' && story.contentHi ? story.contentHi : story.content;
  const personName = locale === 'hi' && story.personNameHi ? story.personNameHi : story.personName;
  const location = locale === 'hi' && story.locationHi ? story.locationHi : story.location;

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder className={classes.card}>
      <Card.Section>
        <div className={classes.imageWrapper}>
          <Image
            src={story.imageUrl}
            height={240}
            alt={title}
            className={classes.image}
          />
          <div className={classes.overlay} />
        </div>
      </Card.Section>

      <Stack gap="xs" mt="md">
        <IconQuote size={30} className={classes.quoteIcon} />
        <Title order={3} lineClamp={2} className={classes.title}>
          {title}
        </Title>
        <Text size="sm" lineClamp={3} mt="sm" className={classes.excerpt}>
          {content.replace(/<[^>]*>/g, ' ').substring(0, 150)}...
        </Text>
        <Group mt="md" className={classes.footer}>
          <div>
            <Text fw={500}>{personName}</Text>
            <Text size="sm" c="dimmed">{location}</Text>
          </div>
          <Link href={`/${locale}/success-stories/${story.slug}`} className={classes.readMore}>
            Read More →
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}

export default function SuccessStoriesPage() {
  const params = useParams();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'en';
  
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();
  
  const { dictionary } = useDictionary();
  const t = dictionary?.successstories || {};
  const common = dictionary?.common || {};
  
  React.useEffect(() => {
    fetchBanners();
    fetchStories();
  }, [fetchBanners, fetchStories]);
  
  const banner = getBannerByType('success-stories');    const renderContent = () => {
      if (loading) {
        return <Text ta="center">{common?.loading || 'Loading stories...'}</Text>;
      }
      
      if (error) {
        return (
          <Text ta="center" c="red">
            {common?.errorMessage || 'Error loading content. Please try again later.'}
          </Text>
        );
      }
      
      if (!stories.length) {
        return <Text ta="center">{t?.noStories || 'No success stories available yet.'}</Text>;
      }

      const featuredStories = stories.filter(story => story.featured);
      const otherStories = stories.filter(story => !story.featured);      return (
      <Stack gap={50}>
        {featuredStories.length > 0 && (
          <div>
            <Title order={2} className={classes.sectionTitle}>
              {t?.featuredStories || 'Featured Stories'}
            </Title>
            <SimpleGrid cols={1} spacing="xl">
              {featuredStories.map(story => (
                <FeaturedStory key={story.id} story={story} locale={locale} />
              ))}
            </SimpleGrid>
          </div>
        )}

        <div>
          <Title order={2} className={classes.sectionTitle}>
            {t?.moreStories || 'More Success Stories'}
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {otherStories.map((story) => (
              <StoryCard key={story.id} story={story} locale={locale} />
            ))}
          </SimpleGrid>
        </div>
      </Stack>
    );
  };
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Success Stories' }
          ]}
        />
      ) : (
        <Banner
          type="success-stories"
          title={t?.title || 'Success Stories'}
          backgroundImage="/banners/success-stories-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.title || 'Success Stories' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap={50}>
          <div className={classes.intro}>
            <Title order={1} className={classes.mainTitle}>
              {t?.pageHeading || 'Stories of Impact and Transformation'}
            </Title>
            <Text size="xl" c="dimmed" maw={800} mx="auto" ta="center">
              {t?.pageDescription || 'Discover how our initiatives are changing lives and creating lasting impact in communities across Madhya Pradesh.'}
            </Text>
          </div>
          
          {renderContent()}
        </Stack>
      </Container>
    </main>
  );
}