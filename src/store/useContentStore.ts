import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Initiative } from '@/types/initiative';
import { Testimonial } from '@/types/testimonial';
import { GalleryItem } from '@/types/gallery';
import { mockInitiatives } from '@/data/mock-initiatives';
import { mockTestimonials } from '@/data/mock-testimonials';
import { mockGallery } from '@/data/mock-gallery';

interface ContentState {
  initiatives: Initiative[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  news: any[];
  electronicMedia: any[];
  loading: boolean;
  error: Error | null;
  locale: string;
  setLocale: (locale: string) => void;
  fetchInitiatives: () => Promise<void>;
  fetchTestimonials: () => Promise<void>;
  fetchGallery: () => Promise<void>;
  fetchNews: () => Promise<void>;
  fetchElectronicMedia: () => Promise<void>;
}

export const useContentStore = create<ContentState>()(
  devtools((set, get) => ({
    initiatives: [],
    testimonials: [],
    gallery: [],
    news: [],
    electronicMedia: [],
    loading: false,
    error: null,
    locale: 'en',

    setLocale: (locale) => set({ locale }),

    fetchInitiatives: async () => {
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/initiatives`);
        if (!response.ok) throw new Error('Failed to fetch initiatives');
        const data = await response.json();
        set((state) => ({ ...state, initiatives: data, loading: false }));
      } catch (error) {
        console.error('Error fetching initiatives:', error);
        set((state) => ({ ...state, initiatives: mockInitiatives, loading: false }));
      }
    },

    fetchTestimonials: async () => {
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/testimonials`);
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        set((state) => ({ ...state, testimonials: data, loading: false }));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        set((state) => ({ ...state, testimonials: mockTestimonials, loading: false }));
      }
    },

    fetchGallery: async () => {
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/gallery`);
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        set((state) => ({ ...state, gallery: data, loading: false }));
      } catch (error) {
        console.error('Error fetching gallery:', error);
        set((state) => ({ ...state, gallery: mockGallery, loading: false }));
      }
    },

    // ... similar fetch functions for other content types
  }))
);
