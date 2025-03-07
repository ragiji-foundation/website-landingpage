'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Image,
  Skeleton,
  Group,
  Avatar,
  Stack,
  Divider,
  Button,
  Center,
  Paper
} from '@mantine/core';
import { IconArrowLeft, IconCalendar, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { ErrorBoundary } from '@/components/error-boundary';
import { Banner } from '@/components/Banner';
import { useBannerStore } from '@/store/useBannerStore';
import { mockBlogs } from '@/data/mock-blogs';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  content: {
    html: string;
    meta: {
      title: string;
      description: string;
      keywords: string;
      ogImage: string;
    };
  };
}


function BlogSkeleton() {
  return (
    <Container size="md" py="xl">
      <Skeleton height={50} width="80%" mb="xl" />
      <Skeleton height={30} width="40%" mb="xl" />
      <Skeleton height={400} mb="xl" />
      <Skeleton height={20} mb="sm" />
      <Skeleton height={20} mb="sm" />
      <Skeleton height={20} mb="sm" />
      <Skeleton height={20} mb="sm" />
      <Skeleton height={20} mb="sm" />
      <Skeleton height={20} mb="sm" />
    </Container>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchBanners, getBannerByType } = useBannerStore();

  const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

  useEffect(() => {
    // Fetch banner data
    fetchBanners().catch(console.error);

    // Fetch blog post data
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_URL) {
          throw new Error('API URL not configured');
        }

        const response = await fetch(`${API_URL}/api/blogs/${slug}`, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Blog post data:', data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post. Please try again later.');

        // Fallback to mock data
        const mockPost = mockBlogs.posts.find(p => p.slug === slug);
        if (mockPost) {
          setPost(mockPost);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, API_URL, fetchBanners]);

  // Get blog banner
  const banner = getBannerByType('blog');
  const imageUrl = post?.coverImage || '/images/blog-placeholder.jpg';
  const publishDate = post?.publishedAt || '';

  if (loading) {
    return <BlogSkeleton />;
  }

  if (error || !post) {
    return (
      <Center mih={400}>
        <Stack align="center">
          <Title order={3}>Error</Title>
          <Text>{error || 'Blog post not found'}</Text>
          <Button
            variant="outline"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/blog')}
          >
            Back to Blog
          </Button>
        </Stack>
      </Center>
    );
  }

  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="blog"
          title={banner?.title || "Our Blog"}
          description={banner?.description || "Stories of impact, innovation, and inspiration"}
          backgroundImage={banner?.backgroundImage || "/banners/blog-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Blog', link: '/blog' },
            { label: post.title }
          ]}
        />

        <Container size="md" py="xl">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/blog')}
            mb="xl"
          >
            Back to Blog
          </Button>

          <Title order={1} mb="lg">{post.title}</Title>

          <Group mb="xl">
            {post.author && (
              <Group gap="xs">
                <IconUser size={18} />
                <Text>{post.author.name}</Text>
              </Group>
            )}

            {publishDate && (
              <Group gap="xs">
                <IconCalendar size={18} />
                <Text>{dayjs(publishDate).format('MMMM D, YYYY')}</Text>
              </Group>
            )}
          </Group>

          <Image
            src={imageUrl}
            alt={post.title}
            radius="md"
            mb="xl"
            height={400}
            fallbackSrc="/images/blog-placeholder.jpg"
          />

          <Paper p="md" radius="md" withBorder>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            />
          </Paper>
        </Container>
      </main>
    </ErrorBoundary>
  );
}
