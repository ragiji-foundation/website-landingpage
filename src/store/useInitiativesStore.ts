import { create } from 'zustand';
import { Initiative as InitiativeBase } from '@/types/initiative';

export interface Initiative extends InitiativeBase {
  titleHi?: string;
  descriptionHi?: string;
}

interface InitiativesState {
  items: Initiative[];
  loading: boolean;
  error: Error | null;
  fetchInitiatives: (locale?: string) => Promise<void>;
}

export const useInitiativesStore = create<InitiativesState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchInitiatives: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/initiatives?locale=${locale}`);

      if (!response.ok) throw new Error('Failed to fetch initiatives');

      const data = await response.json();
      // Ensure items have Hindi fields if locale is hi
      set({ items: data.sort((a: Initiative, b: Initiative) => a.order - b.order) });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      set({ items: [], error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));

// Listen for locale changes
if (typeof window !== 'undefined') {
  window.addEventListener('locale-changed', (event) => {
    const customEvent = event as CustomEvent;
    const { locale } = customEvent.detail;
    useInitiativesStore.getState().fetchInitiatives(locale);
  });
}
