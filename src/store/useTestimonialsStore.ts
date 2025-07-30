import { create } from 'zustand';
import { apiClient, safeApiCall } from '@/utils/api-client';

interface Testimonial {
  id: number;
  name: string;
  nameHi?: string;
  role: string;
  roleHi?: string;
  content: string;
  contentHi?: string;
  avatar?: string;
  createdAt: string;
  isPublished: boolean;
}

interface TestimonialsState {
  items: Testimonial[];
  loading: boolean;
  error: Error | null;
  fetchTestimonials: (locale?: string) => Promise<void>;
}

// Fallback data
const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    nameHi: 'राहुल कुमार',
    role: 'Parent',
    roleHi: 'अभिभावक',
    content: 'Ragiji Foundation has transformed my child\'s future through quality education.',
    contentHi: 'रागिजी फाउंडेशन ने गुणवत्तापूर्ण शिक्षा के माध्यम से मेरे बच्चे का भविष्य बदल दिया है।',
    avatar: '/images/testimonial1.jpg',
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchTestimonials: async (locale = 'en') => {
    set({ loading: true, error: null });
    
    const testimonials = await safeApiCall(
      () => apiClient.get<Testimonial[]>('/testimonials', fallbackTestimonials, { locale }),
      fallbackTestimonials,
      'testimonials'
    );
    
    set({ 
      items: testimonials.filter((item: Testimonial) => item.isPublished), 
      loading: false,
      error: null
    });
  },
}));

// Listen for locale changes
if (typeof window !== 'undefined') {
  window.addEventListener('locale-changed', (event) => {
    const customEvent = event as CustomEvent;
    const { locale } = customEvent.detail;
    useTestimonialsStore.getState().fetchTestimonials(locale);
  });
}
