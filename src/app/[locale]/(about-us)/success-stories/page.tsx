'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Group,
  Badge,
  Button,
  TextInput,
  Select,
  Box,
  Pagination,
  Tabs,
  LoadingOverlay,
  Divider,
  SimpleGrid,
  Skeleton,
  Alert,
  Paper,
  AspectRatio,
  Center
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconSearch, IconFilter, IconGridDots, IconList, IconArrowUp, IconInfoCircle } from '@tabler/icons-react';
import { useSuccessStoriesStore, SuccessStory } from '@/store/useSuccessStoriesStore';
import { useBanner } from '@/hooks/useBanner';
import { Banner } from '@/components/Banner';
import { RichTextContent } from '@/components/RichTextContent';
import classes from './success-stories.module.css';

export default function SuccessStoriesPage() {
  const { stories, loading: storiesLoading, error: storiesError, fetchStories } = useSuccessStoriesStore();
  const { banner, loading: bannerLoading, error: bannerError } = useBanner('successstories');
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([]); //Added type annotation here
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const router = useRouter();

  const ITEMS_PER_PAGE = 9;
  const loading = storiesLoading || bannerLoading;

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  // Filter and sort stories whenever dependencies change
  useEffect(() => {
    if (!stories.length) return;

    let result = [...stories];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(story =>
        story.title.toLowerCase().includes(term) ||
        story.personName.toLowerCase().includes(term) ||
        story.location.toLowerCase().includes(term) ||
        extractPlainText(story.content).toLowerCase().includes(term)
      );
    }

    // Apply category filter (using location as proxy)
    if (filterCategory !== 'all') {
      result = result.filter(story => story.location.toLowerCase() === filterCategory.toLowerCase());
    }

    // Apply sorting
    result = sortStories(result, sortOption);

    setFilteredStories(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [stories, searchTerm, sortOption, filterCategory]);

  // Helper function to extract plain text from rich text content
  const extractPlainText = (content: any) => { // Added type annotation
    if (typeof content === 'string') return content;

    if (content.type === 'doc' && Array.isArray(content.content)) {
      interface RichTextNode {
        type: string;
        content?: RichTextNode[];
        text?: string;
      }

      const extractPlainText = (content: RichTextNode): string => {
        if (typeof content === 'string') return content;

        if (content.type === 'doc' && Array.isArray(content.content)) {
          return content.content.map(node => {
            if (node.content) {
              return node.content.map(child => (child as RichTextNode).text || '').join(' ');
            }
            return '';
          }).join(' ');
        }

        return '';
      };
    }

    return '';
  };

  // Sort stories based on selected option
  const sortStories = (storiesToSort: SuccessStory[], option: string) => { // Added type annotations
    switch (option) {
      case 'newest':
        return [...storiesToSort].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());//used getTime method as well
      case 'oldest':
        return [...storiesToSort].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); //used getTime method as well
      case 'alphabetical':
        return [...storiesToSort].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return storiesToSort;
    }
  };

  // Get location options for filtering
  const locationOptions = [{ value: 'all', label: 'All Locations' }];
  if (stories.length) {
    const locations = [...new Set(stories.map(s => s.location))];
    locations.forEach(loc => {
      locationOptions.push({
        value: loc.toLowerCase(),
        label: loc
      });
    });
  }

  // Get featured stories for the top section
  const featuredStories = stories.filter(story => story.featured).slice(0, 3);

  // Get paginated stories
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Total pages for pagination
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

  // Handle card click to navigate to the story detail page
  const handleCardClick = (storyId: string) => {  // Added type annotation
    const story = stories.find(s => s.id === storyId);
    if (story) {
      router.push(`/success-stories/${story.slug}`);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="lg" py="xl">
          <Skeleton height={60} width="50%" mx="auto" mb="xl" />

          <Grid>
            {[...Array(6)].map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Card padding="lg" radius="md" withBorder>
                  <Skeleton height={180} mb="md" />
                  <Skeleton height={28} width="80%" mb="sm" />
                  <Skeleton height={60} mb="md" />
                  <Skeleton height={36} />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </main>
    );
  }

  // Error state
  if ((storiesError || bannerError) && !stories.length) {
    return (
      <Container size="md" py="xl">
        <Alert
          icon={<IconInfoCircle />}
          title="Unable to load content"
          color="red"
        >
          {storiesError?.message || bannerError?.message || 'An error occurred. Please try again.'}
        </Alert>
      </Container>
    );
  }

  return (
    <main>
      <Banner
        type="successstories"
        title={banner?.title}
        description={banner?.description}
        backgroundImage={banner?.backgroundImage}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Success Stories' }
        ]}
      />

      {/* Move search and filter section outside the regular container */}
      <Container size="lg" py="xl">
        {/* Error Alert */}
        {(storiesError || bannerError) && (
          <Alert
            icon={<IconInfoCircle />}
            title="Note"
            color="yellow"
            mb="lg"
          >
            We're experiencing some issues connecting to our servers. Some content might be limited or outdated.
          </Alert>
        )}

        {/* Search and Filter Section */}
        <Group justify="apart" mb="xl">
          <TextInput
            placeholder="Search stories..."
            leftSection={<IconSearch size={14} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ width: '40%' }}
          />

          <Group>
            <Select
              placeholder="Filter by location"
              value={filterCategory}
              onChange={(value) => setFilterCategory(value || 'all')}
              data={locationOptions}
              style={{ width: '150px' }}
            />

            <Select
              placeholder="Sort by"
              value={sortOption}
              onChange={(value) => setSortOption(value || 'newest')}
              data={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'alphabetical', label: 'A-Z' }
              ]}
              style={{ width: '150px' }}
            />
          </Group>
        </Group>
      </Container>

      {/* Stories List - No container wrapper needed as cards are full width */}
      <Box pos="relative">
        {filteredStories.length === 0 && !loading ? (
          <Text ta="center" c="dimmed" py="xl">
            {searchTerm
              ? 'No stories found for your search criteria.'
              : 'No stories available at the moment.'}
          </Text>
        ) : (
          <>
            {paginatedStories.map((story, index) => (
              <Paper key={story.id} className={classes.storyCard}>
                <Container size="l" className={classes.storyContainer}>
                  {index % 2 === 0 ? (
                    <>
                      <div className={classes.contentContainer}>
                        <Title order={3} className={classes.storyTitle}>{story.title}</Title>
                        <div
                          className={`${classes.description} ${classes.richText}`}
                          dangerouslySetInnerHTML={{
                            __html: story.content.slice(0, 280) + (story.content.length > 280 ? '...' : '')
                          }}
                        />
                        <Button
                          variant="light"
                          color="blue"
                          onClick={() => handleCardClick(story.id)}
                          mt="md"
                        >
                          Read Story
                        </Button>
                      </div>
                      <div className={classes.mediaContainer}>
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={story.imageUrl}
                            alt={story.title}
                            radius="md"
                            fit="cover"
                          />
                        </AspectRatio>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={classes.mediaContainer}>
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={story.imageUrl}
                            alt={story.title}
                            radius="md"
                            fit="cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className={classes.contentContainer}>
                        <Title order={3} className={classes.storyTitle}>{story.title}</Title>
                        <div
                          className={`${classes.description} ${classes.richText}`}
                          dangerouslySetInnerHTML={{
                            __html: story.content.slice(0, 280) + (story.content.length > 280 ? '...' : '')
                          }}
                        />
                        <Button
                          variant="light"
                          color="blue"
                          onClick={() => handleCardClick(story.id)}
                          mt="md"
                        >
                          Read Story
                        </Button>
                      </div>
                    </>
                  )}
                </Container>
              </Paper>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <Container size="lg" py="xl">
                <Group justify="center">
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                  />
                </Group>
              </Container>
            )}
          </>
        )}
      </Box>
    </main>
  );
}