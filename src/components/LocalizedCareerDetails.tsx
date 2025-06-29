'use client';

import { Container, Title, Text, Button, Stack, Group, Badge, Paper } from '@mantine/core';
import { IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { Banner } from '@/components/Banner';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SimpleRichText } from '@/components/SimpleRichText';
import { getLocalizedBreadcrumbs } from '@/utils/breadcrumbs';
import { BannerType } from '@/types/banner';

interface LocalizedCareerDetailsProps {
  career: Career;
  banner?: {
    type: string;
    title: string;
    description?: string;
    backgroundImage: string;
  } | null;
}

interface Career {
  id: string;
  slug: string;
  title: string;
  titleHi?: string;
  location: string;
  locationHi?: string;
  type: string;
  typeHi?: string;
  description: string;
  descriptionHi?: string;
  requirements: string;
  requirementsHi?: string;
  isActive: boolean;
}

export function LocalizedCareerDetails({ career, banner }: LocalizedCareerDetailsProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const isHindi = locale === 'hi';
  
  // Generate breadcrumbs
  const breadcrumbs = getLocalizedBreadcrumbs([
    { key: 'home', link: `/${locale}` },
    { key: 'careers', link: `/${locale}/careers` },
    { label: career.title }
  ], locale);
  
  return (
    <main>
      <Banner
        type={(banner?.type || 'careers') as BannerType}
        title={career.title}
        description={banner?.description || (isHindi
          ? 'हमारी टीम में शामिल होकर परिवर्तन लाएं'
          : 'Join our team and make a difference'
        )}
        backgroundImage={banner?.backgroundImage || '/banners/careers-banner.jpg'}
        breadcrumbs={breadcrumbs}
      />
      
      <Container size="lg" py="xl">
        <Paper shadow="xs" p="xl" withBorder>
          <Stack gap="xl">
            <Group>
              <Group gap="xs">
                <IconMapPin size={16} />
                <Text>{career.location}</Text>
              </Group>
              <Group gap="xs">
                <IconBriefcase size={16} />
                <Badge variant="light">{career.type}</Badge>
              </Group>
            </Group>

            <div>
              <Title order={3} mb="md">{isHindi ? 'विवरण' : 'Description'}</Title>
              <div className="mb-8">
                <SimpleRichText content={career.description} />
              </div>
            </div>

            <div>
              <Title order={3} mb="md">{isHindi ? 'आवश्यकताएं' : 'Requirements'}</Title>
              <div className="mb-8">
                <SimpleRichText content={career.requirements} />
              </div>
            </div>

            {career.isActive && (
              <Group justify="center" mt="xl">
                <Button 
                  component={Link} 
                  href={`/${locale}/careers/${career.slug}/apply`} 
                  size="lg"
                >
                  {isHindi ? 'इस पद के लिए आवेदन करें' : 'Apply for this Position'}
                </Button>
              </Group>
            )}
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}