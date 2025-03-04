'use client';
import React, { useEffect, useState } from 'react'
import { Banner } from '@/components/Banner'
import { Box, Container, Grid, Image, Text, Title, Center, Loader, Alert } from '@mantine/core';
import classes from './page.module.css';
import type { TheNeedData } from '@/types/the-need';
import { useBannerStore} from '@/store/useBannerStore';
import { BannerType } from '@/types/banner';
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function TheNeedPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();
  const [data, setData] = useState<TheNeedData | null>(null);
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
        setData(result);
      } catch (err) {
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

  if (error || bannerError) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error">
          {error || bannerError?.message}
        </Alert>
      </Container>
    );
  }

  const banner = getBannerByType('need');
  if (!banner) return <Text>Banner not found</Text>;
  if (!data) return null;

  return (
    <main>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description ?? "Understanding the challenges in rural education"}
        backgroundImage={banner.backgroundImage || "/banners/the-need-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'The Need' }
        ]}
      />

      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <Container size="lg" py="xl">
          <Title order={2} ta="center" mb="md">
            ⭐ THE EDUCATION CRISIS
          </Title>

          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Text size="lg">{data.educationCrisis.mainText}</Text>
              <Text mt="md">{data.educationCrisis.statistics}</Text>
              <Text mt="md">{data.educationCrisis.impact}</Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box className={classes.imageWrapper}>
                <Image
                  src={data.educationCrisis.imageUrl}
                  alt="Child in need of education"
                  className={classes.image}
                  style={{
                    border: '1px solid var(--mantine-color-gray-3)',
                    transition: 'transform 0.3s ease',
                  }}
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
            <Box className={classes.imageWrapper}>
              <Image
                src={data.educationCrisis.statsImageUrl}
                alt="Education Statistics Data"
                className={classes.image}
                style={{
                  border: '1px solid var(--mantine-color-gray-3)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          </Center>
        </Container>
      </Box>
    </main>
  );
}
