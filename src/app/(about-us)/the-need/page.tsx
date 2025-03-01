'use client';
import React, { useEffect, useState } from 'react'
import { Banner } from '@/components/Banner'
import { Box, Container, Grid, Image, Text, Title, Center, Loader, Alert } from '@mantine/core';
import classes from './page.module.css';
import type { TheNeedData } from '@/types/the-need';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

export default function TheNeedPage() {
  const [data, setData] = useState<TheNeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        const response = await fetch(`${API_URL}/the-need`);
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

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) return null;

  return (
    <main>
      <Banner
        type="about"
        title="The Need"
        description="Understanding the challenges and opportunities in rural education and development"
        backgroundImage="/banners/the-need-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'The Need' }
        ]}
        tags={['Education', 'Development', 'Rural', 'Impact']}
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
