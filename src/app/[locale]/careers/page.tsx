'use client';

import { Container, Title, Grid, Card, Text, Stack, Group, Badge, Button } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCareerStore } from '@/store/useCareerStore';
import { useBannerStore } from '@/store/useBannerStore';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { withLocalizedArray } from '@/utils/localization';
import { IconClock, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import Link from 'next/link';
import { useDictionary } from '@/hooks/useDictionary';

export default function CareersPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const { fetchBanners, getBannerByType } = useBannerStore();
  const { jobs, loading, error, fetchJobs } = useCareerStore();
  
  // Get translations from dictionary
  const { dictionary } = useDictionary();
  const t = dictionary?.careers || {};
  const common = dictionary?.common || {};
  
  useEffect(() => {
    fetchBanners();
    fetchJobs();
  }, [fetchBanners, fetchJobs]);
  
  // Get localized jobs
  const localizedJobs = withLocalizedArray(jobs, locale);
  
  // Get banner
  const banner = getBannerByType('careers');
  
  return (
    <main>
      {banner ? (
        <LocalizedBanner
          banner={banner}
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.careers || 'Careers' }
          ]}
        />
      ) : (
        <Banner
          type="careers"
          title={t?.careers || 'Careers'}
          backgroundImage="/banners/careers-banner.svg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.careers || 'Careers' }
          ]}
        />
      )}
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title ta="center" order={2}>
            {t?.joinOurTeam || 'Join Our Team'}
          </Title>
          
          <Text size="lg" ta="center" maw={800} mx="auto">
            {t?.careersDescription || 'Join our passionate team and make a difference in the lives of children. Explore our current openings below to find your opportunity to contribute to our mission.'}
          </Text>
          
          {loading ? (
            <Text ta="center">{common?.loading || 'Loading job listings...'}</Text>
          ) : error ? (
            <Text ta="center" c="red">
              {common?.errorMessage || 'Error loading content. Please try again later.'}
            </Text>
          ) : localizedJobs.length === 0 ? (
            <Text ta="center">{t?.noJobs || 'No job openings available at this time. Please check back later.'}</Text>
          ) : (
            <Grid gutter="xl">
              {localizedJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, md: 6 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack gap="md">
                      <Group justify="apart" align="start">
                        <div>
                          <Title order={3}>{job.title}</Title>
                          <Text c="dimmed">{job.department}</Text>
                        </div>
                        <Badge size="lg" color={job.jobType === 'Full-time' ? 'blue' : 'green'}>
                          {job.jobType}
                        </Badge>
                      </Group>
                      
                      <Group gap="lg">
                        <Group gap="xs">
                          <IconMapPin size={18} color="#868e96" />
                          <Text size="sm">{job.location}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={18} color="#868e96" />
                          <Text size="sm">
                            {new Date(job.postedDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconBriefcase size={18} color="#868e96" />
                          <Text size="sm">{job.department}</Text>
                        </Group>
                      </Group>
                      
                      <Text lineClamp={3}>
                        {job.description?.replace(/<[^>]*>/g, ' ').substring(0, 150)}...
                      </Text>
                      
                      <Button 
                        component={Link}
                        href={`/${locale}/careers/${job.slug}`}
                        variant="light"
                      >
                        {t?.viewDetails || 'View Details'}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </main>
  );
}
