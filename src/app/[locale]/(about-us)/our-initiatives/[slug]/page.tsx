'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Image,
  Box,
  Skeleton,
  Alert,
  Button,
  Paper,
} from '@mantine/core';
import { useInitiativesStore } from '@/store/useInitiativesStore';
import { Banner } from '@/components/Banner';
import { IconArrowLeft, IconInfoCircle } from '@tabler/icons-react';
import classes from './initiative.module.css';

export default function InitiativeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const slug = params.slug as string;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { 
    loading, 
    error: storeError, 
    fetchInitiatives, 
    getInitiativeBySlug 
  } = useInitiativesStore();

  useEffect(() => {
    fetchInitiatives(locale);
  }, [fetchInitiatives, locale]);

  // Get the initiative and localize its content
  const initiative = useMemo(() => getInitiativeBySlug(slug), [getInitiativeBySlug, slug]);
  const localizedInitiative = useMemo(() => 
    initiative ? {
      ...initiative,
      title: locale === 'hi' && initiative.titleHi ? initiative.titleHi : initiative.title,
      description: locale === 'hi' && initiative.descriptionHi ? initiative.descriptionHi : initiative.description
    } : null
  , [initiative, locale]);

  useEffect(() => {
    // Set error message if initiative is not found after loading
    if (!loading && !storeError && !localizedInitiative) {
      setErrorMessage(locale === 'hi' ? 'पहल नहीं मिली' : 'Initiative not found');
    } else if (storeError) {
      setErrorMessage(locale === 'hi' ? 'डेटा लोड करने में त्रुटि' : 'Error loading data');
    }
  }, [loading, storeError, localizedInitiative, locale]);

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
  if (errorMessage || !localizedInitiative) {
    return (
      <main>
        <Banner
          type="initiatives"
          title={locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives'}
          description={locale === 'hi' ? 'सतत विकास के माध्यम से बदलाव लाना' : 'Making a difference through sustainable development'}
        />
        <Container size="lg" py="xl">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft />}
            mb="xl"
            onClick={() => router.push(`/${locale}/our-initiatives`)}
          >
            {locale === 'hi' ? 'पहल पर वापस जाएं' : 'Back to initiatives'}
          </Button>

          <Alert
            icon={<IconInfoCircle />}
            title={errorMessage || (locale === 'hi' ? 'पहल नहीं मिली' : 'Initiative not found')}
            color="red"
          >
            {locale === 'hi' 
              ? 'हम जिस पहल को आप खोज रहे हैं वह नहीं मिली। कृपया पहल पृष्ठ पर वापस जाएं और पुनः प्रयास करें।'
              : 'We couldn&apos;t find the initiative you&apos;re looking for. Please return to the initiatives page and try again.'}
          </Alert>
        </Container>
      </main>
    );
  }

  // Success state
  return (
    <main>
      <Banner
        type="initiatives"
        title={localizedInitiative.title}
        description={locale === 'hi' ? 'सतत विकास के माध्यम से बदलाव लाना' : 'Making a difference through sustainable development'}
        backgroundImage={localizedInitiative.imageUrl || "/images/placeholders/initiative-banner.jpg"}
        breadcrumbs={[
          { label: locale === 'hi' ? 'होम' : 'Home', link: `/${locale}` },
          { label: locale === 'hi' ? 'हमारी पहल' : 'Our Initiatives', link: `/${locale}/our-initiatives` },
          { label: localizedInitiative.title }
        ]}
      />

      <Container size="lg" py="xl">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft />}
          mb="xl"
          onClick={() => router.push(`/${locale}/our-initiatives`)}
        >
          {locale === 'hi' ? 'सभी पहल पर वापस जाएं' : 'Back to all initiatives'}
        </Button>

        <Paper shadow="xs" p="xl" radius="md" withBorder>
          <Title order={1} className={classes.initiativeTitle}>
            {localizedInitiative.title}
          </Title>

          {localizedInitiative.imageUrl && (
            <Box my="xl" className={classes.imageContainer}>
              <Image
                src={localizedInitiative.imageUrl}
                alt={localizedInitiative.title}
                radius="md"
                fallbackSrc="/images/placeholders/initiative-placeholder.jpg"
              />
            </Box>
          )}

          {/* Rich text content - using dangerouslySetInnerHTML to render HTML */}
          <Box my="xl" className={classes.content}>
            <div
              dangerouslySetInnerHTML={{ __html: localizedInitiative.description }}
            />
          </Box>
        </Paper>
      </Container>
    </main>
  );
}