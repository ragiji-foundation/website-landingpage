import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Feature } from '@/types/features';

// Locale-specific mock data
const mockFeatures: Record<string, Feature[]> = {
  en: [
    {
      id: 'feat_1',
      title: 'Education Support',
      description: `<p>Providing quality education for underprivileged children through <strong>scholarships</strong> and resources.</p>
        <ul>
          <li>School Support</li>
          <li>Higher Education</li>
        </ul>`,
      slug: 'education-support',
      category: 'education',
      order: 1,
      mediaItem: {
        type: 'image' as const,
        url: '/images/features/education.jpg',
        thumbnail: '/images/features/thumbnails/education.jpg',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: true,
    },
    // ...other English features
  ],
  hi: [
    {
      id: 'feat_1',
      title: 'शिक्षा समर्थन',
      description: `<p>वंचित बच्चों के लिए <strong>छात्रवृत्ति</strong> और संसाधनों के माध्यम से गुणवत्तापूर्ण शिक्षा प्रदान करना।</p>
        <ul>
          <li>स्कूल समर्थन</li>
          <li>उच्च शिक्षा</li>
        </ul>`,
      slug: 'education-support',
      category: 'education',
      order: 1,
      mediaItem: {
        type: 'image' as const,
        url: '/images/features/education.jpg',
        thumbnail: '/images/features/thumbnails/education.jpg',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublished: true,
    },
    // ...other Hindi features
  ]
};

interface FeaturesState {
  features: Feature[];
  loading: boolean;
  error: Error | null;
  fetchFeatures: (locale?: string) => Promise<void>;
}

export const useFeaturesStore = create<FeaturesState>()(
  devtools((set) => ({
    features: [],
    loading: false,
    error: null,
    fetchFeatures: async (locale = 'en') => {
      try {
        set({ loading: true, error: null });
        const response = await fetch(`/api/proxy/features?locale=${locale}`);
        if (!response.ok) throw new Error('Failed to fetch features');

        const data = await response.json();
        set({ features: data, loading: false });
      } catch (error) {
        console.error('Error fetching features:', error);
        // Use locale-specific mock data
        const fallbackData = mockFeatures[locale] || mockFeatures.en;
        set({
          features: fallbackData,
          error: error as Error,
          loading: false
        });
      }
    }
  }))
);
