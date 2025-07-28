import { create } from 'zustand';
import { Initiative as InitiativeBase } from '@/types/initiative';
import { apiClient, safeApiCall } from '@/utils/api-client';

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

// Fallback data
const fallbackInitiatives: Initiative[] = [
  {
    id: '1',
    title: 'Education for All',
    titleHi: 'सभी के लिए शिक्षा',
    description: 'Providing quality education to underprivileged children.',
    descriptionHi: 'वंचित बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना।',
    imageUrl: '/images/education.jpg',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useInitiativesStore = create<InitiativesState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchInitiatives: async (locale = 'en') => {
    set({ loading: true, error: null });
    
    const initiatives = await safeApiCall(
      () => apiClient.get<Initiative[]>('/initiatives', fallbackInitiatives, { locale }),
      fallbackInitiatives,
      'initiatives'
    );
    
    set({ 
      items: initiatives.sort((a: Initiative, b: Initiative) => a.order - b.order),
      loading: false,
      error: null
    });
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
