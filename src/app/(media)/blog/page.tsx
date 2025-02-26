'use client';
import { Container, Grid, Card, Text, Title, Group, Image, Pagination, Stack, Skeleton } from '@mantine/core';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { ErrorBoundary } from '@/components/error-boundary';
import { mockBlogs } from '@/data/mock-blogs';
import { Banner } from '@/components/Banner'

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

function BlogCard({ post }: { post: BlogPost }) {
  const router = useRouter();

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
          src={post.coverImage}
          height={200}
          alt={post.title}
        />
      </Card.Section>

      <Stack mt="md">
        <Title order={3} lineClamp={2}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {post.excerpt}
        </Text>

        <Group justify="space-between" mt="md">
          <Group gap="xs">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={24}
              height={24}
              radius="xl"
            />
            <Text size="sm">{post.author.name}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {dayjs(post.publishedAt).format('MMM D, YYYY')}
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs?page=${currentPage}&limit=${postsPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to mock data
        setPosts(mockBlogs.posts);
        setTotalPages(Math.ceil(mockBlogs.total / postsPerPage));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <Container size="xl" py="xl">
      {loading ? (
        <BlogSkeleton />
      ) : (
        <>
          <Grid gutter="xl">
            {posts.map((post) => (
              <Grid.Col key={post.id} span={{ base: 12, sm: 6, md: 4 }}>
                <BlogCard post={post} />
              </Grid.Col>
            ))}
          </Grid>

          <Group justify="center" mt="xl">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              size="lg"
              radius="md"
            />
          </Group>
        </>
      )}
    </Container>
  );
}

export default function BlogPage() {
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
          tags={['Stories', 'Impact', 'Community']}
        />
        <BlogList />
      </main>
    </ErrorBoundary>
  )
}
