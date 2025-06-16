import { create } from 'zustand';
import { Initiative } from '@/types/initiative';

// Locale-specific mock data
const mockInitiatives: Record<string, Initiative[]> = {
  en: [
    {
      id: "1",
      title: "Footpathshaala",
      description: "Educational program for street children focusing on basic literacy and numeracy skills.",
      imageUrl: "/initiatives/footpathshaala.jpg",
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // ... add more English initiatives
  ],
  hi: [
    {
      id: "1",
      title: "पथशाला",
      description: "सड़क के बच्चों के लिए शैक्षिक कार्यक्रम जो बुनियादी साक्षरता और संख्यात्मक कौशल पर केंद्रित है।",
      imageUrl: "/initiatives/footpathshaala.jpg",
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // ... add more Hindi initiatives
  ]
};

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
      // Use locale-specific mock data
      const fallbackData = mockInitiatives[locale] || mockInitiatives.en;
      set({ initiatives: fallbackData, error: error as Error, loading: false });
    }
  },
}));
