import { create } from 'zustand';
import { Center } from '@/types/center';

// Locale-specific mock data
const mockCenters: Record<string, Center[]> = {
  en: [
    {
      id: 1,
      name: "UPAY Learning Center - Delhi",
      location: "Dwarka, New Delhi",
      description: "Our flagship learning center equipped with digital classrooms, library, and computer lab. Serving over 200 students with modern educational facilities and dedicated mentors.",
      imageUrl: "/centers/delhi-center.jpg",
      contactInfo: "+91 98765-43210"
    },
    // ...other English centers
  ],
  hi: [
    {
      id: 1,
      name: "यूपीएवाई अध्ययन केंद्र - दिल्ली",
      location: "द्वारका, नई दिल्ली",
      description: "हमारा प्रमुख अध्ययन केंद्र जिसमें डिजिटल कक्षाएं, पुस्तकालय और कंप्यूटर लैब हैं। आधुनिक शैक्षिक सुविधाओं और समर्पित मेंटर्स के साथ 200 से अधिक छात्रों को सेवा प्रदान कर रहा है।",
      imageUrl: "/centers/delhi-center.jpg",
      contactInfo: "+91 98765-43210"
    },
    // ...other Hindi centers
  ]
};

interface CenterState {
  centers: Center[];
  loading: boolean;
  error: Error | null;
  fetchCenters: (locale?: string) => Promise<void>;
}

export const useCenterStore = create<CenterState>((set) => ({
  centers: [],
  loading: false,
  error: null,
  fetchCenters: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/centers?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch centers');
      const data = await response.json();
      set({ centers: data, loading: false });
    } catch (error) {
      console.error('Error fetching centers:', error);
      // Use locale-specific mock data
      const fallbackData = mockCenters[locale] || mockCenters.en;
      set({ centers: fallbackData, error: error as Error, loading: false });
    }
  },
}));
