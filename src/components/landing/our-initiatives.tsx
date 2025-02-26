"use client";

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Stack,
  Group,
  Button
} from "@mantine/core";
import {
  IconArrowRight,
  IconBook,
  IconHeartHandshake,
  IconHome,
  IconWoman,
  IconTool,
  IconHeart
} from "@tabler/icons-react";
import styles from './our-initiatives.module.css';
import { JSX } from "react";

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    id: 'education',
    title: "Education",
    description: "Providing quality education to underprivileged children through our learning centers and digital literacy programs.",
    icon: <IconBook size={24} />,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    link: "/initiatives/education"
  },
  {
    id: 'healthcare',
    title: "Healthcare",
    description: "Ensuring access to basic healthcare services and organizing medical camps in rural areas.",
    icon: <IconHeartHandshake size={24} />,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    link: "/initiatives/healthcare"
  },
  {
    id: 'rural-development',
    title: "Rural Development",
    description: "Empowering rural communities through sustainable development projects and infrastructure support.",
    icon: <IconHome size={24} />,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    link: "/initiatives/rural-development"
  },
  {
    id: 'women-empowerment',
    title: "Women Empowerment",
    description: "Supporting women through education, skill development, and entrepreneurship programs.",
    icon: <IconWoman size={24} />,
    image: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4",
    link: "/initiatives/women-empowerment"
  },
  {
    id: 'skill-development',
    title: "Skill Development",
    description: "Providing vocational training and career guidance to youth for better employment opportunities.",
    icon: <IconTool size={24} />,
    image: "https://images.unsplash.com/photo-1590649880765-91b1956b8276",
    link: "/initiatives/skill-development"
  }
];

export default function OurInitiatives() {
  return (
    <Container size="xl" py="xl">
      <Stack align="center" mb="xl">
        <Title
          order={2}
          size="h1"
          ta="center"
          mb="sm"
        >
          Our Initiatives
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          Working together to create positive change in communities through various sustainable development programs.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
        {initiatives.map((initiative) => (
          <Card
            key={initiative.id}
            padding="lg"
            radius="md"
            className={styles.initiativeCard}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${initiative.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
            }}
            onClick={() => window.location.href = initiative.link}
          >
            <Stack gap="md">
              <Group>
                {initiative.icon}
                <Title order={3} size="h4">
                  {initiative.title}
                </Title>
              </Group>

              <Text size="sm" lineClamp={3}>
                {initiative.description}
              </Text>

              <Group gap="xs" mt="auto">
                <Text size="sm" style={{ textDecoration: 'underline' }}>Learn More</Text>
                <IconArrowRight size={16} />
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Stack align="center" mt={40}>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          size="lg"
          radius="md"
          rightSection={<IconHeart size={20} />}
          component="a"
          href="/donate"
        >
          Donate Now
        </Button>
        <Text size="sm" c="dimmed">
          Your support helps us create lasting change
        </Text>
      </Stack>
    </Container>
  );
}
