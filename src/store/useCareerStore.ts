import { create } from 'zustand';
import { generateSlug } from '@/utils/slug';

interface Career {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
}

interface CareerStore {
  careers: Career[];
  loading: boolean;
  error: string | null;
  fetchCareers: () => Promise<void>;
  getCareerBySlug: (slug: string) => Career | undefined;
}

export const useCareerStore = create<CareerStore>((set, get) => ({
  careers: [],
  loading: false,
  error: null,
  fetchCareers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/careers`);
      if (!response.ok) throw new Error('Failed to fetch careers');
      const data = await response.json();
      set({ careers: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch careers',
        loading: false 
      });
    }
  },
  getCareerBySlug: (slug: string) => {
    return get().careers.find(career => career.slug === slug);
  }
}));
