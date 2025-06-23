import { create } from 'zustand';
import { Center } from '@/types/center';

interface CenterState {
  centers: Center[];
  loading: boolean;
  error: Error | null;
  fetchCenters: (locale?: string) => Promise<void>;
}

export const useCenterStore = create<CenterState>((set) => ({
  centers: [],
  loading: false,
  error: null,
  fetchCenters: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/centers?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch centers');
      const data = await response.json();
      set({ centers: data, loading: false });
    } catch (error) {
      console.error('Error fetching centers:', error);
      set({ centers: [], error: error as Error, loading: false });
    }
  },
}));
