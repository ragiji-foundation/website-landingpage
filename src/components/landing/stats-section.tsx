'use client';
import { useEffect } from 'react';
import { Container, SimpleGrid, Paper, Text, Title, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconUsers, IconBuildingCommunity, IconSchool, IconHeart } from '@tabler/icons-react';
import { useStatsStore } from '@/store/useStatsStore';
import { StatsGridSkeleton } from '../skeletons/StatsGridSkeleton';

const ICONS = {
  'users': IconUsers,
  'community': IconBuildingCommunity,
  'school': IconSchool,
  'heart': IconHeart,
};

export default function StatsSection() {
  const { stats, loading, error, fetchStats } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <StatsGridSkeleton />;
  }

  if (error) {
    notifications.show({
      title: 'Notice',
      message: 'Using fallback data. Some features might be limited.',
      color: 'yellow'
    });
  }

  return (
    <Container size="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {stats.map((stat) => {
          const Icon = ICONS[stat.icon as keyof typeof ICONS] || IconHeart;
          return (
            <Paper key={stat.id} withBorder p="md" radius="md">
              <Group align="flex-start">
                <Icon size={32} color="var(--mantine-color-blue-filled)" />
                <div>
                  <Text size="xl" fw={500}>
                    {stat.value}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {stat.label}
                  </Text>
                </div>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
