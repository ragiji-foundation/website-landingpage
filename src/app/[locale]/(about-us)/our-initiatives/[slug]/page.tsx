'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Image,
  Box,
  Skeleton,
  Alert,
  Button,
  Paper,
} from '@mantine/core';
import { Banner } from '@/components/Banner';
import { IconArrowLeft, IconInfoCircle } from '@tabler/icons-react';
import classes from './initiative.module.css';

// Initiative interface matching our Prisma schema
interface Initiative {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function InitiativeDetailPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitiative = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        // Fetch all initiatives then find by title/slug
        const response = await fetch(`${API_URL}/api/initiatives`);
        if (!response.ok) {
          throw new Error('Failed to fetch initiatives');
        }

        const initiatives = await response.json();

        // Find the initiative by comparing the slugified title with our slug param
        const found = initiatives.find(
          (item: Initiative) => item.title.toLowerCase().replace(/\s+/g, '-') === slug
        );

        if (found) {
          setInitiative(found);
        } else {
          setError('Initiative not found');
        }
      } catch (err) {
        console.error('Error fetching initiative details:', err);
        setError('Failed to load initiative details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchInitiative();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="lg" py="xl">
          <Button variant="subtle" leftSection={<IconArrowLeft />} mb="xl">
            Back to initiatives
          </Button>
          <Skeleton height={50} width="80%" mb="lg" />
          <Skeleton height={200} mb="lg" />
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} height={20} mb="xs" />
          ))}
        </Container>
      </main>
    );
  }

  // Error state
  if (error || !initiative) {
    return (
      <main>
        <Banner
          type="initiatives"
          title="Our Initiatives"
          description="Making a difference through sustainable development"
        />
        <Container size="lg" py="xl">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft />}
            mb="xl"
            onClick={() => router.push('/our-initiatives')}
          >
            Back to initiatives
          </Button>

          <Alert
            icon={<IconInfoCircle />}
            title={error || 'Initiative not found'}
            color="red"
          >
            We couldn&lsquo;t find the initiative you're looking for. Please return to the initiatives page and try again.
          </Alert>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Banner
        type="initiatives"
        title={initiative.title}
        description="Making a difference through sustainable development"
        backgroundImage={initiative.imageUrl || "/images/placeholders/initiative-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Our Initiatives', link: '/our-initiatives' },
          { label: initiative.title }
        ]}
      />

      <Container size="lg" py="xl">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft />}
          mb="xl"
          onClick={() => router.push('/our-initiatives')}
        >
          Back to all initiatives
        </Button>

        <Paper shadow="xs" p="xl" radius="md" withBorder>
          <Title order={1} className={classes.initiativeTitle}>
            {initiative.title}
          </Title>

          {initiative.imageUrl && (
            <Box my="xl" className={classes.imageContainer}>
              <Image
                src={initiative.imageUrl}
                alt={initiative.title}
                radius="md"
                fallbackSrc="/images/placeholders/initiative-placeholder.jpg"
              />
            </Box>
          )}

          {/* Rich text content - using dangerouslySetInnerHTML to render HTML */}
          <Box my="xl" className={classes.content}>
            <div
              dangerouslySetInnerHTML={{ __html: initiative.description }}
            />
          </Box>
        </Paper>
      </Container>
    </main>
  );
}