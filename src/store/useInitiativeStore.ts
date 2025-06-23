import { create } from 'zustand';
import { Initiative } from '@/types/initiative';

interface InitiativeState {
  initiatives: Initiative[];
  loading: boolean;
  error: Error | null;
  fetchInitiatives: (locale?: string) => Promise<void>;
}

export const useInitiativeStore = create<InitiativeState>((set) => ({
  initiatives: [],
  loading: false,
  error: null,
  fetchInitiatives: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/initiatives?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch initiatives');
      const data = await response.json();
      set({ initiatives: data, loading: false });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      set({ initiatives: [], error: error as Error, loading: false });
    }
  },
}));
