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
  Alert
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

      <Container size="lg" py="xl">
        {/* Show error banner if API had an error but we're using cached data */}
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

        {/* Featured Stories Section */}
        {featuredStories.length > 0 && (
          <>
            <Title order={2} mb="lg" className={classes.sectionTitle}>Featured Stories</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} mb="xl">
              {featuredStories.map(story => (
                <Card
                  key={story.id}
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className={classes.featuredCard}
                  onClick={() => handleCardClick(story.id)}
                >
                  <Card.Section>
                    <Image
                      src={story.imageUrl}
                      height={160}
                      alt={story.title}
                    />
                  </Card.Section>
                  <Badge color="blue" mt="md">Featured</Badge>
                  <Title order={3} mt="sm">{story.title}</Title>
                </Card>
              ))}
            </SimpleGrid>
            <Divider my="xl" />
          </>
        )}

        {/* Search and Filter Section */}
        <Group justify="apart" mb="lg">
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

            <Tabs value={viewMode} onChange={(value) => setViewMode(value || 'grid')}>
              <Tabs.List>
                <Tabs.Tab value="grid" leftSection={<IconGridDots size={16} />} />
                <Tabs.Tab value="list" leftSection={<IconList size={16} />} />
              </Tabs.List>
            </Tabs>
          </Group>
        </Group>

        {/* View Mode Selection */}
        <Box pos="relative">
          {filteredStories.length === 0 && !loading ? (
            <Text ta="center" c="dimmed" py="xl">
              {searchTerm
                ? 'No stories found for your search criteria.'
                : 'No stories available at the moment.'}
            </Text>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <Grid gutter="lg">
                  {paginatedStories.map(story => (
                    <Grid.Col key={story.id} span={{ base: 12, sm: 6, md: 4 }}>
                      <Card
                        shadow="sm"
                        padding={0}
                        radius="md"
                        className={classes.card}
                        onClick={() => handleCardClick(story.id)}
                      >
                        {story.imageUrl && (
                          <Card.Section>
                            <Image
                              src={story.imageUrl}
                              height={180}
                              alt={story.title}
                            />
                          </Card.Section>
                        )}

                        <div className={classes.cardContent}>
                          <Title order={3} size="h4" mb="xs">{story.title}</Title>

                          <RichTextContent
                            content={story.content}
                            truncate
                            maxLength={120}
                          />

                          <Button
                            variant="light"
                            color="blue"
                            fullWidth
                            mt="md"
                          >
                            Read Story
                          </Button>
                        </div>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className={classes.listContainer}>
                  {paginatedStories.map(story => (
                    <Card
                      key={story.id}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      className={classes.listCard}
                      onClick={() => handleCardClick(story.id)}
                    >
                      <Group justify="apart" align="flex-start">
                        {story.imageUrl && (
                          <Image
                            src={story.imageUrl}
                            width={180}
                            height={120}
                            alt={story.title}
                            className={classes.listImage}
                          />
                        )}
                        <div className={classes.listContent}>
                          <Title order={3} size="h4">{story.title}</Title>
                          <RichTextContent
                            content={story.content}
                            truncate
                            maxLength={180}
                          />
                        </div>
                        <Button variant="subtle" color="blue">
                          Read More
                        </Button>
                      </Group>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Group justify="center" mt="xl">
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                  />
                </Group>
              )}
            </>
          )}
        </Box>
      </Container>
    </main>
  );
}