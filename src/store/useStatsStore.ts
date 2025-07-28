import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Stat } from '@/types/stat';

import { apiClient, safeApiCall } from '@/utils/api-client';

interface StatsState {
  stats: Stat[];
  loading: boolean;
  error: Error | null;
  fetchStats: (locale?: string) => Promise<void>;
}

// Fallback data
const fallbackStats: Stat[] = [
  { id: '1', icon: 'users', value: '500+', label: 'Students Helped', order: 1 },
  { id: '2', icon: 'building', value: '25+', label: 'Centers', order: 2 },
  { id: '3', icon: 'heart', value: '100+', label: 'Volunteers', order: 3 },
  { id: '4', icon: 'award', value: '10+', label: 'Awards', order: 4 }
];

export const useStatsStore = create<StatsState>()(
  devtools((set) => ({
    stats: [],
    loading: false,
    error: null,
    fetchStats: async (locale = 'en') => {
      set({ loading: true, error: null });
      
      const stats = await safeApiCall(
        () => apiClient.get<Stat[]>('/stats', fallbackStats, { locale }),
        fallbackStats,
        'stats'
      );
      
      set({ 
        stats: stats.sort((a: Stat, b: Stat) => a.order - b.order), 
        loading: false,
        error: null
      });
    }
  }))
);
