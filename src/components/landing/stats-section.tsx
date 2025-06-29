'use client';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { IconUsers, IconAward, IconBuildingBank, IconHeartHandshake } from '@tabler/icons-react';
import classes from './stats-section.module.css';

interface Stat {
  id: string;
  value: string;
  label: string;
  labelHi?: string | null;
  icon?: string;
  order: number;
}

const statIcons: Record<string, React.ReactNode> = {
  users: <IconUsers size={40} stroke={1.5} />,
  award: <IconAward size={40} stroke={1.5} />,
  community: <IconBuildingBank size={40} stroke={1.5} />,
  impact: <IconHeartHandshake size={40} stroke={1.5} />,
};

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const start = 0;
    const end = parseInt(value.replace(/\D/g, '')) || 0;
    if (isNaN(end) || end === 0) {
      setDisplay(value);
      return;
    }
    let current = start;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(current.toLocaleString() + value.replace(/\d/g, ''));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{display}</span>;
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch('https://admin.ragijifoundation.com/api/stats', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        setStats([
          { id: '1', value: '10K+', label: 'Lives Impacted', labelHi: 'प्रभावित जीवन', icon: 'impact', order: 0 },
          { id: '2', value: '50+', label: 'Projects', labelHi: 'परियोजनाएं', icon: 'award', order: 1 },
          { id: '3', value: '20+', label: 'Communities', labelHi: 'समुदाय', icon: 'community', order: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container size="lg" py={80}>
        <div className={classes.statsGrid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={classes.statCard}>
              <div className={classes.skeletonIcon} />
              <div className={classes.skeletonValue} />
              <div className={classes.skeletonLabel} />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" py={80}>
      <div className={classes.statsGrid}>
        {stats.map((stat, index) => {
          const label = language === 'hi' && stat.labelHi ? stat.labelHi : stat.label;
          const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
          const icon = stat.icon && statIcons[stat.icon] ? statIcons[stat.icon] : <IconAward size={40} stroke={1.5} />;
          return (
            <div key={stat.id} className={classes.statCard} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={classes.iconWrapper}>{icon}</div>
              <div className={classes.value} style={{ fontFamily }}>
                <AnimatedNumber value={stat.value} />
              </div>
              <div className={classes.label} style={{ fontFamily }}>{label}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}