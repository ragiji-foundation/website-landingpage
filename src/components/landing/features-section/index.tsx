import { Box, Title, AspectRatio, Image, Text, Overlay, Center, Paper, Button } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import classes from './features-section.module.css';

interface MediaItem {
  type: string;
  url: string;
  thumbnail?: string;
}

interface Feature {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  slug: string;
  category: string;
  order: number;
  mediaItem: MediaItem;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface FeaturesSectionProps {
  heading: string;
  subheading?: string;
  description?: string;
  ctaButton: {
    text: string;
    url: string;
    variant?: 'filled' | 'outline' | 'gradient';
    gradient?: { from: string; to: string };
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    leftIcon?: string;
    className?: string;
  };
  sectionStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
}

import { apiClient, safeApiCall } from '@/utils/api-client';

function FeaturesSection({ heading, ctaButton }: FeaturesSectionProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      
      const fallbackFeatures: Feature[] = [
        {
          id: '1',
          title: 'Quality Education',
          titleHi: 'गुणवत्तापूर्ण शिक्षा',
          description: 'Providing quality education to all children.',
          descriptionHi: 'सभी बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना।',
          slug: 'quality-education',
          category: 'education',
          order: 1,
          mediaItem: {
            type: 'image' as const,
            url: '/images/education-feature.jpg',
            thumbnail: '/images/education-feature-thumb.jpg'
          },
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const featuresData = await safeApiCall(
        () => apiClient.get<Feature[]>('/features', fallbackFeatures, { locale: language }),
        fallbackFeatures,
        'features'
      );

      setFeatures(featuresData.filter((f: Feature) => f.isPublished));
      setLoading(false);
    };

    fetchFeatures();
  }, [language]);

  const renderFeatureContent = (feature: Feature, index: number) => {
    const title = language === 'hi' && feature.titleHi ? feature.titleHi : feature.title;
    const description = language === 'hi' && feature.descriptionHi ? feature.descriptionHi : feature.description;
    const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';

    // Desktop Layout - Alternating left/right
    const DesktopLayout = () => (
      <div className={classes.desktopLayout}>
        {index % 2 === 0 ? (
          <>
            <div className={classes.contentContainer}>
              <Title order={3} className={classes.featureTitle} style={{ fontFamily }}>{title}</Title>
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className={classes.description}
                style={{ fontFamily }}
              />
              <Button 
                variant="light" 
                size="sm" 
                radius="md"
                className={classes.learnMoreButton}
                style={{ fontFamily, marginTop: '1rem' }}
              >
                {language === 'hi' ? 'और पढ़ें' : 'Learn More'}
              </Button>
            </div>
            <div className={classes.mediaContainer}>
              {feature.mediaItem.type === 'video' ? (
                <AspectRatio ratio={16 / 9} pos="relative">
                  <Image
                    src={feature.mediaItem.thumbnail || `/api/thumbnail?url=${feature.mediaItem.url}`}
                    alt={title}
                    radius="md"
                    fit="cover"
                  />
                  <Overlay color="gray" opacity={0.2}>
                    <Center h="100%">
                      <a href={feature.mediaItem.url} target="_blank" rel="noopener noreferrer">
                        <div className={classes.playIcon}>
                          <IconPlayerPlay size={48} />
                        </div>
                      </a>
                    </Center>
                  </Overlay>
                </AspectRatio>
              ) : (
                <Image
                  src={feature.mediaItem.url}
                  alt={title}
                  radius="md"
                  fit="cover"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className={classes.mediaContainer}>
              {feature.mediaItem.type === 'video' ? (
                <AspectRatio ratio={16 / 9} pos="relative">
                  <Image
                    src={feature.mediaItem.thumbnail || `/api/thumbnail?url=${feature.mediaItem.url}`}
                    alt={title}
                    radius="md"
                    fit="cover"
                  />
                  <Overlay color="gray" opacity={0.2}>
                    <Center h="100%">
                      <a href={feature.mediaItem.url} target="_blank" rel="noopener noreferrer">
                        <div className={classes.playIcon}>
                          <IconPlayerPlay size={48} />
                        </div>
                      </a>
                    </Center>
                  </Overlay>
                </AspectRatio>
              ) : (
                <Image
                  src={feature.mediaItem.url}
                  alt={title}
                  radius="md"
                  fit="cover"
                />
              )}
            </div>
            <div className={classes.contentContainer}>
              <Title order={3} className={classes.featureTitle} style={{ fontFamily }}>{title}</Title>
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className={classes.description}
                style={{ fontFamily }}
              />
              <Button 
                variant="light" 
                size="sm" 
                radius="md"
                className={classes.learnMoreButton}
                style={{ fontFamily, marginTop: '1rem' }}
              >
                {language === 'hi' ? 'और पढ़ें' : 'Learn More'}
              </Button>
            </div>
          </>
        )}
      </div>
    );

    // Mobile Layout - Card-based
    const MobileLayout = () => (
      <div className={classes.mobileLayout}>
        <div className={classes.mediaSection}>
          {feature.mediaItem.type === 'video' ? (
            <AspectRatio ratio={16 / 9} className={classes.mobileMediaContainer}>
              <Image
                src={feature.mediaItem.thumbnail || `/api/thumbnail?url=${feature.mediaItem.url}`}
                alt={title}
                radius="md"
                fit="cover"
                className={classes.mediaImage}
              />
              <Overlay color="rgba(0, 0, 0, 0.3)" className={classes.videoOverlay}>
                <Center h="100%">
                  <a href={feature.mediaItem.url} target="_blank" rel="noopener noreferrer">
                    <div className={classes.playButton}>
                      <IconPlayerPlay size={32} color="white" />
                    </div>
                  </a>
                </Center>
              </Overlay>
            </AspectRatio>
          ) : (
            <AspectRatio ratio={16 / 9} className={classes.mobileMediaContainer}>
              <Image
                src={feature.mediaItem.url}
                alt={title}
                radius="md"
                fit="cover"
                className={classes.mediaImage}
              />
            </AspectRatio>
          )}
        </div>
        <div className={classes.textContent}>
          <Title 
            order={3} 
            className={classes.featureTitle} 
            style={{ fontFamily }}
            size="h4"
          >
            {title}
          </Title>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={classes.description}
            style={{ fontFamily }}
          />
          <Button 
            variant="light" 
            size="sm" 
            radius="md"
            className={classes.learnMoreButton}
            style={{ fontFamily }}
          >
            {language === 'hi' ? 'और पढ़ें' : 'Learn More'}
          </Button>
        </div>
      </div>
    );

    return (
      <Paper key={feature.id} className={classes.featureCard}>
        <div className={classes.desktopOnly}>
          <DesktopLayout />
        </div>
        <div className={classes.mobileOnly}>
          <MobileLayout />
        </div>
      </Paper>
    );
  };

  if (loading) return <Text ta="center" py="xl">Loading...</Text>;
  if (!features.length) return <Text ta="center" py="xl">No features available</Text>;

  return (
    <Box>
      <Title
        order={2}
        ta="center"
        mb="xl"
        className={classes.sectionTitle}
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #FF4B2B, #FF416C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          padding: '0.5rem 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit',
        }}
      >
        {heading}
      </Title>
      
      <div className={classes.featuresContainer}>
        {features.map((feature, index) => renderFeatureContent(feature, index))}
      </div>
      
      <Center  pt="md">
        <Button
          component="a"
          href={ctaButton.url}
          variant={ctaButton.variant || 'gradient'}
          gradient={ctaButton.gradient || { from: 'orange', to: 'red' }}
          size={ctaButton.size || 'md'}
          radius="md"
          className={ctaButton.className}
          leftSection={ctaButton.leftIcon}
          style={{ 
            fontFamily: language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit',
            fontWeight: 500
          }}
        >
          {ctaButton.text}
        </Button>
      </Center>
    </Box>
  );
}

export default FeaturesSection;