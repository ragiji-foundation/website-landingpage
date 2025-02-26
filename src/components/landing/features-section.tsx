"use client"

import { useState, useRef } from "react";
import { Container, Title, Text, Stack, Button, Modal, AspectRatio, Loader, Group, Box, Anchor } from "@mantine/core";
import { IconPlayerPlay, IconArrowRight } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import Image from 'next/image';
import styles from './features-section.module.css';

interface MediaItem {
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
}

interface RichTextMark {
  type: 'bold' | 'italic' | 'underline';
}

interface RichTextNode {
  type: string;
  text?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
  level?: number; // Add level property
}

interface RichTextDocument {
  type: 'doc';
  content: RichTextNode[];
}

interface Feature {
  title: string;
  description: string | RichTextDocument;
}

interface ContentItem extends Feature {
  mediaItem: MediaItem;
  slug?: string; // Add slug for URL routing
}

interface FeaturesSectionProps {
  heading: string;
  content: ContentItem[]; // This is required
  ctaButton: {
    text: string;
    url: string;
  };
}

// Add default props
const defaultProps = {
  heading: "Features",
  content: [],
  ctaButton: {
    text: "Get Started",
    url: "#"
  }
};

function RichTextContent({ content }: { content: RichTextNode[] | string | RichTextDocument }) {
  // Handle string content
  if (typeof content === 'string') {
    const sanitizedHtml = DOMPurify.sanitize(content, {
      ADD_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote'],
      ADD_ATTR: ['class', 'style'],
    });
    return <Box className={styles.richContent}>{parse(sanitizedHtml)}</Box>;
  }

  // Handle RichTextDocument
  if ('type' in content && content.type === 'doc') {
    return <RichTextContent content={content.content} />;
  }

  // Handle array of RichTextNodes
  if (Array.isArray(content)) {
    return (
      <Stack gap="md">
        {content.map((node, index) => {
          switch (node.type) {
            case 'paragraph':
              return (
                <Text key={index} className={styles.richParagraph}>
                  {node.content?.map((child, childIndex) => {
                    const text = child.text || '';
                    if (child.marks?.some(mark => mark.type === 'bold')) {
                      return <strong key={childIndex} className={styles.richBold}>{text}</strong>;
                    }
                    if (child.marks?.some(mark => mark.type === 'italic')) {
                      return <em key={childIndex} className={styles.richItalic}>{text}</em>;
                    }
                    return text;
                  })}
                </Text>
              );
            case 'bulletList':
              return (
                <ul key={index} className={styles.richList}>
                  {node.content?.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.richListItem}>
                      {item.content?.[0].text}
                    </li>
                  ))}
                </ul>
              );
            case 'heading':
              const HeadingComponent = node.level === 2 ? 'h2' : 'h3';
              return (
                <Title
                  key={index}
                  order={node.level as 2 | 3}
                  className={node.level === 2 ? styles.richHeading2 : styles.richHeading3}
                >
                  {node.content?.[0].text}
                </Title>
              );
            default:
              return null;
          }
        })}
      </Stack>
    );
  }

  // Fallback for unexpected content
  return <Text>Invalid content format</Text>;
}

function MediaContentPair({ item, onMediaClick }: { item: ContentItem, onMediaClick: (media: MediaItem) => void }) {
  const router = useRouter();

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.slug) {
      router.push(`/stories/${item.slug}`);
    }
  };

  return (
    <div className={styles.mediaContentPair}>
      <div className={styles.mediaItem} onClick={() => onMediaClick(item.mediaItem)}>
        {item.mediaItem.type === 'video' ? (
          <div className={styles.videoThumbnail}>
            <Image
              src={item.mediaItem.thumbnail || `https://img.youtube.com/vi/${getYoutubeId(item.mediaItem.url)}/maxresdefault.jpg`}
              alt="Video thumbnail"
              width={800}
              height={450}
              style={{ objectFit: 'cover' }}
            />
            <IconPlayerPlay className={styles.playIcon} />
          </div>
        ) : (
          <Image
            src={item.mediaItem.url}
            alt="Feature"
            width={800}
            height={450}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div className={styles.content}>
        <Title
          order={3}
          className={styles.contentTitle}
          onClick={handleTitleClick}
          style={{ cursor: 'pointer' }}
        >
          {item.title}
        </Title>
        <RichTextContent content={item.description} />
        <Anchor
          onClick={handleTitleClick}
          className={styles.readMore}
          mt="xl"
        >
          <Group gap={4}>
            <span>Read More</span>
            <IconArrowRight size={16} />
          </Group>
        </Anchor>
      </div>
    </div>
  );
}

export default function FeaturesSection({
  heading = defaultProps.heading,
  content = defaultProps.content,
  ctaButton = defaultProps.ctaButton
}: FeaturesSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
    setLoading(true);
  };

  const handleMediaLoad = () => {
    setLoading(false);
  };

  const handleModalClose = () => {
    setSelectedMedia(null);
    setLoading(false);
    if (videoRef.current) {
      videoRef.current.src = videoRef.current.src; // Reset video
    }
  };

  // Add content validation
  if (!Array.isArray(content) || content.length === 0) {
    return (
      <Container size="xl" py="xl">
        <Title order={2} size="h1" mb="xl" ta="center">
          {heading}
        </Title>
        <Text c="dimmed" ta="center">No content available</Text>
      </Container>
    );
  }

  return (
    <Container
      size="xl"
      py="xl"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Title order={2} size="h1" mb="xl" ta="center">
        {heading}
      </Title>
      <div className={styles.mediaGrid}>
        {content.map((item, index) => (
          <MediaContentPair
            key={index}
            item={item}
            onMediaClick={(media) => {
              setSelectedMedia(media);
              setLoading(true);
            }}
          />
        ))}
      </div>
      <Group justify="center">
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
      <Modal
        opened={!!selectedMedia}
        onClose={handleModalClose}
        size={isMobile ? "100%" : "90%"}
        padding={0}
        className={styles.modalContent}
        centered
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
          inner: {
            padding: '20px',
          },
          content: {
            background: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        <div className={styles.modalInner}>
          {loading && (
            <div className={styles.loaderContainer}>
              <Loader size="xl" />
            </div>
          )}

          {selectedMedia?.type === 'video' ? (
            <AspectRatio ratio={16 / 9}>
              <iframe
                ref={videoRef}
                src={getEmbedUrl(selectedMedia.url)}
                title="Video content"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleMediaLoad}
                style={{ opacity: loading ? 0 : 1 }}
              />
            </AspectRatio>
          ) : (
            <Image
              src={selectedMedia?.url || ''}
              alt="Feature"
              className={styles.fullscreenMedia}
              onLoad={handleMediaLoad}
              style={{ opacity: loading ? 0 : 1 }}
              width={800}
              height={450}
            />
          )}
        </div>
      </Modal>
    </Container>
  );
}

// Helper functions for video URLs
function getYoutubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
  return match?.[1] || '';
}

function getEmbedUrl(url: string) {
  const videoId = getYoutubeId(url);
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}