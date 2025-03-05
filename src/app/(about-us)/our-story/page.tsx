'use client';
import React, { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import {
  Box, Container, Title, Text, Image, SimpleGrid, Card,
  Group, Stack, Skeleton, Alert, Center, Loader
} from "@mantine/core";
import classes from './our-story.module.css';
import { OurStoryTimeline } from '@/components/about/our-story-timeline';
import { convertFromHTML } from '@/utils/content-utils';

interface TimelineEvent {
  year: string;
  title: string;
  centers: number;
  volunteers: number;
  children: number;
}

interface OurStoryData {
  story: {
    title: string;
    content: string;
    imageUrl: string;
  };
  model: {
    title: string;
    description: string;
    imageUrl: string;
  };
  visionMission: {
    vision: string;
    mission: string;
    visionIcon: string;
    missionIcon: string;
  };
  timeline: TimelineEvent[];
}

// Default fallback data
const defaultData: OurStoryData = {
  story: {
    title: "Our Story",
    content: "Our journey began with a simple mission to empower children through education.",
    imageUrl: "/images/placeholders/our-story.jpg"
  },
  model: {
    title: "Our Model",
    description: "We believe in a holistic approach to education that addresses the unique needs of each community.",
    imageUrl: "/images/placeholders/our-model.jpg"
  },
  visionMission: {
    vision: "To create a world where every child has access to quality education regardless of their socioeconomic background.",
    mission: "To provide innovative educational solutions that bridge the gap between rural and urban educational opportunities.",
    visionIcon: "/images/placeholders/vision-icon.png",
    missionIcon: "/images/placeholders/mission-icon.png"
  },
  timeline: [
    {
      year: "2015",
      title: "Founding Year",
      centers: 1,
      volunteers: 10,
      children: 50
    },
    {
      year: "2018",
      title: "Expansion Phase",
      centers: 5,
      volunteers: 50,
      children: 500
    },
    {
      year: "2023",
      title: "National Recognition",
      centers: 15,
      volunteers: 200,
      children: 2000
    }
  ]
};

export default function OurStoryPage() {
  const [data, setData] = useState<OurStoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/our-story`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();

        // Process HTML content from the API
        const processedData = {
          ...result,
          story: {
            ...result.story,
            content: result.story?.content ? convertFromHTML(result.story.content) : defaultData.story.content
          },
          model: {
            ...result.model,
            description: result.model?.description ? convertFromHTML(result.model.description) : defaultData.model.description
          },
          visionMission: {
            ...result.visionMission,
            vision: result.visionMission?.vision ? convertFromHTML(result.visionMission.vision) : defaultData.visionMission.vision,
            mission: result.visionMission?.mission ? convertFromHTML(result.visionMission.mission) : defaultData.visionMission.mission
          }
        };

        setData(processedData);
      } catch (err) {
        console.error('Error fetching our story data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load content');
        setData(defaultData); // Use fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="lg" py="xl">
          <Stack gap="xl">
            <Skeleton height={60} width="50%" mx="auto" />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Skeleton height={300} />
              <Stack gap="md">
                <Skeleton height={30} width="70%" />
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} height={20} />
                ))}
              </Stack>
            </SimpleGrid>

            <Skeleton height={60} width="50%" mx="auto" mt="xl" />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Skeleton height={200} />
              <Skeleton height={200} />
            </SimpleGrid>

            <Skeleton height={60} width="50%" mx="auto" mt="xl" />
            <Skeleton height={400} />
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
          type="ourstory"
          title="Our Story"
          description="Journey of transforming lives through education"
        />
        <Container size="lg" py="xl">
          <Alert color="yellow" title="Using Fallback Data" mb="xl">
            {error}. Showing default content.
          </Alert>

          {/* Continue with the rest of the component using fallback data */}
          {renderContent(data)}
        </Container>
      </main>
    );
  }

  // Complete error state (no fallback data)
  if (error) {
    return (
      <main>
        <Banner
          type="ourstory"
          title="Our Story"
          description="Journey of transforming lives through education"
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
          type="ourstory"
          title="Our Story"
          description="Journey of transforming lives through education"
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
        type="ourstory"
        title="Our Story"
        description="Journey of transforming lives through education"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About Us', link: '/about' },
          { label: 'Our Story' }
        ]}
      />

      {renderContent(data)}
    </main>
  );
}

// Helper function to render content
function renderContent(data: OurStoryData) {
  return (
    <>
      {/* Story Section */}
      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="xl" className={classes.sectionTitle}>
          {data.story.title}
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <div className={classes.imageWrapper}>
            <Image
              src={data.story.imageUrl}
              alt="Our Story"
              radius="md"
              className={classes.storyImage}
              fallbackSrc="/images/placeholders/our-story.jpg"
            />
          </div>

          <div className={classes.storyContent}>
            <Text size="lg">
              {data.story.content}
            </Text>
          </div>
        </SimpleGrid>
      </Container>

      {/* Model Section */}
      <Box bg="var(--mantine-color-dark-8)" py="xl">
        <Container size="lg">
          <Title order={2} c="white" ta="center" mb="xl" className={classes.sectionTitle}>
            {data.model.title}
          </Title>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <div>
              <Text c="white" size="lg">
                {data.model.description}
              </Text>
            </div>
            <Image
              src={data.model.imageUrl}
              alt="The Model"
              radius="md"
              fallbackSrc="/images/placeholders/our-model.jpg"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Vision & Mission Section */}
      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
          Our Vision & Mission
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.visionCard}>
            <Stack align="center" gap="md">
              <Image
                src={data.visionMission.visionIcon}
                width={80}
                height={80}
                alt="Vision Icon"
                fallbackSrc="/images/placeholders/vision-icon.png"
              />
              <Title order={3}>Our Vision</Title>
              <Text ta="center" size="lg">
                {data.visionMission.vision}
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.missionCard}>
            <Stack align="center" gap="md">
              <Image
                src={data.visionMission.missionIcon}
                width={80}
                height={80}
                alt="Mission Icon"
                fallbackSrc="/images/placeholders/mission-icon.png"
              />
              <Title order={3}>Our Mission</Title>
              <Text ta="center" size="lg">
                {data.visionMission.mission}
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Timeline Section */}
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <Container size="lg">
          <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
            Our Journey
          </Title>

          <OurStoryTimeline events={data.timeline} />
        </Container>
      </Box>
    </>
  );
}
