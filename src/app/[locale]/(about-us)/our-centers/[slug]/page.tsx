'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCentersStore } from '@/store/useCentersStore';
import { Container, Title, Text, Image, Badge, Stack, Button } from '@mantine/core';
import Link from 'next/link';

export default function CenterDetailPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const slug = params.slug as string;
  const { centers, fetchCenters, loading, error } = useCentersStore();
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    if (!centers.length) fetchCenters();
  }, [centers, fetchCenters]);

  useEffect(() => {
    if (centers.length) {
      setCenter(centers.find(c => c.slug === slug));
    }
  }, [centers, slug]);

  // Log all data for debugging
  console.log('centers:', centers);
  console.log('selected center:', center);

  if (loading) return <div>Loading center...</div>;
  if (error) return <div>Error loading center: {error.message}</div>;
  if (!center) return <div>Center not found.</div>;

  // Localized fields
  const name = locale === 'hi' && center.nameHi ? center.nameHi : center.name;
  const location = locale === 'hi' && center.locationHi ? center.locationHi : center.location;
  const description = locale === 'hi' && center.descriptionHi ? center.descriptionHi : center.description;

  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        {center.imageUrl && (
          <Image src={center.imageUrl} height={300} alt={name} />
        )}
        <Title order={2}>{name}</Title>
        <Badge color="blue">{location}</Badge>
        <Text size="md" mt="md">
          {/* Render HTML safely for description */}
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Text>
        <Text size="sm" color="dimmed">{center.contactInfo}</Text>
        <Button component={Link} href={`/${locale}/our-centers`} variant="outline" mt="md">
          {locale === 'hi' ? 'सभी केंद्र देखें' : 'Back to Centers'}
        </Button>
      </Stack>
    </Container>
  );
}