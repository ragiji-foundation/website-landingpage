import { create } from 'zustand';
import { Testimonial } from '@/types/testimonial';

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    role: 'Medical Professional',
    content: 'The healthcare initiatives by Ragi Ji Foundation have transformed rural healthcare access. Their dedication to community welfare is remarkable.',
    imageUrl: '/testimonials/doctor.jpg',
    order: 1
  },
  {
    id: '2',
    name: 'Priya Singh',
    role: 'Entrepreneur',
    content: 'Thanks to the women empowerment program, I now run my own successful business. They provided training, support, and the confidence to succeed.',
    imageUrl: '/testimonials/entrepreneur.jpg',
    order: 2
  },
  {
    id: '3',
    name: 'Amit Sharma',
    role: 'Student',
    content: 'The digital literacy program opened new opportunities for me. I learned computer skills and now work as a freelance developer.',
    imageUrl: '/testimonials/student.jpg',
    order: 3
  },
  {
    id: '4',
    name: 'Maya Devi',
    role: 'Community Leader',
    content: 'Our village has seen remarkable improvement in education since Ragi Ji Foundation started their rural education program.',
    imageUrl: '/testimonials/community.jpg',
    order: 4
  },
  {
    id: '5',
    name: 'Sanjay Verma',
    role: 'Teacher',
    content: 'The foundation\'s approach to education is holistic and impactful. They focus on both academic and practical skills.',
    imageUrl: '/testimonials/teacher.jpg',
    order: 5
  },
  {
    id: '6',
    name: 'Anita Patel',
    role: 'Parent',
    content: 'My children\'s future is brighter thanks to the after-school programs. The foundation\'s support has been invaluable.',
    imageUrl: '/testimonials/parent.jpg',
    order: 6
  }
];

interface TestimonialsState {
  items: Testimonial[];
  loading: boolean;
  error: Error | null;
  fetchTestimonials: () => Promise<void>;
}

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchTestimonials: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/testimonials`);

      if (!response.ok) throw new Error('Failed to fetch testimonials');

      const data = await response.json();
      set({ items: data.sort((a: Testimonial, b: Testimonial) => a.order - b.order) });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback to mock data
      set({
        items: mockTestimonials,
        error: error as Error
      });
    } finally {
      set({ loading: false });
    }
  },
}));
