'use client';
import { useEffect, useState } from 'react';
import { Banner } from '@/components/Banner';
import {
  Box,
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Button,
  Center,
  Loader,
  Skeleton,
  Alert
} from '@mantine/core';
import { useBannerStore } from '@/store/useBannerStore';
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { BannerType } from '@/types/banner';
import { useRouter } from 'next/navigation';
import classes from './our-initiatives.module.css';

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

// Simple card component for each initiative
function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const router = useRouter();
  const slug = initiative.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      onClick={() => router.push(`/our-initiatives/${slug}`)}
    >
      <Card.Section>
        <Image
          src={initiative.imageUrl}
          height={200}
          alt={initiative.title}
          fallbackSrc="/images/placeholders/initiative-placeholder.jpg"
          className={classes.cardImage}
        />
      </Card.Section>

      <Title order={3} mt="md" className={classes.cardTitle}>
        {initiative.title}
      </Title>

      <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
        {/* Simple text version of description - strip HTML */}
        {initiative.description.replace(/<[^>]*>?/gm, '')}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        rightSection={<IconArrowRight size={16} />}
      >
        Learn More
      </Button>
    </Card>
  );
}

export default function OurInitiativesPage() {
  const { fetchBanners, getBannerByType, loading: bannerLoading, error: bannerError } = useBannerStore();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }

        const response = await fetch(`${API_URL}/api/initiatives`);
        if (!response.ok) {
          throw new Error('Failed to fetch initiatives');
        }
        
        const data = await response.json();
        setInitiatives(data);
      } catch (err) {
        console.error('Error fetching initiatives:', err);
        setError('Failed to load initiatives. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  const banner = getBannerByType('initiatives');

  // Loading skeleton
  if (bannerLoading || loading) {
    return (
      <main>
        <Skeleton height={400} radius={0} />
        <Container size="lg" py="xl">
          <Skeleton height={60} width="50%" mx="auto" mb="xl" />
          
          <Grid>
            {[...Array(6)].map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card padding="lg" radius="md" withBorder>
                  <Skeleton height={200} mb="md" />
                  <Skeleton height={28} width="80%" mb="sm" />
                  <Skeleton height={60} mb="md" />
                  <Skeleton height={36} />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </main>
    );
  }

  if ((bannerError || error) && !banner) {
    return (
      <Container size="md" py="xl">
        <Alert
          icon={<IconInfoCircle />}
          title="Unable to load content"
          color="red"
        >
          {bannerError?.message || error || 'An error occurred. Please try again.'}
        </Alert>
      </Container>
    );
  }

  return (
    <main>
      <Banner
        type={banner?.type as BannerType || 'initiatives'}
        title={banner?.title || "Our Initiatives"}
        description={banner?.description || "Making a difference through sustainable development"}
        backgroundImage={banner?.backgroundImage || "/banners/initiatives-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Our Initiatives' }
        ]}
      />

      <Container size="lg" py="xl">
        <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
          Our Initiatives
        </Title>

        {initiatives.length > 0 ? (
          <Grid gutter="lg">
            {initiatives.map(initiative => (
              <Grid.Col key={initiative.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <InitiativeCard initiative={initiative} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Center py="xl">
            <Text c="dimmed">No initiatives found. Check back soon!</Text>
          </Center>
        )}
      </Container>
    </main>
  );
}

