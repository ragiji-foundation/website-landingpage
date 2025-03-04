import { create } from 'zustand';
import { Award } from '@/types/award';
import { mockAwards } from '@/data/mock-awards';

interface AwardState {
  awards: Award[];
  loading: boolean;
  error: Error | null;
  fetchAwards: () => Promise<void>;
}

export const useAwardStore = create<AwardState>((set) => ({
  awards: [],
  loading: false,
  error: null,
  fetchAwards: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/awards`);
      if (!response.ok) throw new Error('Failed to fetch awards');
      const data = await response.json();
      set({ awards: data, loading: false });
    } catch (error) {
      console.error('Error fetching awards:', error);
      set({ awards: mockAwards, error: error as Error, loading: false });
    }
  },
}));
