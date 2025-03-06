'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Box,
  Skeleton,
  Alert,
  Group,
  SegmentedControl,
  TextInput,
  Select,
  Tabs,
  Paper,
  Grid,
  Divider,
  ActionIcon,
  Transition
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle, IconSearch, IconFilter, IconArrowUp, IconCategory, IconGridDots } from '@tabler/icons-react';
import { Banner } from '@/components/Banner';
import { PhotoLibrary } from '@/components/Pages/PhotoLibrary';
import { useBanner } from '@/hooks/useBanner';
import { ErrorBoundary } from '@/components/error-boundary';
import classes from './gallery.module.css';

export default function GalleryPage() {
  const { banner, loading: bannerLoading, error: bannerError, fetchBanners } = useBanner('gallery');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // This would come from your PhotoLibrary component or a store
  // Adding mock categories for demonstration
  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'events', label: 'Events' },
    { value: 'projects', label: 'Projects' },
    { value: 'people', label: 'People' },
    { value: 'facilities', label: 'Facilities' }
  ];

  useEffect(() => {
    // Add scroll listener for the back to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state for the entire page
  if (bannerLoading) {
    return (
      <Box>
        <Skeleton height={400} radius={0} />
        <Container size="xl" py="xl">
          <Skeleton height={50} width="30%" mb="xl" />
          <Skeleton height={40} width="80%" mb="lg" />

          <Grid>
            {[...Array(6)].map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Skeleton height={200} radius="md" mb="md" />
                <Skeleton height={20} width="60%" mb="xs" />
                <Skeleton height={15} width="40%" />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  // Error handling with better UI
  if (bannerError || !banner) {
    notifications.show({
      title: 'Error loading banner',
      message: 'Using fallback banner information.',
      color: 'orange',
      autoClose: 5000
    });
  }

  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="gallery"
          title={banner?.title || "Photo Gallery"}
          description={banner?.description || "Explore our journey through images"}
          backgroundImage={banner?.backgroundImage || "/banners/gallery-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Gallery' }
          ]}
        />

        <Container size="xl" py="xl">
          <Title order={2} className={classes.pageTitle} mb="xl">Our Photo Gallery</Title>

          {/* Filters & Controls */}
          <Paper shadow="xs" p="md" mb="xl">
            <Group justify="apart" mb="md" align="flex-end">
              <TextInput
                placeholder="Search photos..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                style={{ width: '50%' }}
              />

              <Group gap="sm">
                <Select
                  placeholder="Sort by"
                  value={sortOption}
                  onChange={(value) => setSortOption(value || 'newest')}
                  data={[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'oldest', label: 'Oldest First' },
                    { value: 'popular', label: 'Most Popular' }
                  ]}
                  leftSection={<IconFilter size={16} />}
                  style={{ width: '150px' }}
                />

                <SegmentedControl
                  value={viewMode}
                  onChange={(value: string) => setViewMode(value as 'grid' | 'masonry')}
                  data={[
                    {
                      value: 'grid',
                      label: (
                        <Group gap={4}>
                          <IconGridDots size={16} />
                          <Box ml={4}>Grid</Box>
                        </Group>
                      ),
                    },
                    {
                      value: 'masonry',
                      label: (
                        <Group gap={4}>
                          <IconCategory size={16} />
                          <Box ml={4}>Masonry</Box>
                        </Group>
                      ),
                    },
                  ]}
                />
              </Group>
            </Group>

            <Divider my="sm" />

            <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'all')}>
              <Tabs.List>
                {categories.map(category => (
                  <Tabs.Tab key={category.value} value={category.value}>
                    {category.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          </Paper>

          {/* Photo Library Component */}
          <PhotoLibrary
            category={activeTab !== 'all' ? activeTab : undefined}
            searchTerm={searchTerm}
            sortBy={sortOption}
            viewMode={viewMode}
          />

          {/* Scroll to Top Button */}
          <Transition transition="slide-up" mounted={showScrollTop}>
            {(transitionStyles) => (
              <ActionIcon
                size="lg"
                radius="xl"
                variant="filled"
                color="blue"
                className={classes.scrollTopButton}
                style={transitionStyles}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
              >
                <IconArrowUp size={16} />
              </ActionIcon>
            )}
          </Transition>
        </Container>
      </main>
    </ErrorBoundary>
  );
}
