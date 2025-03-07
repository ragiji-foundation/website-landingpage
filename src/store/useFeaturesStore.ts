import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockFeatures } from '@/data/mock-features';
import { Feature } from '@/types/features';

interface FeaturesState {
  features: Feature[];
  loading: boolean;
  error: Error | null;
  fetchFeatures: () => Promise<void>;
}

export const useFeaturesStore = create<FeaturesState>()(
  devtools((set) => ({
    features: [],
    loading: false,
    error: null,
    fetchFeatures: async () => {
      try {
        set({ loading: true, error: null });
        const response = await fetch('/api/proxy/features');
        if (!response.ok) throw new Error('Failed to fetch features');

        const data = await response.json();
        set({ features: data, loading: false });
      } catch (error) {
        console.error('Error fetching features:', error);
        set({
          features: mockFeatures,
          error: error as Error,
          loading: false
        });
      }
    }
  }))
);
