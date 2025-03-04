'use client';
import React, { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import OurStory from '@/components/about/our-story';
import { useBannerStore } from '@/store/useBannerStore';
import { BannerType } from '@/types/banner';
import {
  Box, Container, Title, Text, Image, SimpleGrid, Card,
  Group, Timeline, Badge, Skeleton, Alert, Center, Loader
} from "@mantine/core";
import classes from './our-story.module.css';

interface PageData {
  story: any;
  model: {
    description: string;
    imageUrl: string;
  };
  visionMission: {
    vision: string;
    mission: string;
    visionIcon: string;
    missionIcon: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    centers: number;
    volunteers: number;
    children: number;
  }>;
}

export default function OurStoryPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/our-story`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || bannerLoading) {
    return <Center py="xl"><Loader size="lg" /></Center>;
  }

  if (error || bannerError) {
    return (
      <Container>
        <Alert color="red" title="Error">
          {error || bannerError?.message}
        </Alert>
      </Container>
    );
  }

  const banner = getBannerByType('about');
  if (!banner) return <Text>Banner not found</Text>;

  if (!data) return null;

  return (
    <main>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description ?? "Journey of transforming lives through education"}
        backgroundImage={banner.backgroundImage || "/banners/our-story-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Our Story' }
        ]}
      />

      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <OurStory />
      </Box>

      <Container size="lg" py="xl">
        {/* The Model Section */}
        <div className={classes.timelineContainer}>
          <h2 className={classes.timelineTitle}>★ THE MODEL</h2>
          <div style={{ backgroundColor: "#333", padding: "3rem", color: "#fff" }}>
            <SimpleGrid cols={2} spacing="xl">
              <div>
                <Text size="lg">{data.model.description}</Text>
              </div>
              <Image src={data.model.imageUrl} alt="The Model Image" radius="md" />
            </SimpleGrid>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className={classes.timelineContainer}>
          <h2 className={classes.timelineTitle}>★ OUR VISION & MISSION</h2>
          <SimpleGrid cols={2} spacing="xl">
            <Card shadow="sm" padding="lg" radius="md">
              <Group justify="center">
                <Image src={data.visionMission.visionIcon} width={80} height={80} alt="Vision Icon" />
              </Group>
              <Text ta="center" mt="md">
                <strong>The vision of UPAY NGO</strong>
                <br />
                {data.visionMission.vision}
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md">
              <Group justify="center">
                <Image src={data.visionMission.missionIcon} width={80} height={80} alt="Mission Icon" />
              </Group>
              <Text ta="center" mt="md">
                <strong>Our Mission</strong>
                <br />
                {data.visionMission.mission}
              </Text>
            </Card>
          </SimpleGrid>
        </div>

        {/* Timeline Section */}
        <div className={classes.timelineContainer}>
          <h2 className={classes.timelineTitle}>★ OUR JOURNEY</h2>
          <div className={classes.timeline}>
            {data.timeline.map((event) => (
              <div key={event.year} className={classes.timelineEvent}>
                <div className={classes.timelineBullet}>
                  <span>{event.year}</span>
                </div>
                <div className={classes.timelineCard}>
                  <h3 className={classes.timelineCardTitle}>{event.title}</h3>
                  <div className={classes.timelineCardContent}>
                    <p>{event.centers} CENTER</p>
                    <p>{event.volunteers} VOLUNTEERS</p>
                    <p>{event.children} CHILDREN</p>
                  </div>
                  <span className={classes.timelineYear}>{event.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
