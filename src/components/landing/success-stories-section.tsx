'use client';
import { useEffect, useRef } from 'react';
import { Container, Title, Card, Image, Text, Button, Group, Box, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconArrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessStoriesSkeleton } from '../skeletons/SuccessStoriesSkeleton';
import { useLanguage } from '@/context/LanguageContext';
// Removed RichTextContent import as we'll use dangerouslySetInnerHTML instead
import classes from './success-stories-section.module.css';

export default function SuccessStoriesSection() {
  const { language } = useLanguage();
  const { stories, loading, error, fetchStories } = useSuccessStoriesStore();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Truncate HTML content
  const truncateHTML = (htmlContent: string, maxLength: number) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Get the text content
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    if (textContent.length <= maxLength) {
      return htmlContent;
    }

    let truncated = textContent.substring(0, maxLength);

    // Don't cut words in the middle
    if (truncated.lastIndexOf(' ') > maxLength - 20) {
      truncated = truncated.substring(0, truncated.lastIndexOf(' '));
    }

    return `${truncated}...`;
  };

  return (
    <Box className={classes.wrapper}>
      <Container size="lg" py={{ base: 'xs', sm: 'xl' }} px={{ base: 0, sm: 'md' }}>
        <Box mb={{ base: 10, sm: 30 }}>
          <Title 
            className={classes.sectionTitle} 
            ta="center"
            style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
          >
            {language === 'hi' ? 'सफलता की कहानियां' : 'Success Stories'}
          </Title>
        </Box>

        <Box className={classes.scrollContainer} ref={scrollRef}>
          {latestStories.filter(story => !!story.slug).map((story) => {
            // Hindi support for title/content
            const displayTitle = language === 'hi' && story.titleHi ? story.titleHi : story.title;
            const displayContent = language === 'hi' && story.contentHi ? story.contentHi : story.content;
            return (
              <Card
                key={story.id}
                shadow="sm"
                padding={0}
                radius="md"
                className={classes.card}
                onClick={() => handleCardClick(story as Story)}
              >
                <div className={classes.cardInner}>
                  {story.imageUrl && (
                    <div className={classes.imageWrapper}>
                      <Card.Section className={classes.imageSection}>
                        <Image
                          src={story.imageUrl}
                          alt={displayTitle}
                          className={classes.image}
                          height={200}
                          width="100%"
                          fit="cover"
                        />
                        <div className={classes.overlay} />
                      </Card.Section>
                    </div>
                  )}

                  <div className={classes.cardContent}>
                    <div className={classes.contentWrapper}>
                      <Title order={3} className={classes.title} style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}>{displayTitle}</Title>
                      <div
                        className={classes.content}
                        style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                        dangerouslySetInnerHTML={{
                          __html: truncateHTML(displayContent, typeof window !== 'undefined' && window.innerWidth <= 768 ? 80 : 120)
                        }}
                      />
                    </div>

                    <div className={classes.footer}>
                      <Text size="sm" c="dimmed">
                        {formatDate(story.createdAt)}
                      </Text>
                      <Button
                        variant="subtle"
                        color="blue"
                        size="sm"
                        rightSection={<IconArrowRight size={14} />}
                        style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
                      >
                        {language === 'hi' ? 'और पढ़ें' : 'Read More'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </Box>

        {/* View All Button at the bottom */}
        <Group justify="center" mt={{ base: 'md', sm: 'xl' }}>
          <Button
            component={Link}
            href={`/${language}/success-stories`}
            variant="outline"
            rightSection={<IconArrowNarrowRight size={16} />}
            className={classes.viewAllButton}
            size="sm"
            style={{ fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit' }}
          >
            {language === 'hi' ? 'सभी कहानियां देखें' : 'View All Stories'}
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
