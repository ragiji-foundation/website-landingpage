'use client';
import { Container, Card, Text, Grid, Badge, Button, Group, Stack, Title } from '@mantine/core';
import { BannerType } from '@/types/banner'; // Adjust the import path as necessary
import { Banner } from '@/components/Banner';
import { useBannerStore } from '@/store/useBannerStore';
import { ErrorBoundary } from '@/components/error-boundary';
import { useState, useEffect } from 'react';
import { IconMapPin, IconClock, IconBriefcase } from '@tabler/icons-react';
import styles from './careers.module.css';
import { CareersSkeleton } from '@/components/skeletons/CareersSkeleton';
import Link from 'next/link';

interface Career {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
  formattedDate: string;
}

function parseLexicalContent(jsonString: string): string {
  try {
    const content = JSON.parse(jsonString);
    if (!content.root?.children) return '';

    // Combine all paragraphs with proper spacing
    return content.root.children
      .map((paragraph: any) => {
        // Get text from each paragraph's children
        const paragraphText = paragraph.children
          .map((child: any) => child.text || '')
          .join(' ')
          .trim();

        return paragraphText;
      })
      .filter(Boolean) // Remove empty paragraphs
      .join('\n'); // Join paragraphs with newlines
  } catch (e) {
    console.error('Error parsing Lexical content:', e);
    return jsonString;
  }
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchBanners, getBannerByType, banners, loading: bannerLoading, error: bannerError } = useBannerStore();

  useEffect(() => {
    fetchBanners();
    console.log('Fetching banners for careers page');
  }, [fetchBanners]);

  const processCareerData = (career: any) => ({
    ...career,
    description: parseLexicalContent(career.description),
    requirements: parseLexicalContent(career.requirements),
    formattedDate: new Date(career.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/careers`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch careers');

      const data = await response.json();
      const processedCareers = data
        .filter((career: Career) => career.isActive)
        .map(processCareerData)
        .sort((a: Career, b: Career) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setCareers(processedCareers);
    } catch (error) {
      console.error('Error fetching careers:', error);
      setError('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Add better debugging
  const banner = getBannerByType('careers');
  console.log('Careers banner:', banner);
  console.log('All banners:', banners);

  if (loading || bannerLoading) return <CareersSkeleton />;

  if (error || bannerError) {
    return (
      <Stack align="center" py="xl">
        <Title order={3}>Unable to load page</Title>
        <Text c="dimmed">{error || bannerError?.message}</Text>
        <Text>Available banner types: {banners.map(b => b.type).join(', ')}</Text>
        <Button onClick={fetchCareers}>Retry</Button>
      </Stack>
    );
  }

  // Use fallback if banner not found
  if (!banner) {
    console.warn('Career banner not found, using fallback');
    return (
      <ErrorBoundary>
        <main>
          <Banner
            type="careers"
            title="Join Our Team"
            description="Be part of our mission to create positive change."
            backgroundImage="/banners/careers-banner.jpg"
            breadcrumbs={[
              { label: 'Home', link: '/' },
              { label: 'Careers' }
            ]}
          />

          <Container size="xl" py="xl">
            <Grid gutter="lg">
              {careers.map((career) => (
                <Grid.Col key={career.id} span={{ base: 12, md: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" className={styles.careerCard}>
                    <Stack>
                      <Title order={3}>{career.title}</Title>

                      <Group gap="lg">
                        <Group gap="xs">
                          <IconMapPin size={16} />
                          <Text size="sm">{career.location}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconBriefcase size={16} />
                          <Badge variant="light">{career.type}</Badge>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={16} />
                          <Text size="sm" c="dimmed">
                            {career.formattedDate}
                          </Text>
                        </Group>
                      </Group>

                      <Text lineClamp={3} style={{ whiteSpace: 'pre-line' }}>
                        {career.description}
                      </Text>

                      <Group justify="flex-end" gap="md">
                        <Button
                          variant="outline"
                          component={Link}
                          href={`/careers/${career.slug}`}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="filled"
                          component={Link}
                          href={`/careers/${career.slug}/apply`}
                        >
                          Apply Now
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </main>
      </ErrorBoundary>
    );
  }

  // Use actual banner
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type={banner.type as BannerType}
          title={banner.title}
          description={banner.description ?? "Be part of our mission to create positive change."}
          backgroundImage={banner.backgroundImage || "/banners/careers-banner.jpg"}
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Careers' }
          ]}
        />

        <Container size="xl" py="xl">
          <Grid gutter="lg">
            {careers.map((career) => (
              <Grid.Col key={career.id} span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" className={styles.careerCard}>
                  <Stack>
                    <Title order={3}>{career.title}</Title>

                    <Group gap="lg">
                      <Group gap="xs">
                        <IconMapPin size={16} />
                        <Text size="sm">{career.location}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconBriefcase size={16} />
                        <Badge variant="light">{career.type}</Badge>
                      </Group>
                      <Group gap="xs">
                        <IconClock size={16} />
                        <Text size="sm" c="dimmed">
                          {career.formattedDate}
                        </Text>
                      </Group>
                    </Group>

                    <Text lineClamp={3} style={{ whiteSpace: 'pre-line' }}>
                      {career.description}
                    </Text>

                    <Group justify="flex-end" gap="md">
                      <Button
                        variant="outline"
                        component={Link}
                        href={`/careers/${career.slug}`}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="filled"
                        component={Link}
                        href={`/careers/${career.slug}/apply`}
                      >
                        Apply Now
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </main>
    </ErrorBoundary>
  );
}
