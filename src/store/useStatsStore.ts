import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Stat } from '@/types/stat';
import { mockStats } from '@/data/mock-stats';

interface StatsState {
  stats: Stat[];
  loading: boolean;
  error: Error | null;
  fetchStats: () => Promise<void>;
}

export const useStatsStore = create<StatsState>()(
  devtools((set) => ({
    stats: [],
    loading: false,
    error: null,
    fetchStats: async () => {
      try {
        set({ loading: true, error: null });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        set({ stats: data.sort((a: Stat, b: Stat) => a.order - b.order), loading: false });
      } catch (error) {
        console.error('Error fetching stats:', error);
        set({ stats: mockStats, error: error as Error, loading: false });
      }
    }
  }))
);
