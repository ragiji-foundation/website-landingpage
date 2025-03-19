'use client';
import { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Image, Text, ActionIcon, Group } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import classes from './electronic-media.module.css';

interface MediaItem {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnail: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function ElectronicMediaSection() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("https://admin.ragijifoundation.com/api/electronic-media");
        const data = await response.json();
        setItems(data.sort((a: MediaItem, b: MediaItem) => a.order - b.order));
      } catch (error) {
        console.error('Error fetching electronic media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className={classes.cardSkeleton}>
            <div className={classes.thumbnailSkeleton} />
            <div className={classes.contentSkeleton} />
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Container size="xl">
      <Title ta="center" className={classes.title}>
        Media Coverage
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((item) => (
          <Card key={item.id} p="md" radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
              <Image
                src={item.thumbnail || `/video-thumbnail.jpg`}
                alt={item.title}
                height={180}
              />
              <ActionIcon
                className={classes.playButton}
                onClick={() => handleVideoClick(item.videoUrl)}
                variant="filled"
                size="xl"
                radius="xl"
              >
                <IconPlayerPlay style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Card.Section>

            <Text fw={500} size="lg" mt="md" lineClamp={2} className={classes.title}>
              {item.title}
            </Text>

            {item.description && (
              <Text c="dimmed" size="sm" mt="sm" lineClamp={3}>
                {item.description}
              </Text>
            )}

            <Group mt="md" justify="space-between">
              <Text size="xs" c="dimmed">
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
