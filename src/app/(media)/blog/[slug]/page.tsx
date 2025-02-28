'use client';
import { Container, Title, Text, Image, Stack, Group, Button, Paper, Skeleton } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IconArrowLeft, IconShare, IconClock, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import styles from '../styles.module.css';
import { ErrorBoundary } from '@/components/error-boundary';
import { mockBlogs } from '@/data/mock-blogs';

interface JsonContent {
  [key: string]: unknown;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: {
    html: string;
    json?: JsonContent;
  };
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

function BlogSkeleton() {
  return (
    <Stack>
      <Skeleton height={400} radius="md" />
      <Skeleton height={50} width="80%" />
      <Skeleton height={20} width="40%" />
      <Skeleton height={200} />
    </Stack>
  );
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      // Add null check for params
      const slug = params?.slug?.toString();
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        // Fallback to mock data
        const mockPost = mockBlogs.posts.find(p => p.slug === slug);
        if (mockPost) setPost(mockPost);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.slug]);

  // Add early return for missing slug
  if (!params?.slug) {
    return (
      <Container size="lg" py="xl">
        <Text>Blog post not found</Text>
      </Container>
    );
  }

  const renderContent = (content: BlogPost['content']) => {
    const sanitizedHtml = DOMPurify.sanitize(content.html, {
      ADD_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'img', 'a'],
      ADD_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'style'],
      FORCE_BODY: false,
    });

    return (
      <div
        className={styles.blogContent}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <BlogSkeleton />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container size="lg" py="xl">
        <Text>Blog post not found</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.back()}
        mb="xl"
      >
        Back to Blogs
      </Button>

      <Image
        src={post.coverImage}
        alt={post.title}
        height={400}
        radius="md"
      />

      <Stack mt="xl" gap="lg">
        <Title>{post.title}</Title>

        <Group>
          <Group gap="xs">
            <IconUser size={20} />
            <Text>{post.author.name}</Text>
          </Group>
          <Group gap="xs">
            <IconClock size={20} />
            <Text>{post.readingTime}</Text>
          </Group>
          <Text c="dimmed">
            {dayjs(post.publishedAt).format('MMMM D, YYYY')}
          </Text>
        </Group>

        <Paper p="xl" radius="md" withBorder>
          <Group gap="md">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={60}
              height={60}
              radius="xl"
            />
            <div>
              <Text fw={500}>{post.author.name}</Text>
              <Text size="sm" c="dimmed">{post.author.bio}</Text>
            </div>
          </Group>
        </Paper>

        {renderContent(post.content)}

        <Button
          variant="light"
          leftSection={<IconShare size={16} />}
          onClick={() => {
            navigator.share({
              title: post.title,
              url: window.location.href
            });
          }}
        >
          Share Article
        </Button>
      </Stack>
    </Container>
  );
}
