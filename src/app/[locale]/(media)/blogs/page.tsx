'use client';

import { Container, Title, Grid, Card, Text, Image, Group, Badge, Button, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { withLocalizedArray } from '@/utils/localization';
import Link from 'next/link';
import { useBannerStore } from '@/store/useBannerStore';
import { useBlogsStore } from '@/store/useBlogsStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';

export default function BlogsPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { blogs, loading, error, fetchBlogs } = useBlogsStore();
  
  useEffect(() => {
    fetchBanners();
    fetchBlogs(locale);
  }, [fetchBanners, fetchBlogs, locale]);
  
  // Get localized blogs - blogs are already filtered by locale from the API
  // but we still need to handle any Hindi fields
  const localizedBlogs = withLocalizedArray(blogs, locale);
  
  // Get banner
  const banner = getBannerByType('blogs');
  
  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Blogs' }
          ]}
        />
      ) : (
        <Banner
          type="blogs"
          title={locale === 'hi' ? 'ब्लॉग' : 'Blogs'}
          description={locale === 'hi' ? 'हमारे प्रयासों और समाचारों के बारे में जानें' : 'Read about our efforts and news'}
          backgroundImage="/banners/blogs-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Blogs' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Grid gutter="xl">
            {localizedBlogs.map((blog) => (
              <Grid.Col key={blog.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src="/blog-placeholder.jpg"
                      height={160}
                      alt={blog.title}
                    />
                  </Card.Section>
                  
                  <Group justify="apart" mt="md" mb="xs">
                    <Title order={3} lineClamp={2}>{blog.title}</Title>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="md">
                    {blog.authorName} • {new Date(blog.createdAt).toLocaleDateString()}
                  </Text>
                  
                  <Text size="sm" lineClamp={3}>
                    {blog.excerpt || blog.metaDescription || ''}
                  </Text>
                  
                  <Button 
                    component={Link}
                    href={`/${locale}/blogs/${blog.slug}`}
                    variant="light" 
                    fullWidth 
                    mt="md" 
                    radius="md"
                  >
                    {locale === 'hi' ? 'पूरा पढ़ें' : 'Read More'}
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}