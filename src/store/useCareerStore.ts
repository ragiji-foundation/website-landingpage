import { create } from 'zustand';

interface Career {
  id: number;
  title: string;
  titleHi?: string;
  slug: string;
  location: string;
  locationHi?: string;
  type: string;
  typeHi?: string;
  description: string;
  descriptionHi?: string;
  requirements: string;
  requirementsHi?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CareerStore {
  careers: Career[];
  loading: boolean;
  error: string | null;
  fetchCareers: (locale?: string) => Promise<void>;
  getCareerBySlug: (slug: string) => Career | undefined;
}

export const useCareerStore = create<CareerStore>((set, get) => ({
  careers: [],
  loading: false,
  error: null,
  fetchCareers: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/careers?locale=${locale}`);
      if (!response.ok) throw new Error('Failed to fetch careers');
      const data = await response.json();
      set({ careers: data, loading: false });
    } catch (error) {
      console.error('Error fetching careers:', error);
      set({ 
        careers: [],
        error: error instanceof Error ? error.message : 'Failed to fetch careers',
        loading: false 
      });
    }
  },
  getCareerBySlug: (slug: string) => {
    // Return any career with matching slug
    return get().careers.find(career => career.slug === slug);
  }
}));
