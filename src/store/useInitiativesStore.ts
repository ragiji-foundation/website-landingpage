import { create } from 'zustand';
import { Initiative } from '@/types/initiative';

// Locale-specific mock data
const mockInitiatives: Record<string, Initiative[]> = {
  en: [
    {
      id: '1',
      title: 'Digital Literacy Program',
      description: 'Empowering communities through technology education',
      imageUrl: '/initiatives/digital-literacy.jpg',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Women Empowerment',
      description: 'Supporting women through skill development and entrepreneurship',
      imageUrl: '/initiatives/women-empowerment.jpg',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Rural Education',
      description: 'Bringing quality education to rural areas',
      imageUrl: '/initiatives/rural-education.jpg',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ],
  hi: [
    {
      id: '1',
      title: 'डिजिटल साक्षरता कार्यक्रम',
      description: 'तकनीकी शिक्षा के माध्यम से समुदायों को सशक्त बनाना',
      imageUrl: '/initiatives/digital-literacy.jpg',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'महिला सशक्तिकरण',
      description: 'कौशल विकास और उद्यमिता के माध्यम से महिलाओं का समर्थन',
      imageUrl: '/initiatives/women-empowerment.jpg',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'ग्रामीण शिक्षा',
      description: 'ग्रामीण क्षेत्रों में गुणवत्तापूर्ण शिक्षा लाना',
      imageUrl: '/initiatives/rural-education.jpg',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ]
};

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
      set({ items: data.sort((a: Initiative, b: Initiative) => a.order - b.order) });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      // Use locale-specific mock data
      const fallbackData = mockInitiatives[locale] || mockInitiatives.en;
      set({ items: fallbackData, error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));
