'use client';
import React, { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useLanguage } from '@/context/LanguageContext';
import { IconUsers, IconAward, IconBuildingBank, IconHeartHandshake } from '@tabler/icons-react';
import { apiClient, safeApiCall } from '@/utils/api-client';
import classes from './stats-section.module.css';

interface Stat {
  id: string;
  value: string;
  label: string;
  labelHi?: string | null;
  icon?: string;
  order: number;
}

// Fallback stats data
const fallbackStats: Stat[] = [
  { id: '1', value: '5000+', label: 'Lives Impacted', labelHi: 'प्रभावित जीवन', icon: 'impact', order: 0 },
  { id: '2', value: '100+', label: 'Projects', labelHi: 'परियोजनाएं', icon: 'award', order: 1 },
  { id: '3', value: '1000+', label: 'Beneficiaries', labelHi: 'लाभार्थी', icon: 'users', order: 2 },
  { id: '4', value: '25+', label: 'Communities', labelHi: 'समुदाय', icon: 'community', order: 3 },
  { id: '5', value: '200+', label: 'Volunteers', labelHi: 'स्वयंसेवक', icon: 'users', order: 4 },
];

const statIcons: Record<string, React.ReactNode> = {
  users: <IconUsers size={24} stroke={1.5} />,
  award: <IconAward size={24} stroke={1.5} />,
  community: <IconBuildingBank size={24} stroke={1.5} />,
  impact: <IconHeartHandshake size={24} stroke={1.5} />,
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
        
        const stats = await safeApiCall(
          () => apiClient.get<Stat[]>('/stats', fallbackStats),
          fallbackStats,
          'stats'
        );
        
        setStats(stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container size="xl" px={{ base: '0.5rem', sm: '1rem' }} style={{ maxWidth: '100vw', overflow: 'hidden' }}>
        <div className={classes.statsGrid} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: 'clamp(0.25rem, 1vw, 1rem)',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={classes.statCard} style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              boxShadow: 'none',
              textAlign: 'center',
              padding: 'clamp(0.25rem, 1vw, 1rem)',
              minWidth: 0,
              overflow: 'hidden',
            }}>
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
    <Container size="xl" px={{ base: '0.5rem', sm: '1rem' }} style={{ maxWidth: '100vw', overflow: 'hidden' }}>
      <div className={classes.statsGrid} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: 'clamp(0.125rem, 1vw, 1rem)',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
      }}>
        {stats.map((stat, index) => {
          const label = language === 'hi' && stat.labelHi ? stat.labelHi : stat.label;
          const fontFamily = language === 'hi' ? 'var(--mantine-font-family-hindi)' : 'inherit';
          const icon = stat.icon && statIcons[stat.icon] ? statIcons[stat.icon] : <IconAward size={24} stroke={1.5} />;
          return (
            <div key={stat.id} className={classes.statCard} style={{ 
              animationDelay: `${index * 0.1}s`,
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              boxShadow: 'none',
              textAlign: 'center',
              padding: 'clamp(0.25rem, 1vw, 1rem)',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              overflow: 'hidden',
            }}>
              <div className={classes.iconWrapper} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                width: 'clamp(1.5rem, 3vw, 2.5rem)',
                height: 'clamp(1.5rem, 3vw, 2.5rem)',
                margin: '0 auto clamp(0.25rem, 0.5vw, 0.5rem) auto',
              }}>
                <div style={{ 
                  width: 'clamp(12px, 2.5vw, 20px)', 
                  height: 'clamp(12px, 2.5vw, 20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {icon}
                </div>
              </div>
              <div className={classes.value} style={{ 
                fontFamily,
                fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 'clamp(0.125rem, 0.25vw, 0.25rem)',
                lineHeight: 1,
              }}>
                <AnimatedNumber value={stat.value} />
              </div>
              <div className={classes.label} style={{ 
                fontFamily,
                fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                textAlign: 'center',
                lineHeight: 1.1,
                wordBreak: 'break-word',
                hyphens: 'auto',
              }}>{label}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}