'use client';
import { useEffect } from 'react';
import { Container, SimpleGrid, Paper, Text, Group } from '@mantine/core';
import { IconUsers, IconBuildingCommunity, IconSchool, IconHeart } from '@tabler/icons-react';
import { useStatsStore } from '@/store/useStatsStore';
import { StatsGridSkeleton } from '../skeletons/StatsGridSkeleton';

// Icon mapping
const ICONS = {
  'users': IconUsers,
  'community': IconBuildingCommunity,
  'school': IconSchool,
  'heart': IconHeart,
  // Add more icons as needed
};

export default function StatsSection() {
  const { stats, loading, error, fetchStats } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <StatsGridSkeleton />;
  }

  // Use fallback data if there's an error or no data
  const displayStats = stats.length > 0 ? stats : [
    { id: '1', icon: 'users', value: '5,000+', label: 'Users' },
    { id: '2', icon: 'community', value: '50+', label: 'Communities' },
    { id: '3', icon: 'school', value: '100+', label: 'Schools' },
    { id: '4', icon: 'heart', value: '10K+', label: 'Donations' }
  ];

  return (
    <Container size="lg" py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {displayStats.map((stat) => {
          const Icon = ICONS[stat.icon as keyof typeof ICONS] || IconHeart;
          return (
            <Paper key={stat.id} withBorder p="md" radius="md">
              <Group>
                <Icon size={28} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xl" fw={700}>{stat.value}</Text>
                  <Text size="sm" c="dimmed">{stat.label}</Text>
                </div>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
