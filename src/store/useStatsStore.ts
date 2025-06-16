import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Stat } from '@/types/stat';

// Locale-specific mock data
const mockStats: Record<string, Stat[]> = {
  en: [
    {
      id: 'stat_1',
      icon: 'users',
      value: '5,000+',
      label: 'Beneficiaries',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_2',
      icon: 'community',
      value: '50+',
      label: 'Communities Served',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_3',
      icon: 'school',
      value: '100+',
      label: 'Schools Supported',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_4',
      icon: 'heart',
      value: '10K+',
      label: 'Donations Received',
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  hi: [
    {
      id: 'stat_1',
      icon: 'users',
      value: '5,000+',
      label: 'लाभार्थी',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_2',
      icon: 'community',
      value: '50+',
      label: 'सेवित समुदाय',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_3',
      icon: 'school',
      value: '100+',
      label: 'समर्थित विद्यालय',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'stat_4',
      icon: 'heart',
      value: '10K+',
      label: 'प्राप्त दान',
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
};

interface StatsState {
  stats: Stat[];
  loading: boolean;
  error: Error | null;
  fetchStats: (locale?: string) => Promise<void>;
}

export const useStatsStore = create<StatsState>()(
  devtools((set) => ({
    stats: [],
    loading: false,
    error: null,
    fetchStats: async (locale = 'en') => {
      try {
        set({ loading: true, error: null });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/stats?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        set({ stats: data.sort((a: Stat, b: Stat) => a.order - b.order), loading: false });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to locale-specific mock data
        const fallbackData = mockStats[locale] || mockStats.en;
        set({ stats: fallbackData, error: error as Error, loading: false });
      }
    }
  }))
);
