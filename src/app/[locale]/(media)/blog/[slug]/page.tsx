'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Image,
  Skeleton,
  Group,
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

interface BlogPost {
  id: number;
  slug: string;
  locale: string;
  title: string;
  content: string;
  status: string;
  authorName: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  authorId: number;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
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

export default function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  const router = useRouter();
  const { slug, locale } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchBanners, getBannerByType } = useBannerStore();

  const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

  useEffect(() => {
    fetchBanners().catch(console.error);

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_URL) {
          throw new Error('API URL not configured');
        }

        const response = await fetch(`${API_URL}/api/blogs/${slug}?locale=${locale}`, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(locale === 'hi' ? 'ब्लॉग पोस्ट नहीं मिली' : 'Blog post not found');
          }
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Blog post data:', data);

        if (data.status !== 'published') {
          throw new Error(locale === 'hi' ? 'ब्लॉग पोस्ट प्रकाशित नहीं है' : 'Blog post is not published');
        }

        // Handle localized content
        const localizedPost = {
          ...data,
          title: locale === 'hi' && data.titleHi ? data.titleHi : data.title,
          content: locale === 'hi' && data.contentHi ? data.contentHi : data.content,
          authorName: locale === 'hi' && data.authorNameHi ? data.authorNameHi : data.authorName,
          metaDescription: locale === 'hi' && data.metaDescriptionHi ? data.metaDescriptionHi : data.metaDescription,
        };

        setPost(localizedPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to load blog post. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, API_URL, fetchBanners, locale]);

  // Get blog banner
  const banner = getBannerByType('blog');

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
            onClick={() => router.push(`/${locale}/blog`)}
          >
            {locale === 'hi' ? 'ब्लॉग पर वापस जाएं' : 'Back to Blog'}
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
            { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
            { label: locale === 'hi' ? 'ब्लॉग' : 'Blog', link: `/${locale}/blog` },
            { label: post.title }
          ]}
        />

        <Container size="md" py="xl">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push(`/${locale}/blog`)}
            mb="xl"
          >
            {locale === 'hi' ? 'ब्लॉग पर वापस जाएं' : 'Back to Blog'}
          </Button>

          <Title order={1} mb="lg">{post.title}</Title>

          <Group mb="xl">
            <Group gap="xs">
              <IconUser size={18} />
              <Text>{post.authorName}</Text>
            </Group>

            <Group gap="xs">
              <IconCalendar size={18} />
              <Text>{dayjs(post.createdAt).format('MMMM D, YYYY')}</Text>
            </Group>

            {post.category && (
              <Text c="dimmed">• {post.category.name}</Text>
            )}
          </Group>

          <Image
            src="/images/blog-placeholder.jpg"
            alt={post.title}
            radius="md"
            mb="xl"
            height={400}
          />

          <Paper p="md" radius="md" withBorder>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: post.content
              }}
            />

            {post.tags && post.tags.length > 0 && (
              <>
                <Divider my="lg" />
                <Group gap="xs">
                  {post.tags.map(tag => (
                    <Button
                      key={tag.id}
                      variant="light"
                      size="xs"
                      radius="xl"
                    >
                      {tag.name}
                    </Button>
                  ))}
                </Group>
              </>
            )}
          </Paper>
        </Container>
      </main>
    </ErrorBoundary>
  );
}
