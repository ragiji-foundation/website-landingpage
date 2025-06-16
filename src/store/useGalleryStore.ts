import { create } from 'zustand';
import { GalleryItem } from '@/types/gallery';

// Locale-specific mock data
const mockGallery: Record<string, GalleryItem[]> = {
  en: [
    {
      id: "1",
      title: 'Education Program Launch',
      description: 'Launch of our new digital literacy program',
      imageUrl: '/gallery/education-launch.jpg',
      category: 'Education',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString()
    },
    {
      id: "2",
      title: 'Community Health Camp',
      description: 'Free health checkup camp in rural areas',
      imageUrl: '/gallery/health-camp.jpg',
      category: 'Healthcare',
      createdAt: new Date('2024-01-10').toISOString(),
      updatedAt: new Date('2024-01-10').toISOString()
    },
  ],
  hi: [
    {
      id: "1",
      title: 'शिक्षा कार्यक्रम का शुभारंभ',
      description: 'हमारे नए डिजिटल साक्षरता कार्यक्रम का शुभारंभ',
      imageUrl: '/gallery/education-launch.jpg',
      category: 'शिक्षा',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString()
    },
    {
      id: "2",
      title: 'सामुदायिक स्वास्थ्य शिविर',
      description: 'ग्रामीण क्षेत्रों में नि:शुल्क स्वास्थ्य जांच शिविर',
      imageUrl: '/gallery/health-camp.jpg',
      category: 'स्वास्थ्य सेवा',
      createdAt: new Date('2024-01-10').toISOString(),
      updatedAt: new Date('2024-01-10').toISOString()
    },
  ]
};

interface GalleryState {
  items: GalleryItem[];
  selectedImage: GalleryItem | null;
  loading: boolean;
  error: Error | null;
  fetchGallery: (locale?: string) => Promise<void>;
  setSelectedImage: (image: GalleryItem | null) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  items: [],
  selectedImage: null,
  loading: false,
  error: null,
  fetchGallery: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/gallery?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch gallery');
      const data = await response.json();
      set({ items: data, loading: false });
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Use locale-specific mock data
      const fallbackData = mockGallery[locale] || mockGallery.en;
      set({ items: fallbackData, error: error as Error, loading: false });
    }
  },
  setSelectedImage: (image) => set({ selectedImage: image }),
}));
