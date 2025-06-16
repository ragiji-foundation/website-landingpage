'use client';
import { useEffect, useState } from 'react';
import { Container, Title, Text, Card, Image, Grid, Stack, Group, Button, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { IconCalendar, IconExternalLink } from '@tabler/icons-react';
import { useBannerStore } from '@/store/useBannerStore';
import classes from './news-coverage.module.css';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  date: string;
  imageUrl: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

const mockData: NewsItem[] = [
  {
    id: 1,
    title: 'Rural Education Initiative Makes Waves',
    description: 'Our education program reaches 5000+ children in remote villages of Madhya Pradesh...',
    source: 'Dainik Bhaskar',
    date: '2024-01-15',
    imageUrl: '/news/education-initiative.jpg',
    link: 'https://example.com/article1',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    title: 'Skill Development Center Inaugurated',
    description: 'New vocational training center opens doors for rural youth employment opportunities...',
    source: 'The Pioneer',
    date: '2024-01-10',
    imageUrl: '/news/skill-center.jpg',
    link: 'https://example.com/article2',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    title: 'Digital Literacy Program Reaches Milestone',
    description: 'Over 1000 students trained in basic computer skills and internet literacy...',
    source: 'Tech Today',
    date: '2024-01-05',
    imageUrl: '/news/digital-literacy.jpg',
    link: 'https://example.com/article3',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 4,
    title: 'Women Empowerment Initiative Success',
    description: 'Self-help groups enable economic independence for rural women...',
    source: 'India Express',
    date: '2023-12-28',
    imageUrl: '/news/women-empowerment.jpg',
    link: 'https://example.com/article4',
    createdAt: '2023-12-28T00:00:00Z',
    updatedAt: '2023-12-28T00:00:00Z'
  },
  {
    id: 5,
    title: 'Healthcare Camp Serves 2000+ Villagers',
    description: 'Free medical camp provides essential healthcare services...',
    source: 'Health Times',
    date: '2023-12-20',
    imageUrl: '/news/healthcare-camp.jpg',
    link: 'https://example.com/article5',
    createdAt: '2023-12-20T00:00:00Z',
    updatedAt: '2023-12-20T00:00:00Z'
  },
  {
    id: 6,
    title: 'Environmental Conservation Drive',
    description: '5000 trees planted in rural areas to combat climate change...',
    source: 'Green News',
    date: '2023-12-15',
    imageUrl: '/news/tree-plantation.jpg',
    link: 'https://example.com/article6',
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2023-12-15T00:00:00Z'
  },
  {
    id: 7,
    title: 'Rural School Infrastructure Upgrade',
    description: 'Smart classrooms and modern facilities introduced in village schools...',
    source: 'Education Weekly',
    date: '2023-12-10',
    imageUrl: '/news/school-upgrade.jpg',
    link: 'https://example.com/article7',
    createdAt: '2023-12-10T00:00:00Z',
    updatedAt: '2023-12-10T00:00:00Z'
  },
  {
    id: 8,
    title: 'Youth Leadership Workshop',
    description: 'Training program develops future community leaders...',
    source: 'Youth Connect',
    date: '2023-12-05',
    imageUrl: '/news/youth-leadership.jpg',
    link: 'https://example.com/article8',
    createdAt: '2023-12-05T00:00:00Z',
    updatedAt: '2023-12-05T00:00:00Z'
  },
  {
    id: 9,
    title: 'Clean Water Initiative Launch',
    description: 'New project ensures safe drinking water in remote villages...',
    source: 'Rural Times',
    date: '2023-11-28',
    imageUrl: '/news/clean-water.jpg',
    link: 'https://example.com/article9',
    createdAt: '2023-11-28T00:00:00Z',
    updatedAt: '2023-11-28T00:00:00Z'
  },
  {
    id: 10,
    title: 'Agricultural Training Program',
    description: 'Farmers trained in modern farming techniques and organic practices...',
    source: 'Agri News',
    date: '2023-11-20',
    imageUrl: '/news/agriculture.jpg',
    link: 'https://example.com/article10',
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2023-11-20T00:00:00Z'
  },
  {
    id: 11,
    title: 'Mental Health Awareness Campaign',
    description: 'Initiative breaks stigma around mental health in rural communities...',
    source: 'Health Focus',
    date: '2023-11-15',
    imageUrl: '/news/mental-health.jpg',
    link: 'https://example.com/article11',
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2023-11-15T00:00:00Z'
  },
  {
    id: 12,
    title: 'Solar Power Project Success',
    description: 'Renewable energy brings electricity to remote villages...',
    source: 'Energy News',
    date: '2023-11-10',
    imageUrl: '/news/solar-power.jpg',
    link: 'https://example.com/article12',
    createdAt: '2023-11-10T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: 13,
    title: 'Cultural Heritage Festival',
    description: 'Traditional arts and crafts showcase draws thousands...',
    source: 'Culture Weekly',
    date: '2023-11-05',
    imageUrl: '/news/heritage-festival.jpg',
    link: 'https://example.com/article13',
    createdAt: '2023-11-05T00:00:00Z',
    updatedAt: '2023-11-05T00:00:00Z'
  },
  {
    id: 14,
    title: 'Mobile Library Initiative',
    description: 'Bringing books and learning resources to remote communities...',
    source: 'Education Times',
    date: '2023-10-28',
    imageUrl: '/news/mobile-library.jpg',
    link: 'https://example.com/article14',
    createdAt: '2023-10-28T00:00:00Z',
    updatedAt: '2023-10-28T00:00:00Z'
  },
  {
    id: 15,
    title: 'Community Health Workers Training',
    description: 'Local healthcare volunteers equipped with essential skills...',
    source: 'Health Daily',
    date: '2023-10-20',
    imageUrl: '/news/health-workers.jpg',
    link: 'https://example.com/article15',
    createdAt: '2023-10-20T00:00:00Z',
    updatedAt: '2023-10-20T00:00:00Z'
  },
  {
    id: 16,
    title: 'Rural Sports Tournament',
    description: 'Annual sports event promotes youth engagement and fitness...',
    source: 'Sports News',
    date: '2023-10-15',
    imageUrl: '/news/rural-sports.jpg',
    link: 'https://example.com/article16',
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z'
  }
];

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin.ragijifoundation.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export default function NewsCoveragePage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchBanners, getBannerByType } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const fetchWithRetry = async (retries: number): Promise<NewsItem[]> => {
    try {
      const response = await fetch(`${API_URL}/api/news-coverage`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // Sort by date descending
      return data.sort((a: NewsItem, b: NewsItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(retries - 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await fetchWithRetry(MAX_RETRIES);
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news coverage. Using fallback data.');
        setNewsItems(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const banner = getBannerByType('newscoverage');
  const fallbackBanner = {
    title: "News Coverage",
    description: "Media coverage of our initiatives and impact",
    backgroundImage: "/banners/news-banner.jpg"
  };

  return (
    <main>
      <Banner
        title={banner?.title || fallbackBanner.title}
        description={banner?.description || fallbackBanner.description}
        backgroundImage={banner?.backgroundImage || fallbackBanner.backgroundImage}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'News Coverage' }
        ]}
        type={'newscoverage'}
      />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          {error && (
            <Text c="red" size="sm" ta="center">
              {error}
            </Text>
          )}
          <Title order={2}>Latest News Coverage</Title>

          {loading ? (
            <Grid>
              {[...Array(4)].map((_, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                  <Card padding="lg" radius="md" withBorder>
                    <Skeleton height={200} mb="md" />
                    <Skeleton height={20} width="70%" mb="sm" />
                    <Skeleton height={60} mb="md" />
                    <Group justify="space-between">
                      <Skeleton height={20} width={100} />
                      <Skeleton height={20} width={100} />
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Grid>
              {newsItems.map((item) => (
                <Grid.Col key={item.id} span={{ base: 12, md: 6 }}>
                  <Card
                    padding="lg"
                    radius="md"
                    withBorder
                    className={classes.card}
                  >
                    <Card.Section>
                      <Image
                        src={item.imageUrl}
                        height={200}
                        alt={item.title}
                        fallbackSrc="/placeholders/news-placeholder.jpg"
                      />
                    </Card.Section>

                    <Stack mt="md" gap="sm">
                      <Text fw={500} size="lg" lineClamp={2} className={classes.title}>
                        {item.title}
                      </Text>

                      <Text size="sm" c="dimmed" lineClamp={3}>
                        {item.description}
                      </Text>

                      <Group justify="space-between" mt="md">
                        <Group gap="xs">
                          <IconCalendar size={16} />
                          <Text size="sm" c="dimmed">
                            {new Date(item.date).toLocaleDateString()}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {item.source}
                        </Text>
                      </Group>

                      <Button
                        component="a"
                        href={item.link}
                        target="_blank"
                        variant="light"
                        color="blue"
                        fullWidth
                        mt="md"
                        rightSection={<IconExternalLink size={14} />}
                      >
                        Read Article
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </main>
  );
}
