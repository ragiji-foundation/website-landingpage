import { create } from 'zustand';
import { Testimonial } from '@/types/testimonial';

// Separate mock data for different locales
const mockTestimonials: Record<string, Testimonial[]> = {
  en: [
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
  ],
  hi: [
    {
      id: '1',
      name: 'डॉ राजेश कुमार',
      role: 'चिकित्सा पेशेवर',
      content: 'रागी जी फाउंडेशन की स्वास्थ्य पहल ने ग्रामीण स्वास्थ्य सेवा पहुंच को बदल दिया है। समुदाय के कल्याण के प्रति उनका समर्पण उल्लेखनीय है।',
      imageUrl: '/testimonials/doctor.jpg',
      order: 1
    },
    {
      id: '2',
      name: 'प्रिया सिंह',
      role: 'उद्यमी',
      content: 'महिला सशक्तिकरण कार्यक्रम के लिए धन्यवाद, मैं अब अपना खुद का सफल व्यवसाय चलाती हूं। उन्होंने प्रशिक्षण, समर्थन और सफल होने का आत्मविश्वास दिया।',
      imageUrl: '/testimonials/entrepreneur.jpg',
      order: 2
    },
    {
      id: '3',
      name: 'अमित शर्मा',
      role: 'छात्र',
      content: 'डिजिटल साक्षरता कार्यक्रम ने मेरे लिए नए अवसर खोले। मैंने कंप्यूटर कौशल सीखे और अब एक स्वतंत्र डेवलपर के रूप में काम करता हूं।',
      imageUrl: '/testimonials/student.jpg',
      order: 3
    },
    {
      id: '4',
      name: 'माया देवी',
      role: 'समुदाय नेता',
      content: 'जब से रागी जी फाउंडेशन ने अपना ग्रामीण शिक्षा कार्यक्रम शुरू किया है, हमारे गांव में शिक्षा में उल्लेखनीय सुधार हुआ है।',
      imageUrl: '/testimonials/community.jpg',
      order: 4
    },
    {
      id: '5',
      name: 'संजय वर्मा',
      role: 'शिक्षक',
      content: 'फाउंडेशन का शिक्षा के प्रति दृष्टिकोण समग्र और प्रभावशाली है। वे अकादमिक और व्यावहारिक दोनों कौशल पर ध्यान केंद्रित करते हैं।',
      imageUrl: '/testimonials/teacher.jpg',
      order: 5
    },
    {
      id: '6',
      name: 'अनिता पटेल',
      role: 'माता-पिता',
      content: 'मेरे बच्चों का भविष्य उज्जवल है धन्यवाद स्कूल के बाद के कार्यक्रमों। फाउंडेशन का समर्थन अमूल्य रहा है।',
      imageUrl: '/testimonials/parent.jpg',
      order: 6
    }
  ]
};

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
      set({ items: data.sort((a: Testimonial, b: Testimonial) => a.order - b.order) });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback to locale-specific mock data
      const fallbackData = mockTestimonials[locale] || mockTestimonials.en;
      set({
        items: fallbackData,
        error: error as Error
      });
    } finally {
      set({ loading: false });
    }
  },
}));
