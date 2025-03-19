'use client';
import { Container, Grid, Card, Text, Title, Group, Image, Pagination, Stack, Skeleton, Center, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

function BlogCard({ post }: { post: BlogPost }) {
  const router = useRouter();

  // Use a default image since the schema doesn't include images
  const imageUrl = '/images/blog-placeholder.jpg';

  // Create excerpt from content
  const excerpt = post.metaDescription || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => router.push(`/blog/${post.slug}`)}
      className="blog-card"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 'var(--mantine-shadow-md)',
        },
      }}
    >
      <Card.Section>
        <Image
          src={imageUrl}
          height={200}
          alt={post.title}
          fallbackSrc="/images/blog-placeholder.jpg"
        />
      </Card.Section>

      <Stack mt="md">
        <Title order={3} lineClamp={2}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {excerpt}
        </Text>

        <Group justify="space-between" mt="md">
          <Group gap="xs">
            <Text size="sm">{post.authorName}</Text>
            {post.category && (
              <Text size="sm" c="dimmed">• {post.category.name}</Text>
            )}
          </Group>
          <Text size="sm" c="dimmed">
            {dayjs(post.createdAt).format('MMM D, YYYY')}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
          <Card padding="lg" radius="md">
            <Skeleton height={200} mb="md" />
            <Skeleton height={20} width="80%" mb="sm" />
            <Skeleton height={60} mb="md" />
            <Group justify="space-between">
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={80} />
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_URL) {
          throw new Error('API URL not configured');
        }

        const url = `${API_URL}/api/blogs?page=${currentPage}&limit=${postsPerPage}&locale=en`;
        console.log('Fetching blogs from:', url);

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          mode: 'cors',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Blog data received:', data);

        // Only show published posts
        const fetchedPosts = (data.blogs || []).filter((post: BlogPost) => post.status === 'published');
        const total = data.pagination?.total || fetchedPosts.length;

        setPosts(fetchedPosts);
        setTotalPages(Math.ceil(total / postsPerPage));
      } catch (error) {
        console.error('Error fetching blogs:', error);
        if (error instanceof Error) {
          setError(`Failed to load blog posts: ${error.message}`);
        } else {
          setError('Failed to load blog posts. Please try again later.');
        }
        setPosts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, API_URL]);

  if (error) {
    return (
      <Container size="md" py="xl" ta="center">
        <Title order={3} mb="md">Unable to load blog posts</Title>
        <Text mb="lg">{error}</Text>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      {loading ? (
        <BlogSkeleton />
      ) : posts.length > 0 ? (
        <>
          <Grid gutter="xl">
            {posts.map((post) => (
              <Grid.Col key={post.id || Math.random().toString()} span={{ base: 12, sm: 6, md: 4 }}>
                <BlogCard post={post} />
              </Grid.Col>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Group justify="center" mt="xl">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                size="lg"
                radius="md"
              />
            </Group>
          )}
        </>
      ) : (
        <Center mih={200}>
          <Text size="lg" fw={500} c="dimmed">No blog posts found</Text>
        </Center>
      )}
    </Container>
  );
}

export default function BlogPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBanners()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [fetchBanners]);

  // Get banner after fetching
  const banner = getBannerByType('blog');

  // If still loading banner, show a simplified banner
  if (isLoading || bannerLoading) {
    return (
      <ErrorBoundary>
        <main>
          <Banner
            type="blog"
            title="Our Blog"
            description="Loading..."
            backgroundImage="/banners/blog-banner.jpg"
            breadcrumbs={[
              { label: 'Home', link: '/' },
              { label: 'Blog' }
            ]}
          />
          <BlogList />
        </main>
      </ErrorBoundary>
    );
  }

  // If banner not found or error, use default banner
  if (!banner || bannerError) {
    console.log('Using default banner - Error or not found:', bannerError);
    return (
      <ErrorBoundary>
        <main>
          <Banner
            type="blog"
            title="Our Blog"
            description="Stories of impact, innovation, and inspiration from our community"
            backgroundImage="/banners/blog-banner.jpg"
            breadcrumbs={[
              { label: 'Home', link: '/' },
              { label: 'Blog' }
            ]}

          />
          <BlogList />
        </main>
      </ErrorBoundary>
    );
  }

  // Use banner from API
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="blog"
          title={banner.title}
          description={banner.description}
          backgroundImage={banner.backgroundImage || "/banners/blog-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Blog' }
          ]}

        />
        <BlogList />
      </main>
    </ErrorBoundary>
  );
}
