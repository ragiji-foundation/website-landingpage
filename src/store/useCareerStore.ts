import { create } from 'zustand';

interface Career {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
  locale?: string;
}

// Locale-specific mock data
const mockCareers: Record<string, Career[]> = {
  en: [
    {
      id: 1,
      title: 'Education Program Manager',
      slug: 'education-program-manager',
      location: 'Delhi',
      type: 'Full-time',
      description: 'Lead our education initiatives and manage program implementation across centers.',
      requirements: '- 5+ years experience in education sector\n- Strong program management skills\n- Experience working with NGOs',
      isActive: true,
      createdAt: new Date().toISOString(),
      locale: 'en'
    },
    // ...other English careers
  ],
  hi: [
    {
      id: 1,
      title: 'शिक्षा कार्यक्रम प्रबंधक',
      slug: 'education-program-manager',
      location: 'दिल्ली',
      type: 'पूर्णकालिक',
      description: 'हमारे शिक्षा पहलों का नेतृत्व करें और केंद्रों में कार्यक्रम कार्यान्वयन का प्रबंधन करें।',
      requirements: '- शिक्षा क्षेत्र में 5+ वर्षों का अनुभव\n- मजबूत कार्यक्रम प्रबंधन कौशल\n- गैर सरकारी संगठनों के साथ काम करने का अनुभव',
      isActive: true,
      createdAt: new Date().toISOString(),
      locale: 'hi'
    },
    // ...other Hindi careers
  ]
};

interface CareerStore {
  careers: Career[];
  loading: boolean;
  error: string | null;
  fetchCareers: (locale?: string) => Promise<void>;
  getCareerBySlug: (slug: string, locale?: string) => Career | undefined;
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
      // Use locale-specific mock data
      const fallbackData = mockCareers[locale] || mockCareers.en;
      set({ 
        careers: fallbackData,
        error: error instanceof Error ? error.message : 'Failed to fetch careers',
        loading: false 
      });
    }
  },
  getCareerBySlug: (slug: string, locale = 'en') => {
    // First try to find career with matching slug and locale
    const localizedCareer = get().careers.find(
      career => career.slug === slug && career.locale === locale
    );
    
    if (localizedCareer) return localizedCareer;
    
    // If not found, fall back to any career with matching slug
    return get().careers.find(career => career.slug === slug);
  }
}));
