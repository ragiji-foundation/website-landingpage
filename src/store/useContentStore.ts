import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Initiative } from '@/types/initiative';
import { Testimonial } from '@/types/testimonial';
import { GalleryItem } from '@/types/gallery';
import { apiClient, safeApiCall } from '@/utils/api-client';

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

// Fallback data
const fallbackInitiatives: Initiative[] = [
  {
    id: '1',
    title: 'Education for All',
    description: 'Providing quality education to underprivileged children.',
    imageUrl: '/images/education.jpg',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    role: 'Parent',
    content: 'Ragiji Foundation has transformed my child\'s future.',
    imageUrl: '/images/testimonial1.jpg',
    order: 1
  }
];

const fallbackGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Education Program',
    description: 'Students in our education program',
    imageUrl: '/images/gallery1.jpg',
    category: 'education',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const fallbackNews: NewsArticle[] = [
  {
    id: 1,
    title: 'Foundation Launches New Education Initiative',
    titleHi: 'फाउंडेशन ने नई शिक्षा पहल शुरू की',
    source: 'Local News',
    date: new Date().toISOString(),
    description: 'A new education program for rural children.',
    descriptionHi: 'ग्रामीण बच्चों के लिए एक नया शिक्षा कार्यक्रम।'
  }
];

const fallbackElectronicMedia: ElectronicMedia[] = [
  {
    id: 1,
    title: 'Foundation Impact Video',
    titleHi: 'फाउंडेशन प्रभाव वीडियो',
    description: 'See our impact in the community',
    descriptionHi: 'समुदाय में हमारा प्रभाव देखें',
    videoUrl: '/videos/impact.mp4',
    order: 1
  }
];

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
      set({ loading: true, error: null });
      
      try {
        const initiatives = await safeApiCall(
          () => apiClient.get<Initiative[]>('/initiatives', fallbackInitiatives, { locale }),
          fallbackInitiatives,
          'initiatives'
        );
        set({ initiatives, loading: false });
      } catch (error) {
        console.error('Error fetching initiatives:', error);
        set({ initiatives: fallbackInitiatives, loading: false });
      }
    },

    fetchTestimonials: async () => {
      const locale = get().locale;
      set({ loading: true, error: null });
      
      try {
        const testimonials = await safeApiCall(
          () => apiClient.get<Testimonial[]>('/testimonials', fallbackTestimonials, { locale }),
          fallbackTestimonials,
          'testimonials'
        );
        set({ testimonials, loading: false });
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        set({ testimonials: fallbackTestimonials, loading: false });
      }
    },

    fetchGallery: async () => {
      const locale = get().locale;
      set({ loading: true, error: null });
      
      try {
        const gallery = await safeApiCall(
          () => apiClient.get<GalleryItem[]>('/gallery', fallbackGallery, { locale }),
          fallbackGallery,
          'gallery'
        );
        set({ gallery, loading: false });
      } catch (error) {
        console.error('Error fetching gallery:', error);
        set({ gallery: fallbackGallery, loading: false });
      }
    },

    fetchNews: async () => {
      const locale = get().locale;
      set({ loading: true, error: null });
      
      try {
        const news = await safeApiCall(
          () => apiClient.get<NewsArticle[]>('/news-articles', fallbackNews, { locale }),
          fallbackNews,
          'news'
        );
        set({ news, loading: false });
      } catch (error) {
        console.error('Error fetching news:', error);
        set({ news: fallbackNews, loading: false });
      }
    },

    fetchElectronicMedia: async () => {
      const locale = get().locale;
      set({ loading: true, error: null });
      
      try {
        const electronicMedia = await safeApiCall(
          () => apiClient.get<ElectronicMedia[]>('/electronic-media', fallbackElectronicMedia, { locale }),
          fallbackElectronicMedia,
          'electronic-media'
        );
        set({ electronicMedia, loading: false });
      } catch (error) {
        console.error('Error fetching electronic media:', error);
        set({ electronicMedia: fallbackElectronicMedia, loading: false });
      }
    }
  }))
);
