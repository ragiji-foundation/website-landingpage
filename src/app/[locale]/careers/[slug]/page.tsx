'use client';

import { Container, Title, Text, Button, Stack, Group, Badge, Paper } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SimpleRichText } from '@/components/SimpleRichText';
import { useCareerStore, JobListing } from '@/store/useCareerStore';
import { useDictionary } from '@/hooks/useDictionary';

export default function CareerDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'en';
  
  const { fetchJobById, loading, error } = useCareerStore();
  const [job, setJob] = useState<JobListing | null>(null);
  
  // Get translations
  const { dictionary } = useDictionary();
  const t = dictionary?.careers || {};
  const common = dictionary?.common || {};
  
  useEffect(() => {
    const loadJob = async () => {
      if (slug) {
        const foundJob = await fetchJobById(slug, locale);
        if (foundJob) {
          setJob(foundJob);
        }
      }
    };
    
    loadJob();
  }, [slug, locale, fetchJobById]);
  
  if (loading) {
    return (
      <Container py="xl">
        <Text ta="center">{common?.loading || 'Loading job details...'}</Text>
      </Container>
    );
  }
  
  if (error || !job) {
    return (
      <Container py="xl">
        <Text ta="center" c="red">
          {error?.message || common?.errorMessage || 'Job not found or error loading details.'}
        </Text>
      </Container>
    );
  }

  const handleApply = () => {
    // Open application in new tab or modal
    window.open(job.applicationUrl || `mailto:careers@ragijifoundation.com?subject=Application for ${job.title}`, '_blank');
  };

  return (
    <main>
      <Banner
        type="careers"
        title={job.title || "Job Details"}
        backgroundImage="/banners/careers-banner.svg"
        breadcrumbs={[
          { label: common?.home || "Home", link: `/${locale}` },
          { label: t?.careers || "Careers", link: `/${locale}/careers` },
          { label: job.title || "Job Details" },
        ]}
      />

      <Container size="md" py="xl">
        <Paper shadow="xs" p="lg" radius="md" withBorder>
          <Stack gap="lg">
            <Group justify="apart" align="start">
              <div>
                <Title order={2}>{job.title}</Title>
                <Text c="dimmed">{job.department}</Text>
              </div>
              <Group>
                <Badge size="lg" variant="filled" color={job.jobType === 'Full-time' ? 'blue' : 'green'}>
                  {job.jobType}
                </Badge>
                <Badge size="lg" variant="outline">
                  {job.location}
                </Badge>
              </Group>
            </Group>

            <Text size="xl" fw={700}>
              {t?.jobOverview || 'Job Overview'}
            </Text>
            <SimpleRichText content={job.description} />

            <Text size="xl" fw={700}>
              {t?.responsibilities || 'Responsibilities'}
            </Text>
            <SimpleRichText content={job.responsibilities} />

            <Text size="xl" fw={700}>
              {t?.qualifications || 'Qualifications'}
            </Text>
            <SimpleRichText content={job.qualifications} />

            {job.benefits && (
              <>
                <Text size="xl" fw={700}>
                  {t?.benefits || 'Benefits'}
                </Text>
                <SimpleRichText content={job.benefits} />
              </>
            )}

            <Group justify="center" mt="xl">
              <Button 
                size="lg" 
                onClick={handleApply}
              >
                {t?.applyNow || 'Apply Now'}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}