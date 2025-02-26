'use client';
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, Title, Text, Image, Skeleton, Stack } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { ErrorBoundary } from '@/components/error-boundary';
import styles from './awards.module.css';

interface Award {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  organization: string;
}

// Mock data for fallback
const mockAwards: Award[] = [
  {
    id: '1',
    title: 'Excellence in Social Impact',
    year: '2023',
    description: 'Recognized for outstanding contribution to rural education and community development.',
    imageUrl: '/awards/excellence-award.jpg',
    organization: 'National NGO Foundation'
  },
  {
    id: '2',
    title: 'Best Education Initiative',
    year: '2022',
    description: 'Awarded for innovative approaches in providing quality education to underprivileged children.',
    imageUrl: '/awards/education-award.jpg',
    organization: 'Education Excellence Forum'
  },
  {
    id: '3',
    title: 'Women Empowerment Champion',
    year: '2023',
    description: 'Honored for creating sustainable livelihood opportunities for over 1000 women through skill development and microfinance initiatives.',
    imageUrl: '/awards/women-empowerment-award.jpg',
    organization: 'National Commission for Women'
  },
  {
    id: '4',
    title: 'Digital Innovation Award',
    year: '2023',
    description: 'Recognized for implementing innovative digital literacy programs reaching 5000+ rural students during the pandemic.',
    imageUrl: '/awards/digital-innovation-award.jpg',
    organization: 'Tech for Change Foundation'
  },
  {
    id: '5',
    title: 'Healthcare Initiative Excellence',
    year: '2022',
    description: 'Awarded for organizing 100+ medical camps and providing healthcare access to remote villages through mobile clinics.',
    imageUrl: '/awards/healthcare-award.jpg',
    organization: 'Rural Health Foundation'
  },
  {
    id: '6',
    title: 'Environmental Sustainability Award',
    year: '2022',
    description: 'Recognized for implementing solar power projects in 25 villages and promoting sustainable agricultural practices.',
    imageUrl: '/awards/environmental-award.jpg',
    organization: 'Green Earth Initiative'
  },
  {
    id: '7',
    title: 'Youth Leadership Recognition',
    year: '2022',
    description: 'Honored for training 500+ youth leaders and creating employment opportunities through skill development programs.',
    imageUrl: '/awards/youth-leadership-award.jpg',
    organization: 'Youth Development Council'
  },
  {
    id: '8',
    title: 'Community Impact Award',
    year: '2021',
    description: 'Awarded for transforming 20 villages through integrated development programs focusing on education, health, and livelihood.',
    imageUrl: '/awards/community-impact-award.jpg',
    organization: 'Social Impact Forum'
  }
];

function AwardGrid({ awards }: { awards: Award[] }) {
  return (
    <Grid gutter="xl">
      {awards.map((award) => (
        <Grid.Col key={award.id} span={{ base: 12, sm: 6, md: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.awardCard}
          >
            <Card.Section>
              <Image
                src={award.imageUrl}
                height={200}
                alt={award.title}
                fallbackSrc="/award-placeholder.jpg"
              />
            </Card.Section>

            <Stack mt="md">
              <Title order={3}>{award.title}</Title>
              <Text size="sm" c="dimmed" fw={500}>
                {award.organization} • {award.year}
              </Text>
              <Text size="sm" lineClamp={3}>
                {award.description}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function AwardsSkeleton() {
  return (
    <Grid gutter="xl">
      {[...Array(6)].map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
          <Card padding="lg" radius="md">
            <Skeleton height={200} mb="md" />
            <Skeleton height={20} width="80%" mb="sm" />
            <Skeleton height={15} width="40%" mb="md" />
            <Skeleton height={40} />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

function AwardsContent() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/awards');
        if (!response.ok) throw new Error('Failed to fetch awards');
        const data = await response.json();
        setAwards(data);
      } catch (error) {
        console.error('Error fetching awards:', error);
        // Fallback to mock data
        setAwards(mockAwards);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  if (loading) {
    return <AwardsSkeleton />;
  }

  return <AwardGrid awards={awards} />;
}

export default function AwardsPage() {
  return (
    <ErrorBoundary>
      <main>
        <Banner
          type="about"
          title="Our Awards & Recognition"
          description="Celebrating our achievements and milestones in making a difference."
          backgroundImage="/banners/awards-banner.jpg"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Awards' }
          ]}
          tags={['Excellence', 'Impact', 'Recognition']}
        />

        <Container size="xl" py="xl">
          <AwardsContent />
        </Container>
      </main>
    </ErrorBoundary>
  );
}