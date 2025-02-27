'use client';
import { useEffect, useState } from 'react';
import { Container, Title, Text, Card, Image, Grid, Stack, Badge, Group, Button, Skeleton } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { IconCalendar, IconExternalLink, IconNews } from '@tabler/icons-react';
import classes from './news-coverage.module.css';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  imageUrl: string;
  articleUrl: string;
  category: 'print' | 'online';
}

const mockData: NewsItem[] = [
  {
    id: '1',
    title: 'Rural Education Initiative Makes Waves',
    description: 'Our education program reaches 5000+ children in remote villages of Madhya Pradesh...',
    source: 'Dainik Bhaskar',
    date: '2024-01-15',
    imageUrl: '/news/education-initiative.jpg',
    articleUrl: 'https://example.com/article1',
    category: 'print'
  },
  {
    id: '2',
    title: 'Skill Development Center Inaugurated',
    description: 'New vocational training center opens doors for rural youth employment opportunities...',
    source: 'The Pioneer',
    date: '2024-01-10',
    imageUrl: '/news/skill-center.jpg',
    articleUrl: 'https://example.com/article2',
    category: 'print'
  },
  {
    id: '3',
    title: 'Digital Literacy Program Reaches Milestone',
    description: 'Over 1000 students trained in basic computer skills and internet literacy...',
    source: 'Tech Today',
    date: '2024-01-05',
    imageUrl: '/news/digital-literacy.jpg',
    articleUrl: 'https://example.com/article3',
    category: 'online'
  },
  {
    id: '4',
    title: 'Women Empowerment Initiative Success',
    description: 'Self-help groups enable economic independence for rural women...',
    source: 'India Express',
    date: '2023-12-28',
    imageUrl: '/news/women-empowerment.jpg',
    articleUrl: 'https://example.com/article4',
    category: 'print'
  },
  {
    id: '5',
    title: 'Healthcare Camp Serves 2000+ Villagers',
    description: 'Free medical camp provides essential healthcare services...',
    source: 'Health Times',
    date: '2023-12-20',
    imageUrl: '/news/healthcare-camp.jpg',
    articleUrl: 'https://example.com/article5',
    category: 'online'
  },
  {
    id: '6',
    title: 'Environmental Conservation Drive',
    description: '5000 trees planted in rural areas to combat climate change...',
    source: 'Green News',
    date: '2023-12-15',
    imageUrl: '/news/tree-plantation.jpg',
    articleUrl: 'https://example.com/article6',
    category: 'print'
  },
  {
    id: '7',
    title: 'Rural School Infrastructure Upgrade',
    description: 'Smart classrooms and modern facilities introduced in village schools...',
    source: 'Education Weekly',
    date: '2023-12-10',
    imageUrl: '/news/school-upgrade.jpg',
    articleUrl: 'https://example.com/article7',
    category: 'online'
  },
  {
    id: '8',
    title: 'Youth Leadership Workshop',
    description: 'Training program develops future community leaders...',
    source: 'Youth Connect',
    date: '2023-12-05',
    imageUrl: '/news/youth-leadership.jpg',
    articleUrl: 'https://example.com/article8',
    category: 'online'
  },
  {
    id: '9',
    title: 'Clean Water Initiative Launch',
    description: 'New project ensures safe drinking water in remote villages...',
    source: 'Rural Times',
    date: '2023-11-28',
    imageUrl: '/news/clean-water.jpg',
    articleUrl: 'https://example.com/article9',
    category: 'print'
  },
  {
    id: '10',
    title: 'Agricultural Training Program',
    description: 'Farmers trained in modern farming techniques and organic practices...',
    source: 'Agri News',
    date: '2023-11-20',
    imageUrl: '/news/agriculture.jpg',
    articleUrl: 'https://example.com/article10',
    category: 'print'
  },
  {
    id: '11',
    title: 'Mental Health Awareness Campaign',
    description: 'Initiative breaks stigma around mental health in rural communities...',
    source: 'Health Focus',
    date: '2023-11-15',
    imageUrl: '/news/mental-health.jpg',
    articleUrl: 'https://example.com/article11',
    category: 'online'
  },
  {
    id: '12',
    title: 'Solar Power Project Success',
    description: 'Renewable energy brings electricity to remote villages...',
    source: 'Energy News',
    date: '2023-11-10',
    imageUrl: '/news/solar-power.jpg',
    articleUrl: 'https://example.com/article12',
    category: 'print'
  },
  {
    id: '13',
    title: 'Cultural Heritage Festival',
    description: 'Traditional arts and crafts showcase draws thousands...',
    source: 'Culture Weekly',
    date: '2023-11-05',
    imageUrl: '/news/heritage-festival.jpg',
    articleUrl: 'https://example.com/article13',
    category: 'online'
  },
  {
    id: '14',
    title: 'Mobile Library Initiative',
    description: 'Bringing books and learning resources to remote communities...',
    source: 'Education Times',
    date: '2023-10-28',
    imageUrl: '/news/mobile-library.jpg',
    articleUrl: 'https://example.com/article14',
    category: 'print'
  },
  {
    id: '15',
    title: 'Community Health Workers Training',
    description: 'Local healthcare volunteers equipped with essential skills...',
    source: 'Health Daily',
    date: '2023-10-20',
    imageUrl: '/news/health-workers.jpg',
    articleUrl: 'https://example.com/article15',
    category: 'online'
  },
  {
    id: '16',
    title: 'Rural Sports Tournament',
    description: 'Annual sports event promotes youth engagement and fitness...',
    source: 'Sports News',
    date: '2023-10-15',
    imageUrl: '/news/rural-sports.jpg',
    articleUrl: 'https://example.com/article16',
    category: 'print'
  }
];

export default function NewsCoveragePage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'print' | 'online'>('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error('Error:', error);
        setNewsItems(mockData); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <main>
      <Banner
        title="News Coverage"
        description="Media coverage of our initiatives and impact"
        backgroundImage="/banners/news-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'News Coverage' }
        ]} type={'newscoverage'} />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Group justify="space-between" align="center">
            <Title order={2}>Latest News Coverage</Title>
            <Group>
              {['all', 'print', 'online'].map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'filled' : 'light'}
                  onClick={() => setActiveCategory(category as typeof activeCategory)}
                  color="blue"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </Group>
          </Group>

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
              {filteredNews.map((item) => (
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
                      <Badge
                        color={item.category === 'print' ? 'blue' : 'green'}
                        variant="light"
                      >
                        {item.category.toUpperCase()}
                      </Badge>

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
                        href={item.articleUrl}
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
