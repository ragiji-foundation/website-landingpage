'use client';
import { useEffect, useState } from 'react';
import { Container, Grid, Card, Image, Text, Button, Group, Stack, Skeleton, Title, Pagination } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { notifications } from '@mantine/notifications';
import { IconVideo, IconExternalLink } from '@tabler/icons-react';
import { useBannerStore } from '@/store/useBannerStore';
import classes from './electronic-media.module.css';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  source: string;
}

// use api https://admin.ragijifoundation.com/api/electronic-media to fetch media items
// if failed, use mock data


const mockData: MediaItem[] = [
  {
    id: '1',
    title: 'Educational Impact in Rural Areas',
    description: 'Coverage of our educational initiatives in rural Madhya Pradesh',
    thumbnailUrl: 'https://img.youtube.com/vi/sample1/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample1',
    date: '2024-01-15',
    source: 'Local News Channel'
  },
  {
    id: '2',
    title: 'Women Empowerment Initiative Launch',
    description: 'Coverage of our new skill development program for rural women',
    thumbnailUrl: 'https://img.youtube.com/vi/sample2/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample2',
    date: '2024-01-10',
    source: 'DD News'
  },
  {
    id: '3',
    title: 'Digital Literacy Program Success',
    description: 'Impact of our computer education programs in village schools',
    thumbnailUrl: 'https://img.youtube.com/vi/sample3/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample3',
    date: '2023-12-28',
    source: 'Education Today'
  },
  {
    id: '4',
    title: 'Healthcare Camp Coverage',
    description: 'Annual health camp serving over 1000 villagers',
    thumbnailUrl: 'https://img.youtube.com/vi/sample4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample4',
    date: '2023-12-15',
    source: 'Health Network'
  },
  {
    id: '5',
    title: 'Rural Development Project',
    description: 'Infrastructure development initiatives in remote areas',
    thumbnailUrl: 'https://img.youtube.com/vi/sample5/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample5',
    date: '2023-12-01',
    source: 'Rural Focus'
  },
  {
    id: '6',
    title: 'Youth Leadership Program',
    description: 'Training tomorrow\'s leaders in community development',
    thumbnailUrl: 'https://img.youtube.com/vi/sample6/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample6',
    date: '2023-11-20',
    source: 'Youth Channel'
  },
  {
    id: '7',
    title: 'Environmental Awareness Drive',
    description: 'Tree plantation and conservation awareness campaign',
    thumbnailUrl: 'https://img.youtube.com/vi/sample7/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample7',
    date: '2023-11-05',
    source: 'Green News'
  },
  {
    id: '8',
    title: 'Cultural Heritage Preservation',
    description: 'Promoting local arts and cultural traditions',
    thumbnailUrl: 'https://img.youtube.com/vi/sample8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample8',
    date: '2023-10-25',
    source: 'Culture Today'
  },
  {
    id: '9',
    title: 'Skill Development Workshop',
    description: 'Vocational training for rural youth employment',
    thumbnailUrl: 'https://img.youtube.com/vi/sample9/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample9',
    date: '2023-10-10',
    source: 'Skills Network'
  },
  {
    id: '10',
    title: 'Community Health Initiative',
    description: 'Mental health awareness and support programs',
    thumbnailUrl: 'https://img.youtube.com/vi/sample10/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample10',
    date: '2023-09-28',
    source: 'Health Plus'
  },
  {
    id: '11',
    title: 'Education Technology Integration',
    description: 'Smart classroom implementation in rural schools',
    thumbnailUrl: 'https://img.youtube.com/vi/sample11/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=sample11',
    date: '2023-09-15',
    source: 'Tech Education'
  }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.ragijifoundation.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export default function ElectronicMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;

  const { fetchBanners, getBannerByType } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const fetchWithRetry = async (retries: number): Promise<MediaItem[]> => {
    try {
      const response = await fetch(`${API_URL}/electronic-media`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(retries - 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWithRetry(MAX_RETRIES);
        setMediaItems(data);
      } catch (error) {
        console.error('Error fetching media items:', error);
        setError('Failed to fetch media items. Showing cached content.');
        setMediaItems(mockData);
        notifications.show({
          title: 'Connection Error',
          message: 'Using cached data. Some content might not be up to date.',
          color: 'yellow',
          autoClose: 5000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const LoadingSkeleton = () => (
    <Grid>
      {[...Array(4)].map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Skeleton height={200} mb="md" />
            <Skeleton height={20} width="70%" mb="sm" />
            <Skeleton height={60} mb="sm" />
            <Skeleton height={20} width="30%" />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );

  // Calculate pagination
  const totalPages = Math.ceil(mediaItems.length / itemsPerPage);
  const paginatedItems = mediaItems.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const banner = getBannerByType('electronicmedia');
  const fallbackBanner = {
    title: "Electronic Media Coverage",
    description: "News coverage and media appearances highlighting our impact and initiatives",
    backgroundImage: "/banners/media-banner.jpg"
  };

  return (
    <main>
      <Banner
        type="electronicmedia"
        title={banner?.title || fallbackBanner.title}
        description={banner?.description || fallbackBanner.description}
        backgroundImage={banner?.backgroundImage || fallbackBanner.backgroundImage}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Media', link: '/electronic-media' },
          { label: 'Electronic Media' }
        ]}
      />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title order={2} size="h1" ta="center" mb="xl">
            Media Appearances
          </Title>

          {error && (
            <Text c="red" size="sm" ta="center">
              {error}
            </Text>
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <Grid>
                {paginatedItems.map((item) => (
                  <Grid.Col key={item.id} span={{ base: 12, md: 6 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
                      <Card.Section>
                        <div className={classes.imageWrapper}>
                          <Image
                            src={item.thumbnailUrl}
                            height={200}
                            alt={item.title}
                            fallbackSrc="/placeholders/video-thumbnail.jpg"
                          />
                          <IconVideo className={classes.playIcon} />
                        </div>
                      </Card.Section>

                      <Stack mt="md" gap="sm">
                        <Text fw={500} size="lg" lineClamp={2}>
                          {item.title}
                        </Text>
                        <Text size="sm" c="dimmed" lineClamp={3}>
                          {item.description}
                        </Text>
                        <Group justify="space-between" mt="md">
                          <Text size="sm" c="dimmed">
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {item.source}
                          </Text>
                        </Group>
                        <Button
                          component="a"
                          href={item.videoUrl}
                          target="_blank"
                          variant="light"
                          color="blue"
                          fullWidth
                          mt="md"
                          radius="md"
                          rightSection={<IconExternalLink size={14} />}
                        >
                          Watch Video
                        </Button>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Group justify="center" mt="xl">
                  <Pagination
                    value={activePage}
                    onChange={setActivePage}
                    total={totalPages}
                    color="orange"
                    radius="md"
                    withEdges
                  />
                </Group>
              )}
            </>
          )}
        </Stack>
      </Container>
    </main>
  );
}
