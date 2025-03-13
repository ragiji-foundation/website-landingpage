'use client';
import { useEffect, useRef } from 'react';
import { Container, Title, Card, Image, Text, Button, Group, Box, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconArrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useSuccessStoriesStore } from '@/store/useSuccessStoriesStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessStoriesSkeleton } from '../skeletons/SuccessStoriesSkeleton';
// Removed RichTextContent import as we'll use dangerouslySetInnerHTML instead
import classes from './success-stories-section.module.css';

export default function SuccessStoriesSection() {
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
      <Container size="lg" py="xl">
        <Box mb={30}>

          <Title className={classes.sectionTitle} ta="center">Success Stories</Title>
        </Box>

        <Group justify="flex-end" mb="lg">
          {/* <Group>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              onClick={scrollLeft}
              className={classes.scrollButton}
            >
              <IconArrowLeft size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              onClick={scrollRight}
              className={classes.scrollButton}
            >
              <IconArrowRight size="1.2rem" />
            </ActionIcon>
          </Group> */}
          <Button
            component={Link}
            href="/success-stories"
            variant="outline"
            rightSection={<IconArrowNarrowRight size={16} />}
            className={classes.viewAllButton}
          >
            View All Stories
          </Button>
        </Group>

        <Box className={classes.scrollContainer} ref={scrollRef}>
          {latestStories.map((story) => (
            <Card
              key={story.id}
              shadow="sm"
              padding={0}
              radius="md"
              className={classes.card}
              onClick={() => handleCardClick(story)}
            >
              <div className={classes.cardInner}>
                {story.imageUrl && (
                  <div className={classes.imageWrapper}>
                    <Card.Section className={classes.imageSection}>
                      <Image
                        src={story.imageUrl}
                        height={200}
                        alt={story.title}
                        className={classes.image}
                      />
                      <div className={classes.overlay} />
                    </Card.Section>
                  </div>
                )}

                <div className={classes.cardContent}>
                  <div className={classes.contentWrapper}>
                    <Title order={3} className={classes.title}>{story.title}</Title>

                    <div
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: truncateHTML(story.content, 120)
                      }}
                    />
                  </div>

                  <div className={classes.footer}>
                    <Text size="sm" className={classes.date}>
                      {formatDate(story.createdAt)}
                    </Text>
                    <Button
                      variant="subtle"
                      color="blue"
                      size="sm"
                      rightSection={<IconArrowRight size={14} />}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
