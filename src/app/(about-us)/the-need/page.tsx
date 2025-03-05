'use client';
import React, { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  Title,
  Center,
  Loader,
  Alert,
  Stack,
  Card,
  SimpleGrid,
  Skeleton,
  Group
} from '@mantine/core';
import classes from './the-need.module.css';
import { TheNeedData } from '@/types/the-need';
import { convertFromHTML } from '@/utils/content-utils';

// Default fallback data in case API doesn't return all expected sections
const defaultData: Partial<TheNeedData> = {
  headerSection: {
    title: "Understanding the Education Crisis",
    subtitle: "Addressing challenges faced by children in rural areas",
    content: "Millions of children in rural areas face significant challenges in accessing quality education. Our organization works to bridge this gap through innovative programs and grassroots initiatives.",
    imageUrl: "/images/placeholders/education-need.jpg"
  },
  educationCrisis: {
    title: "The Education Crisis",
    mainText: "Rural education in India faces numerous challenges that prevent children from accessing quality learning opportunities.",
    statistics: [
      "Over 6 million children are out of school in India",
      "50% of rural students drop out before completing secondary education",
      "Only 16% of rural schools have computers"
    ],
    impact: "These statistics reflect a critical need for intervention in rural education systems.",
    imageUrl: "/images/placeholders/education-crisis.jpg",
    statsImageUrl: "/images/placeholders/education-stats.jpg"
  }
};

// Transform API data to the expected format
function transformApiData(apiData: any): TheNeedData {
  // Default values if API data is incomplete
  const transformed: TheNeedData = {
    headerSection: {
      title: "Understanding the Education Crisis",
      subtitle: "Addressing challenges faced by children in rural areas",
      content: apiData?.mainText ? convertFromHTML(apiData.mainText) : "No content available",
      imageUrl: apiData?.imageUrl || "/images/placeholders/education-need.jpg"
    },
    educationCrisis: {
      title: "The Education Crisis",
      mainText: apiData?.mainText ? convertFromHTML(apiData.mainText) : "No content available",
      statistics: apiData?.statistics
        ? convertFromHTML(apiData.statistics).split('\n').filter(Boolean)
        : ["No statistics available"],
      impact: apiData?.impact ? convertFromHTML(apiData.impact) : "No impact information available",
      imageUrl: apiData?.imageUrl || "/images/placeholders/education-crisis.jpg",
      statsImageUrl: apiData?.statsImageUrl || "/images/placeholders/education-stats.jpg"
    },
    challengesSection: {
      title: "Challenges We Address",
      challenges: [] // Empty since the API doesn't provide this yet
    },
    statisticsSection: {
      title: "Key Statistics",
      description: "Understanding the scale of the educational challenge",
      stats: [] // Empty since the API doesn't provide this yet
    },
    solutionSection: {
      title: "Our Solution",
      description: "How we're addressing these educational challenges",
      imageUrl: "/images/placeholders/solution.jpg",
      keyPoints: [] // Empty since the API doesn't provide this yet
    }
  };

  return transformed;
}

export default function TheNeedPage() {
  const [data, setData] = useState<TheNeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawApiData, setRawApiData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        const response = await fetch(`${API_URL}/api/the-need`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const apiData = await response.json();

        // Save the raw API data for debugging
        setRawApiData(apiData);

        // Check if API returned any data
        if (Object.keys(apiData).length === 0) {
          console.warn('API returned empty object, using default data');
          setData(defaultData as TheNeedData);
        } else {
          // Transform API data to expected format
          const transformedData = transformApiData(apiData);
          setData(transformedData);
        }
      } catch (err) {
        console.error('Error fetching the need data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Use default data as fallback in case of error
        setData(defaultData as TheNeedData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debug output for raw API data
  useEffect(() => {
    if (rawApiData) {
      console.log('Raw API data:', rawApiData);
    }
  }, [rawApiData]);

  // Loading skeleton
  if (loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="lg" py="xl">
          <Stack gap="xl">
            <Skeleton height={60} width="70%" mx="auto" />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Stack gap="md">
                <Skeleton height={30} width="70%" />
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} height={20} />
                ))}
              </Stack>
              <Skeleton height={300} />
            </SimpleGrid>

            <Skeleton height={60} width="70%" mx="auto" mt="xl" />
            <Skeleton height={300} />

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt="xl">
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </SimpleGrid>
          </Stack>
        </Container>
      </main>
    );
  }

  // Error state with fallback data
  if (error && data) {
    return (
      <main>
        <Banner
          type="need"
          title="The Need"
          description="Understanding the challenges in rural education"
        />
        <Container size="lg" py="xl">
          <Alert color="yellow" title="Using Fallback Data" mb="xl">
            {error}. Showing default content.
          </Alert>

          {/* Render content with fallback data */}
          {renderContent(data)}
        </Container>
      </main>
    );
  }

  // Complete error state (no fallback data available)
  if (error) {
    return (
      <main>
        <Banner
          type="need"
          title="The Need"
          description="Understanding the challenges in rural education"
        />
        <Container size="lg" py="xl">
          <Alert color="red" title="Error Loading Content">
            {error}. Please try again later.
          </Alert>
        </Container>
      </main>
    );
  }

  // No data state
  if (!data) {
    return (
      <main>
        <Banner
          type="need"
          title="The Need"
          description="Understanding the challenges in rural education"
        />
        <Container size="lg" py="xl">
          <Center>
            <Text c="dimmed">No content available at the moment.</Text>
          </Center>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Banner
        type="need"
        title="The Need"
        description="Understanding the challenges in rural education"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'The Need' }
        ]}
      />

      {renderContent(data)}
    </main>
  );
}

// Helper function to render content sections
function renderContent(data: TheNeedData) {
  return (
    <>
      {/* Header Section */}
      {data.headerSection && (
        <Container size="lg" py="xl">
          <Title order={1} ta="center" mb="xl" className={classes.sectionTitle}>
            {data.headerSection.title}
          </Title>
          {data.headerSection.subtitle && (
            <Text size="xl" ta="center" mb="xl" fw={500} c="dimmed">
              {data.headerSection.subtitle}
            </Text>
          )}

          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Text size="lg">
                {data.headerSection.content}
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box className={classes.imageWrapper}>
                <Image
                  src={data.headerSection.imageUrl}
                  alt="Educational needs"
                  radius="md"
                  className={classes.imageZoomEffect}
                  fallbackSrc="/images/placeholders/education-need.jpg"
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      )}

      {/* Education Crisis Section */}
      {data.educationCrisis && (
        <Box bg="var(--mantine-color-gray-0)" py="xl">
          <Container size="lg">
            <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
              {data.educationCrisis.title}
            </Title>

            <Grid gutter="xl" align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text size="lg" mb="md">
                  {data.educationCrisis.mainText}
                </Text>

                {Array.isArray(data.educationCrisis.statistics) && (
                  <Stack gap="sm">
                    {data.educationCrisis.statistics.map((stat, index) => (
                      <Text key={index} size="md">
                        • {stat}
                      </Text>
                    ))}
                  </Stack>
                )}

                {data.educationCrisis.impact && (
                  <Text size="lg" mt="md" fw={500} c="dimmed">
                    {data.educationCrisis.impact}
                  </Text>
                )}
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className={classes.imageWrapper}>
                  <Image
                    src={data.educationCrisis.imageUrl}
                    alt="Education crisis"
                    radius="md"
                    className={classes.imageZoomEffect}
                    fallbackSrc="/images/placeholders/education-crisis.jpg"
                  />
                </Box>
              </Grid.Col>
            </Grid>

            {/* Stats Image Section - Inside Education Crisis */}
            {data.educationCrisis.statsImageUrl && (
              <Box mt="xl">
                <Title order={3} ta="center" mb="lg">
                  Education Statistics
                </Title>

                <Box className={classes.statsImageContainer}>
                  <Image
                    src={data.educationCrisis.statsImageUrl}
                    alt="Education Statistics Data"
                    className={classes.statsImage}
                    fallbackSrc="/images/placeholders/education-stats.jpg"
                  />
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      )}

      {/* Challenges Section - Only render if it exists */}
      {data.challengesSection && data.challengesSection.challenges && data.challengesSection.challenges.length > 0 && (
        <Container size="lg" py="xl">
          <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
            {data.challengesSection.title || "Challenges We Address"}
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {data.challengesSection.challenges.map((challenge, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={classes.challengeCard}
              >
                <Card.Section>
                  <Image
                    src={challenge.imageUrl}
                    height={160}
                    alt={challenge.title}
                    fallbackSrc="/images/placeholders/challenge.jpg"
                  />
                </Card.Section>

                <Title order={3} mt="md" mb="xs" size="h4">
                  {challenge.title}
                </Title>

                <Text size="sm" c="dimmed">
                  {challenge.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      )}

      {/* Statistics Section - Only render if it exists */}
      {data.statisticsSection && data.statisticsSection.stats && data.statisticsSection.stats.length > 0 && (
        <Box bg="var(--mantine-color-blue-0)" py="xl">
          <Container size="lg">
            <Title order={2} ta="center" mb="md" className={classes.sectionTitle}>
              {data.statisticsSection.title || "Key Statistics"}
            </Title>

            {data.statisticsSection.description && (
              <Text ta="center" size="lg" mb="xl" maw={800} mx="auto">
                {data.statisticsSection.description}
              </Text>
            )}

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
              {data.statisticsSection.stats.map((stat, index) => (
                <Card
                  key={index}
                  padding="lg"
                  radius="md"
                  className={classes.statCard}
                >
                  {stat.icon && (
                    <Center mb="md">
                      <Image src={stat.icon} width={40} height={40} alt={stat.label} />
                    </Center>
                  )}

                  <Title order={2} ta="center" className={classes.statValue}>
                    {stat.value}
                  </Title>

                  <Text ta="center" c="dimmed" size="sm">
                    {stat.label}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* Solution Section - Only render if it exists */}
      {data.solutionSection && (
        <Container size="lg" py="xl">
          <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
            {data.solutionSection.title || "Our Solution"}
          </Title>

          <Grid gutter="xl" align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box className={classes.imageWrapper}>
                <Image
                  src={data.solutionSection.imageUrl}
                  alt="Our solution"
                  radius="md"
                  className={classes.imageZoomEffect}
                  fallbackSrc="/images/placeholders/solution.jpg"
                />
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text size="lg" mb="lg">
                {data.solutionSection.description}
              </Text>

              {Array.isArray(data.solutionSection.keyPoints) && data.solutionSection.keyPoints.length > 0 && (
                <Stack gap="md">
                  {data.solutionSection.keyPoints.map((point, index) => (
                    <Group key={index} gap="md" align="flex-start">
                      <div className={classes.pointBullet}>{index + 1}</div>
                      <Text size="md">{point}</Text>
                    </Group>
                  ))}
                </Stack>
              )}
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </>
  );
}
