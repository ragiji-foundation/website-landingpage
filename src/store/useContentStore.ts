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
      const locale = get().locale;
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/initiatives?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch initiatives');
        const data = await response.json();
        set((state) => ({ ...state, initiatives: data, loading: false }));
      } catch (error) {
        console.error('Error fetching initiatives:', error);
        // Use locale-specific data if available, otherwise use English data
        const localeSpecificData = mockInitiatives[locale] || mockInitiatives.en;
        set((state) => ({ ...state, initiatives: localeSpecificData, loading: false }));
      }
    },

    fetchTestimonials: async () => {
      const locale = get().locale;
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/testimonials?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        set((state) => ({ ...state, testimonials: data, loading: false }));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        const localeSpecificData = mockTestimonials[locale] || mockTestimonials.en;
        set((state) => ({ ...state, testimonials: localeSpecificData, loading: false }));
      }
    },

    fetchGallery: async () => {
      const locale = get().locale;
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/gallery?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        set((state) => ({ ...state, gallery: data, loading: false }));
      } catch (error) {
        console.error('Error fetching gallery:', error);
        const localeSpecificData = mockGallery[locale] || mockGallery.en;
        set((state) => ({ ...state, gallery: localeSpecificData, loading: false }));
      }
    },

    fetchNews: async () => {
      const locale = get().locale;
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/news?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        set((state) => ({ ...state, news: data, loading: false }));
      } catch (error) {
        console.error('Error fetching news:', error);
        set((state) => ({ ...state, loading: false }));
      }
    },

    fetchElectronicMedia: async () => {
      const locale = get().locale;
      try {
        set({ loading: true });
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/electronic-media?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch electronic media');
        const data = await response.json();
        set((state) => ({ ...state, electronicMedia: data, loading: false }));
      } catch (error) {
        console.error('Error fetching electronic media:', error);
        set((state) => ({ ...state, loading: false }));
      }
    }
  }))
);
