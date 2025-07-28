import { create } from 'zustand';
import { Award } from '@/types/award';

interface AwardState {
  awards: Award[];
  loading: boolean;
  error: Error | null;
  fetchAwards: (locale?: string) => Promise<void>;
}

export const useAwardStore = create<AwardState>((set) => ({
  awards: [],
  loading: false,
  error: null,
  fetchAwards: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`/api/awards?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch awards');
      const data = await response.json();
      set({ awards: data, loading: false });
    } catch (error) {
      console.error('Error fetching awards:', error);
      set({ awards: [], error: error as Error, loading: false });
    }
  },
}));
