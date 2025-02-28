import { create } from 'zustand';
import { Career } from '@/types/career';
import { mockCareers } from '@/data/mock-careers';

interface CareerState {
  careers: Career[];
  loading: boolean;
  error: Error | null;
  fetchCareers: () => Promise<void>;
}

export const useCareerStore = create<CareerState>((set) => ({
  careers: [],
  loading: false,
  error: null,
  fetchCareers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/careers`);
      if (!response.ok) throw new Error('Failed to fetch careers');
      const data = await response.json();
      set({ careers: data, loading: false });
    } catch (error) {
      console.error('Error fetching careers:', error);
      set({ careers: mockCareers, error: error as Error, loading: false });
    }
  },
}));
