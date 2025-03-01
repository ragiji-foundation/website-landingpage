"use client";
import { useEffect } from "react";
import { Container, Grid, Title, Paper, Box, Skeleton, Alert } from "@mantine/core";
import DOMPurify from 'dompurify';
import styles from './our-story.module.css';
import { useOurStoryStore } from '@/store/our-story';
import type { MediaItem } from '@/store/our-story';

function MediaGallerySkeleton() {
  return (
    <div className={styles.mediaGallery}>
      {[1, 2].map((index) => (
        <Skeleton key={index} height={250} radius="md" />
      ))}
    </div>
  );
}

function ContentSkeleton() {
  return (
    <>
      <Skeleton height={40} width="70%" mb="xl" />
      {[1, 2, 3].map((index) => (
        <Skeleton key={index} height={20} mb="sm" />
      ))}
      <Skeleton height={100} mb="xl" />
      {[1, 2].map((index) => (
        <Skeleton key={index} height={20} mb="sm" />
      ))}
    </>
  );
}

function MediaGallery({ media }: { media: MediaItem[] }) {
  return (
    <div className={styles.mediaGallery}>
      {media.map((item, index) => (
        <Paper key={index} shadow="md" radius="md" className={styles.mediaItem}>
          {item.type === "image" ? (
            <figure>
              <img
                src={item.url}
                alt={item.title || 'Story media'}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/fallback-image.jpg';
                }}
              />
              {item.title && <figcaption className={styles.imageCaption}>{item.title}</figcaption>}
            </figure>
          ) : (
            <div className={styles.videoContainer}>
              <iframe
                src={item.url}
                title={item.title || "Video content"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {item.title && <div className={styles.videoCaption}>{item.title}</div>}
            </div>
          )}
        </Paper>
      ))}
    </div>
  );
}

export default function OurStory() {
  const { data, loading, error, fetchStory } = useOurStoryStore();

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  if (loading || !data) {
    return (
      <Container size="xl" py="xl">
        <div className={styles.timelineContainer}>
          <Skeleton height={40} width={200} mb="xl" />
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <MediaGallerySkeleton />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <ContentSkeleton />
            </Grid.Col>
          </Grid>
        </div>
      </Container>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(data.content, {
    ADD_TAGS: ['article'],
    ADD_ATTR: ['class'],
  });

  return (
    <Container size="xl" py="xl">
      <div className={styles.timelineContainer}>
        <h2 className={styles.timelineTitle}>★ {data.title}</h2>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <MediaGallery media={data.media} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}