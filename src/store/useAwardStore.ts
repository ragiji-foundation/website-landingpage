import { create } from 'zustand';
import { Award } from '@/types/award';

// Locale-specific mock data
const mockAwards: Record<string, Award[]> = {
  en: [
    {
      id: '1',
      title: 'Excellence in Social Impact',
      year: '2023',
      description: 'Recognized for outstanding contribution to rural education and community development.',
      imageUrl: '/awards/excellence-award.jpg',
      organization: 'National NGO Foundation'
    },
    // ... other English awards
  ],
  hi: [
    {
      id: '1',
      title: 'सामाजिक प्रभाव में उत्कृष्टता',
      year: '2023',
      description: 'ग्रामीण शिक्षा और सामुदायिक विकास में उत्कृष्ट योगदान के लिए मान्यता प्राप्त।',
      imageUrl: '/awards/excellence-award.jpg',
      organization: 'नेशनल NGO फाउंडेशन'
    },
    // ... other Hindi awards
  ]
};

interface AwardState {
  awards: Award[];
  loading: boolean;
  error: Error | null;
  fetchAwards: (locale?: string) => Promise<void>;
}

export const useAwardStore = create<AwardState>((set) => ({
  awards: [],
  loading: false,
  error: null,
  fetchAwards: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/awards?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch awards');
      const data = await response.json();
      set({ awards: data, loading: false });
    } catch (error) {
      console.error('Error fetching awards:', error);
      // Use locale-specific mock data
      const fallbackData = mockAwards[locale] || mockAwards.en;
      set({ awards: fallbackData, error: error as Error, loading: false });
    }
  },
}));
