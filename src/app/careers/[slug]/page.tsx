import { Container, Title, Text, Button, Stack, Group, Badge, Paper } from '@mantine/core';
import { IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { Banner } from '@/components/Banner';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LexicalRender } from '@/components/LexicalRender';

interface Career {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string | object;
  requirements: string | object;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ✅ Fetch Career Data from API
async function getCareer(slug: any): Promise<Career | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/careers/${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error('Error fetching career:', error);
    return null;
  }
}

// ✅ Server Component
export default async function CareerDetailsPage({ params }: any) {
  if (!params?.slug) return notFound();

  const career = await getCareer(params.slug);
  if (!career) return notFound();

  // ✅ Safe JSON Parsing
  const safeParse = (data: string | object) => {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
      return data;
    }
  };

  return (
    <main>
      <Banner
        type="careers"
        title={career.title}
        description={career.description as string}
        backgroundImage="/banners/careers-banner.jpg"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Careers", link: "/careers" },
          { label: career.title },
        ]}
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
              <Title order={3} mb="md">Description</Title>
              <LexicalRender content={safeParse(career.description)} />
            </div>

            <div>
              <Title order={3} mb="md">Requirements</Title>
              <LexicalRender content={safeParse(career.requirements)} />
            </div>

            {career.isActive && (
              <Group justify="center" mt="xl">
                <Button component={Link} href={`/careers/${career.slug}/apply`} size="lg">
                  Apply for this Position
                </Button>
              </Group>
            )}
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}