import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Stat } from '@/types/stat';

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
        set({ stats: [], error: error as Error, loading: false });
      }
    }
  }))
);
