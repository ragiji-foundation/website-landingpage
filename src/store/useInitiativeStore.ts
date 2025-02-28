import { create } from 'zustand';
import { Initiative } from '@/types/initiative';
import { mockInitiatives } from '@/data/mock-initiatives';

interface InitiativeState {
  initiatives: Initiative[];
  loading: boolean;
  error: Error | null;
  fetchInitiatives: () => Promise<void>;
}

export const useInitiativeStore = create<InitiativeState>((set) => ({
  initiatives: [],
  loading: false,
  error: null,
  fetchInitiatives: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/initiatives`);
      if (!response.ok) throw new Error('Failed to fetch initiatives');
      const data = await response.json();
      set({ initiatives: data, loading: false });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      set({ initiatives: mockInitiatives, error: error as Error, loading: false });
    }
  },
}));
