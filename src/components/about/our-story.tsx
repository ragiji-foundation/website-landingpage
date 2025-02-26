"use client";
import { Container, Grid, Title, Paper, Box } from "@mantine/core";
import DOMPurify from 'dompurify';
import styles from './our-story.module.css';

interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

interface StoryData {
  title: string;
  content: string;
  media: MediaItem[];
}

const mockData: StoryData = {
  title: "Our Story",
  content: `
    <article class="story-content">
      <h2>The Beginning of Our Journey</h2>
      <p>UPAY – Under Privileged Advancement by Youth started as a small initiative in 2010. 
         Our journey began with a simple vision: to provide quality education to every underprivileged child.</p>
      
      <h3>Our Mission</h3>
      <p>We believe that <strong>education is the most powerful weapon</strong> which you can use to change the world. 
         Our journey began when a group of young engineers noticed the concerning state of education among underprivileged children.</p>
      
      <ul>
        <li>Started with teaching 5 students in a local park</li>
        <li>Grew to support over 1000+ students across multiple centers</li>
        <li>Expanded our programs to include digital literacy</li>
      </ul>
      
      <h3>Impact & Growth</h3>
      <p>Over the years, we have achieved remarkable milestones:</p>
      <ul>
        <li><em>Educational support to 5000+ children</em></li>
        <li><em>Established 50+ learning centers</em></li>
        <li><em>Trained 1000+ volunteers</em></li>
      </ul>
      
      <blockquote>
        <p>"Education is not preparation for life; education is life itself." - John Dewey</p>
      </blockquote>
      
      <h3>Looking Forward</h3>
      <p>We continue to strive towards our goal of providing quality education to every underprivileged child. 
         With your support, we can make this dream a reality.</p>
    </article>
  `,
  media: [
    {
      type: "image",
      url: "https://via.placeholder.com/600x400",
      title: "Our first center"
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Impact story"
    }
  ]
};

function MediaGallery({ media }: { media: MediaItem[] }) {
  return (
    <div className={styles.mediaGallery}>
      {media.map((item, index) => (
        <Paper key={index} shadow="md" radius="md" className={styles.mediaItem}>
          {item.type === "image" ? (
            <figure>
              <img src={item.url} alt={item.title || 'Story media'} loading="lazy" />
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
  const sanitizedContent = DOMPurify.sanitize(mockData.content, {
    ADD_TAGS: ['article'],
    ADD_ATTR: ['class'],
  });

  return (
    <Container size="xl" py="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <MediaGallery media={mockData.media} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Title order={2} mb="xl" className={styles.title}>
            {mockData.title}
          </Title>
          <Box
            className={styles.richContent}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}