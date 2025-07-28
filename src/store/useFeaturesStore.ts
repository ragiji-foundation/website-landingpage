import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Feature } from '@/types/feature';
import { apiClient, safeApiCall } from '@/utils/api-client';

interface FeaturesState {
  features: Feature[];
  loading: boolean;
  error: Error | null;
  fetchFeatures: (locale?: string) => Promise<void>;
}

// Fallback data
const fallbackFeatures: Feature[] = [
  {
    id: '1',
    title: 'Quality Education',
    description: 'Providing quality education to all children.',
    slug: 'quality-education',
    category: 'education',
    order: 1,
    mediaItem: {
      type: 'image',
      url: '/images/education-feature.jpg',
      thumbnail: '/images/education-feature-thumb.jpg'
    },
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useFeaturesStore = create<FeaturesState>()(
  devtools((set) => ({
    features: [],
    loading: false,
    error: null,
    fetchFeatures: async (locale = 'en') => {
      set({ loading: true, error: null });
      
      const features = await safeApiCall(
        () => apiClient.get<Feature[]>('/features', fallbackFeatures, { locale }),
        fallbackFeatures,
        'features'
      );
      
      set({ 
        features: features.filter(f => f.isPublished).sort((a, b) => a.order - b.order), 
        loading: false,
        error: null
      });
    }
  }))
);
