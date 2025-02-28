import { create } from 'zustand';
import { Testimonial } from '@/types/testimonial';
import { mockTestimonials } from '@/data/mock-testimonials';

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: Error | null;
  fetchTestimonials: () => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => ({
  testimonials: [],
  loading: false,
  error: null,
  fetchTestimonials: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      set({ testimonials: data, loading: false });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      set({ testimonials: mockTestimonials, error: error as Error, loading: false });
    }
  },
}));
