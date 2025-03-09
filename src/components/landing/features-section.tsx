"use client"

import { useState, useEffect } from "react";
import { Container, Title, Button, Modal, AspectRatio, Loader, Group, Box, Skeleton, Alert, SimpleGrid, Card, Text, Stack } from "@mantine/core";
import { IconPlayerPlay, IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RichTextContent } from '@/components/RichTextContent';
import { useFeaturesStore } from '@/store/useFeaturesStore';
import classes from './features-section.module.css';
import { getYoutubeId } from '@/utils/media';

interface FeaturesSectionProps {
  heading?: string;
  ctaButton?: {
    text: string;
    url: string;
  };
  maxFeatures?: number;
  category?: string;
}

export default function FeaturesSection({
  heading = "RAGIJI FOUNDATION",
  ctaButton = { text: "Explore All Initiatives", url: "/initiatives" },
  maxFeatures = 4,
  category
}: FeaturesSectionProps) {
  const { features, loading, error, fetchFeatures } = useFeaturesStore();
  const [selectedMedia, setSelectedMedia] = useState<{ type: string, url: string } | null>(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const router = useRouter();

  // Fetch features on component mount
  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  // Function to extract YouTube video ID
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+))([^\/&\?]{10,12})/);
    return match?.[1] || '';
  };

  // Function to get embed URL for videos
  const getEmbedUrl = (url: string) => {
    const videoId = getYoutubeId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  // Handle media click to open modal
  const handleMediaClick = (item: { type: string, url: string }) => {
    setSelectedMedia(item);
    setMediaLoading(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setSelectedMedia(null);
    setMediaLoading(false);
  };

  // Filter features by category if specified
  const filteredFeatures = category
    ? features.filter(feature => feature.category === category)
    : features;

  // Limit to specified number of features
  const displayFeatures = filteredFeatures.slice(0, maxFeatures);

  // Show loading skeleton
  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Skeleton height={40} width="30%" mx="auto" mb="xl" />

        <div className={classes.featuresGrid}>
          {[...Array(maxFeatures)].map((_, i) => (
            <div key={i} className={classes.featureCard}>
              <Skeleton height={225} width="100%" />
              <div className={classes.contentContainer}>
                <Skeleton height={30} width="70%" mb="md" />
                <Skeleton height={60} width="90%" mb="md" />
                <Skeleton height={36} width={120} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  // Show error state
  if (error && displayFeatures.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="xl">{heading}</Title>
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Failed to load features"
          color="red"
          mb="xl"
        >
          {error.message || "An error occurred while loading features. Please try again later."}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">{heading}</Title>

      {/* Show warning if using fallback data */}
      {error && displayFeatures.length > 0 && (
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Note"
          color="yellow"
          mb="lg"
          withCloseButton
        >
          We're experiencing some issues connecting to our servers. Some content might be limited or outdated.
        </Alert>
      )}

      {displayFeatures.length === 0 ? (
        <Box ta="center" mt="xl">No features available</Box>
      ) : (
        <div className={classes.featuresGrid}>
          {displayFeatures.map((feature) => (
            <div key={feature.id} className={classes.featureCard}>
              {/* Media Section */}
              <div
                className={classes.mediaContainer}
                onClick={() => handleMediaClick(feature.mediaItem)}
              >
                {feature.mediaItem.type === 'video' ? (
                  <div className={classes.videoThumbnail}>
                    <Image
                      src={feature.mediaItem.thumbnail || `https://img.youtube.com/vi/${getYoutubeId(feature.mediaItem.url)}/hqdefault.jpg`}
                      alt={feature.title}
                      width={300}
                      height={200}
                    />
                    <div className={classes.playButton}>
                      <IconPlayerPlay />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={feature.mediaItem.url}
                    alt={feature.title}
                    width={300}
                    height={200}
                  />
                )}
              </div>

              {/* Content Section */}
              <div className={classes.contentContainer}>
                <Title order={3} className={classes.featureTitle}>{feature.title}</Title>

                <RichTextContent
                  content={feature.description}
                  truncate={true}
                  maxLength={120}
                />

                {feature.slug && (
                  <Button
                    variant="subtle"
                    onClick={() => router.push(`/initiatives/${feature.slug}`)}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Learn More
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {displayFeatures.length > 0 && filteredFeatures.length > maxFeatures && (
        <Group justify="center" mt="xl">
          <Button
            component="a"
            href={ctaButton.url}
            size="lg"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            {ctaButton.text}
          </Button>
        </Group>
      )}

      {/* Media Modal */}
      <Modal
        opened={!!selectedMedia}
        onClose={handleModalClose}
        size="xl"
        padding={0}
        centered
      >
        {mediaLoading && (
          <Box ta="center" py="xl">
            <Loader size="lg" />
          </Box>
        )}

        {selectedMedia?.type === 'video' ? (
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={getEmbedUrl(selectedMedia.url)}
              title="Video content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setMediaLoading(false)}
              style={{ opacity: mediaLoading ? 0 : 1 }}
            />
          </AspectRatio>
        ) : selectedMedia && (
          <Image
            src={selectedMedia.url || ''}
            alt="Feature"
            width={1200}
            height={675}
            onLoad={() => setMediaLoading(false)}
            style={{
              opacity: mediaLoading ? 0 : 1,
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        )}
      </Modal>
    </Container>
  );
}