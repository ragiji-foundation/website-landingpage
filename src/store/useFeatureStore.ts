import { create } from 'zustand';
import { FeatureSection } from '@/types/feature';

interface FeatureState {
  sections: { [key: string]: FeatureSection };
  loading: boolean;
  error: Error | null;
  fetchFeatureSection: (identifier: string) => Promise<void>;
}

export const useFeatureStore = create<FeatureState>((set) => ({
  sections: {},
  loading: false,
  error: null,
  fetchFeatureSection: async (identifier) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api//features/${identifier}`);
      if (!response.ok) throw new Error('Failed to fetch feature section');
      const data = await response.json();
      set((state) => ({
        sections: {
          ...state.sections,
          [identifier]: data
        },
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching feature section:', error);
      set({ error: error as Error, loading: false });
    }
  },
}));
