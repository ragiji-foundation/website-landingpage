'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Title, SimpleGrid, Card, Image, Text, Button, Badge, Group, ActionIcon } from '@mantine/core';
import { IconExternalLink, IconCalendar, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './news-coverage.module.css';

interface NewsItem {
  id: number;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  publishedDate: string;
  category: string;
  categoryHi?: string;
  views?: number;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function NewsCoverageSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        // Fallback data matching API schema structure
        const fallbackNews: NewsItem[] = [
          {
            id: 1,
            title: 'Ragiji Foundation Launches New Education Initiative',
            titleHi: 'रागीजी फाउंडेशन ने नई शिक्षा पहल शुरू की',
            description: 'A groundbreaking program to provide quality education to underprivileged children.',
            descriptionHi: 'वंचित बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करने के लिए एक अभूतपूर्व कार्यक्रम।',
            imageUrl: '/images/placeholder.svg',
            sourceUrl: 'https://example.com/news1',
            sourceName: 'Times of India',
            publishedDate: '2024-01-15',
            category: 'Education',
            categoryHi: 'शिक्षा',
            views: 1250,
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Community Health Drive Reaches 1000+ Families',
            titleHi: 'सामुदायिक स्वास्थ्य अभियान 1000+ परिवारों तक पहुंचा',
            description: 'Mobile health units provide healthcare services to remote villages.',
            descriptionHi: 'मोबाइल स्वास्थ्य इकाइयां दूरदराज के गांवों में स्वास्थ्य सेवाएं प्रदान करती हैं।',
            imageUrl: '/images/placeholder.svg',
            sourceUrl: 'https://example.com/news2',
            sourceName: 'Indian Express',
            publishedDate: '2024-01-10',
            category: 'Healthcare',
            categoryHi: 'स्वास्थ्य सेवा',
            views: 890,
            order: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            title: 'Digital Literacy Program Empowers Rural Women',
            titleHi: 'डिजिटल साक्षरता कार्यक्रम ग्रामीण महिलाओं को सशक्त बनाता है',
            description: 'Technology training helps women entrepreneurs start online businesses.',
            descriptionHi: 'प्रौद्योगिकी प्रशिक्षण महिला उद्यमियों को ऑनलाइन व्यवसाय शुरू करने में मदद करता है।',
            imageUrl: '/images/placeholder.svg',
            sourceUrl: 'https://example.com/news3',
            sourceName: 'Hindustan Times',
            publishedDate: '2024-01-05',
            category: 'Technology',
            categoryHi: 'प्रौद्योगिकी',
            views: 2100,
            order: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 4,
            title: 'Environmental Conservation Project Wins National Award',
            titleHi: 'पर्यावरण संरक्षण परियोजना को राष्ट्रीय पुरस्कार मिला',
            description: 'Tree plantation drive and waste management initiative recognized at national level.',
            descriptionHi: 'वृक्षारोपण अभियान और अपशिष्ट प्रबंधन पहल को राष्ट्रीय स्तर पर मान्यता मिली।',
            imageUrl: '/images/placeholder.svg',
            sourceUrl: 'https://example.com/news4',
            sourceName: 'The Hindu',
            publishedDate: '2023-12-28',
            category: 'Environment',
            categoryHi: 'पर्यावरण',
            views: 1650,
            order: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        // Use the standardized API client pattern
        const newsData = await safeApiCall(
          () => apiClient.get<NewsItem[]>('/news-articles', fallbackNews, { locale: language }),
          fallbackNews,
          'news-coverage'
        );

        // Sort by order field for consistent display
        const sortedNews = newsData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setNewsItems(sortedNews.slice(0, 4)); // Show only first 4 items on homepage
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsItems([]);
        setLoading(false);
      }
    };

    fetchNewsItems();
  }, [language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Display only first 4 items on homepage
  const displayItems = newsItems.slice(0, 4);

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Title 
          className={classes.title}
          ta="center"
          mb="xl"
        >
          {language === 'hi' ? 'समाचार कवरेज' : 'News Coverage'}
        </Title>

        <Text 
          ta="center" 
          className={classes.subtitle}
          mb="xl"
        >
          {language === 'hi' 
            ? 'मीडिया में हमारे काम और प्रभाव की कहानियां' 
            : 'Stories of our work and impact in the media'
          }
        </Text>

        {loading ? (
          <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 4 }} spacing={{ base: 'sm', sm: 'md', lg: 'lg' }}>
            {[...Array(4)].map((_, i) => (
              <Card key={i} className={classes.loadingCard}>
                <div className={classes.loadingImage} />
                <div className={classes.loadingContent}>
                  <div className={classes.loadingLine} />
                  <div className={classes.loadingLine} />
                  <div className={classes.loadingLine} />
                </div>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <>
            <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 4 }} spacing={{ base: 'sm', sm: 'md', lg: 'lg' }}>
              {displayItems.map((item) => (
                <Card
                  key={item.id}
                  shadow="sm"
                  padding="xs"
                  radius="md"
                  className={classes.newsCard}
                  component="a"
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card.Section>
                    <Image
                      src={item.imageUrl || '/images/placeholder.svg'}
                      height={180}
                      alt={language === 'hi' && item.titleHi ? item.titleHi : item.title}
                      className={classes.newsImage}
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="xs" mb="xs">
                    <Badge 
                      color="blue" 
                      variant="light" 
                      size="xs"
                    >
                      {language === 'hi' && item.categoryHi ? item.categoryHi : item.category}
                    </Badge>
                    <Group gap={4}>
                      <IconEye size={10} color="gray" />
                      <Text size="xs" c="dimmed">
                        {item.views}
                      </Text>
                    </Group>
                  </Group>

                  <Text fw={500} size="xs" lineClamp={1} mb="xs">
                    {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                  </Text>

                  <Group justify="space-between" align="center">
                    <Group gap={4} align="center">
                      <IconCalendar size={10} color="gray" />
                      <Text size="xs" c="dimmed">
                        {formatDate(item.publishedDate)}
                      </Text>
                    </Group>
                    
                    <Group gap={4} align="center">
                      <Text size="xs" fw={500} c="blue">
                        {item.sourceName}
                      </Text>
                      <ActionIcon size="sm" variant="subtle" color="blue">
                        <IconExternalLink size={8} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>

            {/* View All Button */}
            <Box mt="xl" ta="center">
              <Button
                component={Link}
                href={`/${language}/news-coverage`}
                variant="outline"
                size="lg"
                rightSection={<IconExternalLink size={16} />}
              >
                {language === 'hi' ? 'सभी समाचार देखें' : 'View All News'}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
