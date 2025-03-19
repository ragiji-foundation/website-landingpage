'use client';
import { useEffect, useState } from 'react';
import { Container, SimpleGrid, Text, Title, Skeleton, rem, Center } from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import classes from './stats-section.module.css';

interface Stat {
  id: number;
  value: string;
  label: string;
  order: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null);

        // Add timeout to fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://admin.ragijifoundation.com/api/stats', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);

        // Fallback to default stats if API fails
        setStats([
          { id: 1, value: '10K+', label: 'Lives Impacted', order: 0 },
          { id: 2, value: '50+', label: 'Projects', order: 1 },
          { id: 3, value: '20+', label: 'Communities', order: 2 },
        ]);

        // Only show error in console, don't break UI
        console.error(error instanceof Error ? error.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    // Implement retry logic
    const attemptFetch = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          await fetchStats();
          return;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    attemptFetch();
  }, []);

  if (loading) {
    return (
      <Container size="lg" py={80}>
        <div className={classes.statsGrid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={classes.statCard}>
              <Skeleton height={60} mb="md" radius="md" />
              <Skeleton height={24} width="70%" radius="md" />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" py={80}>
      <div className={classes.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={classes.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Text className={classes.value}>{stat.value}</Text>
            <Text className={classes.label}>{stat.label}</Text>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}