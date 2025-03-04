import { create } from 'zustand';
import { Center } from '@/types/center';
import { mockCenters } from '@/data/mock-centers';

interface CenterState {
  centers: Center[];
  loading: boolean;
  error: Error | null;
  fetchCenters: () => Promise<void>;
}

export const useCenterStore = create<CenterState>((set) => ({
  centers: [],
  loading: false,
  error: null,
  fetchCenters: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/centers`);
      if (!response.ok) throw new Error('Failed to fetch centers');
      const data = await response.json();
      set({ centers: data, loading: false });
    } catch (error) {
      console.error('Error fetching centers:', error);
      set({ centers: mockCenters, error: error as Error, loading: false });
    }
  },
}));
