import { Box, Grid, Title, AspectRatio, Image, Text, Overlay, Center, Paper, Container } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import classes from './features-section.module.css';

interface MediaItem {
  type: string;
  url: string;
  thumbnail?: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
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
  ctaButton: {
    text: string;
    url: string;
  };
}

function FeaturesSection({ heading, ctaButton }: FeaturesSectionProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('https://admin.ragijifoundation.com/api/features');
        const data = await response.json();
        setFeatures(data.filter((f: Feature) => f.isPublished));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (!features.length) return <Text>No features available</Text>;

  return (
    <Box className={classes.container}>
      <Title
        order={2}
        ta="center"
        mb={20} // Reduced from 30 to 20
        className={classes.sectionTitle}
        style={{
          fontSize: '4rem',
          fontWeight: 500,
          background: 'linear-gradient(45deg, #FF4B2B, #FF416C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          padding: '0.5rem 0', // Reduced from 1rem to 0.5rem
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}
      >
        {heading}
      </Title>
      {features.map((feature, index) => (
        <Paper key={feature.id} className={classes.featureCard}>
          <Container size="l" style={{
            display: 'flex',
            gap: '6rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {index % 2 === 0 ? (
              <>
                <div className={classes.contentContainer}>
                  <Title order={3} className={classes.featureTitle}>
                    {feature.title}
                  </Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: feature.description }}
                    className={classes.description}
                  />
                </div>
                <div className={classes.mediaContainer}>
                  {feature.mediaItem.type === 'video' ? (
                    <AspectRatio ratio={16 / 9} pos="relative">
                      <Image
                        src={feature.mediaItem.thumbnail || `/api/thumbnail?url=${feature.mediaItem.url}`}
                        alt={feature.title}
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
                      alt={feature.title}
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
                        alt={feature.title}
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
                      alt={feature.title}
                      radius="md"
                      fit="cover"
                    />
                  )}
                </div>
                <div className={classes.contentContainer}>
                  <Title order={3} className={classes.featureTitle}>
                    {feature.title}
                  </Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: feature.description }}
                    className={classes.description}
                  />
                </div>
              </>
            )}
          </Container>
        </Paper>
      ))}
    </Box>
  );
}

export default FeaturesSection;