"use client"

import { Container, Grid, Paper, Text, Group, RingProgress, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useRef, useState, useEffect, JSX } from 'react';
import { IconUsers, IconCalendarEvent, IconBuildingCommunity, IconCertificate } from '@tabler/icons-react';
import styles from './stats-section.module.css';

interface StatItem {
  title: string;
  value: number;
  suffix?: string;
  icon: JSX.Element;
  color: string;
  progress: number;
}

const stats: StatItem[] = [
  {
    title: 'Active Members',
    value: 1500,
    suffix: '+',
    icon: <IconUsers size={28} />,
    color: 'blue',
    progress: 85
  },
  {
    title: 'Events Hosted',
    value: 250,
    suffix: '+',
    icon: <IconCalendarEvent size={28} />,
    color: 'teal',
    progress: 75
  },
  {
    title: 'Communities',
    value: 50,
    icon: <IconBuildingCommunity size={28} />,
    color: 'violet',
    progress: 65
  },
  {
    title: 'Success Stories',
    value: 120,
    suffix: '+',
    icon: <IconCertificate size={28} />,
    color: 'pink',
    progress: 90
  }
];

function AnimatedNumber({ n, suffix = '' }: { n: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref: intersectionRef, entry } = useIntersection({
    threshold: 0.5,
    rootMargin: '50px',
  });

  useEffect(() => {
    let frame: number;
    if (entry?.isIntersecting) {
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCount(Math.floor(progress * n));

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        }
      };

      frame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frame);
  }, [n, entry?.isIntersecting]);

  return (
    <div ref={intersectionRef}>
      <Text size="xl" fw={700}>
        {count.toLocaleString()}{suffix}
      </Text>
    </div>
  );
}

export default function StatsSection() {
  return (
    <Container size="xl" py="xl">
      <Title order={2} size="h1" ta="center" mb="xl">
        Our Impact
      </Title>

      <Grid>
        {stats.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Paper
              shadow="sm"
              radius="md"
              p="xl"
              className={styles.statCard}
            >
              <Group>
                <RingProgress
                  size={80}
                  roundCaps
                  thickness={8}
                  sections={[{ value: stat.progress, color: `var(--mantine-color-${stat.color}-6)` }]}
                  label={
                    <Center>
                      {stat.icon}
                    </Center>
                  }
                />
                <div>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                    {stat.title}
                  </Text>
                  <AnimatedNumber n={stat.value} suffix={stat.suffix} />
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  );
}
