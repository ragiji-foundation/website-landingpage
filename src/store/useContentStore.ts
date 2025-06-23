import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Initiative } from '@/types/initiative';
import { Testimonial } from '@/types/testimonial';
import { GalleryItem } from '@/types/gallery';

interface NewsArticle {
  id: number;
  title: string;
  titleHi?: string;
  source: string;
  date: string;
  imageUrl?: string;
  link?: string;
  description?: string;
  descriptionHi?: string;
}

interface ElectronicMedia {
  id: number;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  videoUrl: string;
  thumbnail?: string;
  order: number;
}




interface ContentState {
  initiatives: Initiative[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  news: NewsArticle[];
  electronicMedia: ElectronicMedia[];
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
        set({ initiatives: [], loading: false });
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
        set({ testimonials: [], loading: false });
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
        set({ gallery: [], loading: false });
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
