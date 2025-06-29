import { create } from 'zustand';

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

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchTestimonials: async (locale = 'en') => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/testimonials?locale=${locale}`);

      if (!response.ok) throw new Error('Failed to fetch testimonials');

      const data = await response.json();
      set({ items: data.filter((item: Testimonial) => item.isPublished) });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      set({
        items: [],
        error: error as Error
      });
    } finally {
      set({ loading: false });
    }
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
