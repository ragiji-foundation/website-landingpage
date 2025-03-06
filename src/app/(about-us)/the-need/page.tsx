'use client';
import React, { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import { Box, Container, Grid, Image, Text, Title, Center, Loader, Alert, Divider } from '@mantine/core';
import DOMPurify from 'isomorphic-dompurify';
import classes from './the-need.module.css';
import { useBannerStore } from '@/store/useBannerStore';
import { BannerType } from '@/types/banner';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Interface that matches the exact API response structure
interface ApiResponse {
  id: string;
  mainText: string;
  statistics: string;
  impact: string;
  imageUrl: string;
  statsImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  version: number;
}

// Component to safely render HTML content with proper styling
function HtmlContent({ html, className = '' }: { html: string; className?: string }) {
  // Only sanitize if html exists
  const sanitizedHtml = html ? DOMPurify.sanitize(html) : '';

  return (
    <div
      className={`${classes.htmlContent} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default function TheNeedPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        const response = await fetch(`${API_URL}/api/the-need`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();
        console.log('API response:', result); // Debug log
        setData(result);
      } catch (err) {
        console.error('Error fetching the need data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || bannerLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  const banner = getBannerByType('need');

  return (
    <main>
     <Banner
        type={banner?.type as BannerType || 'need'}
        title={banner?.title || "The Need"}
        description={banner?.description || "Making a difference through sustainable development"}
        backgroundImage={banner?.backgroundImage || "/banners/initiatives-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'The Need' }
        ]}
      />

      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <Container size="lg" py="xl">
          <Title order={2} ta="center" mb="md">
            ⭐ THE EDUCATION CRISIS
          </Title>

          {error && (
            <Alert color="red" mb="xl">
              Failed to load content: {error}. Please try refreshing the page.
            </Alert>
          )}

          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              {/* Main Text Section */}
              <Box mb="xl">
                <HtmlContent html={data?.mainText || ''} className={classes.mainText} />
              </Box>

              <Divider my="lg" variant="dashed" />

              {/* Statistics Section */}
              <Box mb="xl">
                <Title order={4} mb="md">Statistics</Title>
                <HtmlContent html={data?.statistics || ''} className={classes.statistics} />
              </Box>

              <Divider my="lg" variant="dashed" />

              {/* Impact Section */}
              <Box>
                <Title order={4} mb="md">Impact</Title>
                <HtmlContent html={data?.impact || ''} className={classes.impact} />
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box className={classes.imageWrapper}>
                <Image
                  src={data?.imageUrl}
                  alt="Education crisis illustration"
                  className={classes.image}
                  fallbackSrc="/images/placeholders/education-need.jpg"
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>

        <Container size="lg" py="xl">
          <Title order={2} ta="center" mb="md">
            ⭐ EDUCATION STATISTICS – CRISIS DATA
          </Title>

          <Center>
            <Box className={classes.imageWrapper} style={{ maxWidth: '800px' }}>
              <Image
                src={data?.statsImageUrl}
                alt="Education Statistics Data"
                className={classes.image}
                fallbackSrc="/images/placeholders/education-stats.jpg"
              />
            </Box>
          </Center>
        </Container>
      </Box>
    </main>
  );
}