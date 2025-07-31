'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Title, SimpleGrid, Card, Image, Text, Button, Badge, Group, ActionIcon, Overlay } from '@mantine/core';
import { 
  IconPlayerPlay, 
  IconBrandYoutube, 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandX,
  IconExternalLink,
  IconEye,
  IconHeart,
  IconShare
} from '@tabler/icons-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useMediaQuery } from '@mantine/hooks';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './enhanced-electronic-media.module.css';

interface MediaItem {
  id: number;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'video';
  sourceName: string;
  publishedDate: string;
  views?: number;
  likes?: number;
  shares?: number;
  duration?: string;
  embedCode?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

const getMediaIcon = (type: string) => {
  switch (type) {
    case 'youtube':
      return <IconBrandYoutube size={20} color="#FF0000" />;
    case 'facebook':
      return <IconBrandFacebook size={20} color="#1877F2" />;
    case 'instagram':
      return <IconBrandInstagram size={20} color="#E4405F" />;
    case 'twitter':
      return <IconBrandX size={20} color="#000000" />;
    default:
      return <IconPlayerPlay size={20} />;
  }
};

const getMediaTypeBadge = (type: string, language: string) => {
  const labels = {
    youtube: { en: 'YouTube Video', hi: 'यूट्यूब वीडियो' },
    facebook: { en: 'Facebook Post', hi: 'फेसबुक पोस्ट' },
    instagram: { en: 'Instagram Post', hi: 'इंस्टाग्राम पोस्ट' },
    twitter: { en: 'X Post', hi: 'एक्स पोस्ट' },
    video: { en: 'Video', hi: 'वीडियो' }
  };
  
  return labels[type as keyof typeof labels]?.[language as 'en' | 'hi'] || labels.video[language as 'en' | 'hi'];
};

export default function EnhancedElectronicMediaSection() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Use language context for translations
  const { language } = useLanguage();
  
  // Detect mobile screen size
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        // Fallback data matching the API schema structure
        const fallbackMedia: MediaItem[] = [
          {
            id: 1,
            title: 'Ragiji Foundation Impact Video 2024',
            titleHi: 'रागीजी फाउंडेशन प्रभाव वीडियो 2024',
            description: 'A comprehensive overview of our achievements and impact in communities.',
            descriptionHi: 'समुदायों में हमारी उपलब्धियों और प्रभाव का एक व्यापक अवलोकन।',
            mediaUrl: 'https://youtube.com/watch?v=example1',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'youtube',
            sourceName: 'Ragiji Foundation Official',
            publishedDate: '2024-01-15',
            views: 15000,
            likes: 1200,
            shares: 350,
            duration: '3:45',
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Community Health Drive Success Story',
            titleHi: 'सामुदायिक स्वास्थ्य अभियान की सफलता की कहानी',
            description: 'Behind the scenes of our mobile health units reaching remote villages.',
            descriptionHi: 'दूरदराज के गांवों तक पहुंचने वाली हमारी मोबाइल स्वास्थ्य इकाइयों के पीछे की कहानी।',
            mediaUrl: 'https://facebook.com/post/example2',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'facebook',
            sourceName: 'Ragiji Foundation',
            publishedDate: '2024-01-12',
            views: 8500,
            likes: 950,
            shares: 180,
            order: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            title: 'Education Initiative Launch Photos',
            titleHi: 'शिक्षा पहल लॉन्च की तस्वीरें',
            description: 'Photo gallery from the launch of our new digital literacy program.',
            descriptionHi: 'हमारे नए डिजिटल साक्षरता कार्यक्रम के लॉन्च की फोटो गैलरी।',
            mediaUrl: 'https://instagram.com/p/example3',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'instagram',
            sourceName: '@ragijifoundation',
            publishedDate: '2024-01-10',
            views: 5200,
            likes: 780,
            shares: 95,
            order: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 4,
            title: 'Environmental Award Recognition',
            titleHi: 'पर्यावरण पुरस्कार मान्यता',
            description: 'Celebrating our national environmental conservation award.',
            descriptionHi: 'हमारे राष्ट्रीय पर्यावरण संरक्षण पुरस्कार का जश्न मनाते हुए।',
            mediaUrl: 'https://x.com/post/example4',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'twitter',
            sourceName: '@RagijiFoundation',
            publishedDate: '2024-01-08',
            views: 3200,
            likes: 420,
            shares: 85,
            order: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 5,
            title: 'Women Empowerment Workshop Highlights',
            titleHi: 'महिला सशक्तिकरण कार्यशाला मुख्य बातें',
            description: 'Key moments from our rural women digital literacy workshop.',
            descriptionHi: 'हमारी ग्रामीण महिला डिजिटल साक्षरता कार्यशाला के मुख्य क्षण।',
            mediaUrl: 'https://youtube.com/watch?v=example5',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'youtube',
            sourceName: 'Ragiji Foundation Official',
            publishedDate: '2024-01-05',
            views: 9800,
            likes: 1100,
            shares: 220,
            duration: '2:30',
            order: 5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 6,
            title: 'Tree Plantation Drive Live Updates',
            titleHi: 'वृक्षारोपण अभियान लाइव अपडेट',
            description: 'Live coverage of our massive tree plantation initiative.',
            descriptionHi: 'हमारी बड़े पैमाने की वृक्षारोपण पहल का लाइव कवरेज।',
            mediaUrl: 'https://facebook.com/live/example6',
            thumbnailUrl: '/images/placeholder.svg',
            mediaType: 'facebook',
            sourceName: 'Ragiji Foundation',
            publishedDate: '2024-01-03',
            views: 12000,
            likes: 1450,
            shares: 380,
            order: 6,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        // Use the standardized API client pattern
        const mediaData = await safeApiCall(
          () => apiClient.get<MediaItem[]>('/electronic-media', fallbackMedia, { locale: language }),
          fallbackMedia,
          'electronic-media'
        );

        // Sort by order field for consistent display
        const sortedMedia = mediaData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setMediaItems(sortedMedia);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching electronic media:', error);
        // Fallback to hardcoded data on error
        setMediaItems([]);
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, [language]);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Display only first 6 items on homepage
  const displayItems = mediaItems.slice(0, 6);

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Title 
          className={classes.title}
          ta="center"
          mb="xl"
        >
          {language === 'hi' ? 'इलेक्ट्रॉनिक मीडिया' : 'Electronic Media'}
        </Title>

        <Text 
          ta="center" 
          className={classes.subtitle}
          mb="xl"
        >
          {language === 'hi' 
            ? 'सोशल मीडिया और डिजिटल प्लेटफॉर्म पर हमारी उपस्थिति' 
            : 'Our presence across social media and digital platforms'
          }
        </Text>

        {loading ? (
          isMobile ? (
            <div className={classes.horizontalScroll}>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className={`${classes.loadingCard} ${classes.horizontalCard}`}>
                  <div className={classes.loadingThumbnail} />
                  <div className={classes.loadingContent}>
                    <div className={classes.loadingLine} />
                    <div className={classes.loadingLine} />
                    <div className={classes.loadingLine} />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 2, md: 3 }} spacing={{ base: 'sm', sm: 'md', lg: 'lg' }}>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className={classes.loadingCard}>
                  <div className={classes.loadingThumbnail} />
                  <div className={classes.loadingContent}>
                    <div className={classes.loadingLine} />
                    <div className={classes.loadingLine} />
                    <div className={classes.loadingLine} />
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          )
        ) : (
          <>
            {isMobile ? (
              <div className={classes.horizontalScroll}>
                {displayItems.map((item) => (
                  <Card
                    key={item.id}
                    shadow="md"
                    padding="0"
                    radius="md"
                    className={`${classes.mediaCard} ${classes.horizontalCard}`}
                    component="a"
                    href={item.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-type={item.mediaType}
                  >
                  <Card.Section className={classes.thumbnailSection}>
                    <Image
                      src={item.thumbnailUrl || '/images/placeholder.svg'}
                      height={200}
                      alt={language === 'hi' && item.titleHi ? item.titleHi : item.title}
                      className={classes.thumbnail}
                    />
                    <Overlay className={classes.overlay} opacity={0.3} />
                    
                    {/* Play button and media type icon */}
                    <div className={classes.playButton}>
                      {item.mediaType === 'youtube' || item.mediaType === 'video' ? (
                        <ActionIcon size="xl" radius="xl" variant="filled" color="red">
                          <IconPlayerPlay size={24} />
                        </ActionIcon>
                      ) : (
                        <ActionIcon size="lg" radius="xl" variant="filled" color="blue">
                          {getMediaIcon(item.mediaType)}
                        </ActionIcon>
                      )}
                    </div>

                    {/* Duration badge for videos */}
                    {item.duration && (
                      <Badge 
                        className={classes.durationBadge}
                        color="dark"
                        size="sm"
                      >
                        {item.duration}
                      </Badge>
                    )}

                    {/* Media type badge */}
                    <Badge 
                      className={classes.typeBadge}
                      variant="filled"
                      color={
                        item.mediaType === 'youtube' ? 'red' :
                        item.mediaType === 'facebook' ? 'blue' :
                        item.mediaType === 'instagram' ? 'pink' :
                        item.mediaType === 'twitter' ? 'dark' : 'blue'
                      }
                      size="sm"
                      leftSection={getMediaIcon(item.mediaType)}
                    >
                      {getMediaTypeBadge(item.mediaType, language)}
                    </Badge>
                  </Card.Section>

                  <Box p="xs">
                    <Text fw={500} size="xs" lineClamp={1} mb="xs">
                      {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                    </Text>

                    <Group justify="space-between" align="center" mb="xs">
                      <Group gap={4}>
                        <Text size="xs" fw={500} c="blue">
                          {item.sourceName}
                        </Text>
                        <Text size="xs" c="dimmed">
                          • {formatDate(item.publishedDate)}
                        </Text>
                      </Group>
                    </Group>

                    <Group justify="space-between" mt="xs">
                      <Group gap="xs">
                        <Group gap={4}>
                          <IconEye size={14} color="gray" />
                          <Text size="xs" c="dimmed">
                            {item.views ? formatViews(item.views) : '0'}
                          </Text>
                        </Group>
                        {item.likes && (
                          <Group gap={4}>
                            <IconHeart size={14} color="red" />
                            <Text size="xs" c="dimmed">
                              {formatViews(item.likes)}
                            </Text>
                          </Group>
                        )}
                        {item.shares && (
                          <Group gap={4}>
                            <IconShare size={14} color="blue" />
                            <Text size="xs" c="dimmed">
                              {formatViews(item.shares)}
                            </Text>
                          </Group>
                        )}
                      </Group>
                      
                      <ActionIcon size="sm" variant="subtle" color="blue">
                        <IconExternalLink size={12} />
                      </ActionIcon>
                    </Group>
                  </Box>
                </Card>
              ))}
            </div>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 2, md: 3 }} spacing={{ base: 'sm', sm: 'md', lg: 'lg' }}>
              {displayItems.map((item) => (
                <Card
                  key={item.id}
                  shadow="md"
                  padding="0"
                  radius="md"
                  className={classes.mediaCard}
                  component="a"
                  href={item.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-type={item.mediaType}
                >
                  <Card.Section className={classes.thumbnailSection}>
                    <Image
                      src={item.thumbnailUrl || '/images/placeholder.svg'}
                      height={200}
                      alt={language === 'hi' && item.titleHi ? item.titleHi : item.title}
                      className={classes.thumbnail}
                    />
                    <Overlay className={classes.overlay} opacity={0.3} />
                    
                    {/* Play button and media type icon */}
                    <div className={classes.playButton}>
                      {item.mediaType === 'youtube' || item.mediaType === 'video' ? (
                        <ActionIcon size="xl" radius="xl" variant="filled" color="red">
                          <IconPlayerPlay size={24} />
                        </ActionIcon>
                      ) : (
                        <ActionIcon size="lg" radius="xl" variant="filled" color="blue">
                          {getMediaIcon(item.mediaType)}
                        </ActionIcon>
                      )}
                    </div>

                    {/* Duration badge for videos */}
                    {item.duration && (
                      <Badge 
                        className={classes.durationBadge}
                        color="dark"
                        size="sm"
                      >
                        {item.duration}
                      </Badge>
                    )}

                    {/* Media type badge */}
                    <Badge 
                      className={classes.typeBadge}
                      variant="filled"
                      color={
                        item.mediaType === 'youtube' ? 'red' :
                        item.mediaType === 'facebook' ? 'blue' :
                        item.mediaType === 'instagram' ? 'pink' :
                        item.mediaType === 'twitter' ? 'dark' : 'blue'
                      }
                      size="sm"
                      leftSection={getMediaIcon(item.mediaType)}
                    >
                      {getMediaTypeBadge(item.mediaType, language)}
                    </Badge>
                  </Card.Section>

                  <Box p="xs">
                    <Text fw={500} size="xs" lineClamp={1} mb="xs">
                      {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                    </Text>

                    <Group justify="space-between" align="center" mb="xs">
                      <Group gap={4}>
                        <Text size="xs" fw={500} c="blue">
                          {item.sourceName}
                        </Text>
                        <Text size="xs" c="dimmed">
                          • {formatDate(item.publishedDate)}
                        </Text>
                      </Group>
                    </Group>

                    <Group justify="space-between" mt="xs">
                      <Group gap="xs">
                        <Group gap={4}>
                          <IconEye size={14} color="gray" />
                          <Text size="xs" c="dimmed">
                            {item.views ? formatViews(item.views) : '0'}
                          </Text>
                        </Group>
                        {item.likes && (
                          <Group gap={4}>
                            <IconHeart size={14} color="red" />
                            <Text size="xs" c="dimmed">
                              {formatViews(item.likes)}
                            </Text>
                          </Group>
                        )}
                        {item.shares && (
                          <Group gap={4}>
                            <IconShare size={14} color="blue" />
                            <Text size="xs" c="dimmed">
                              {formatViews(item.shares)}
                            </Text>
                          </Group>
                        )}
                      </Group>
                      
                      <ActionIcon size="sm" variant="subtle" color="blue">
                        <IconExternalLink size={12} />
                      </ActionIcon>
                    </Group>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </>
        )}

        {/* View All Button */}
        <Box mt="xl" ta="center">
          <Button
            component={Link}
            href={`/${language}/electronic-media`}
            variant="gradient"
            gradient={{ from: 'blue', to: 'purple' }}
            size="lg"
            rightSection={<IconExternalLink size={16} />}
          >
            {language === 'hi' ? 'सभी मीडिया देखें' : 'View All Media'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}