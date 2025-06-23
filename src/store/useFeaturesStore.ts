import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Feature } from '@/types/features';

interface FeaturesState {
  features: Feature[];
  loading: boolean;
  error: Error | null;
  fetchFeatures: (locale?: string) => Promise<void>;
}

export const useFeaturesStore = create<FeaturesState>()(
  devtools((set) => ({
    features: [],
    loading: false,
    error: null,
    fetchFeatures: async (locale = 'en') => {
      try {
        set({ loading: true, error: null });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/features?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch features');

        const data = await response.json();
        set({ features: data, loading: false });
      } catch (error) {
        console.error('Error fetching features:', error);
        set({
          features: [],
          error: error as Error,
          loading: false
        });
      }
    }
  }))
);
