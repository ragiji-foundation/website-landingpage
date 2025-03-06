import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: any; // Rich text content
  mediaItem: MediaItem;
  slug?: string;
  order?: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

interface FeaturesState {
  features: Feature[];
  loading: boolean;
  error: Error | null;
  fetchFeatures: () => Promise<void>;
}

// Fallback features in case API fails
const FALLBACK_FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Community Education Programs',
    description: 'Our community-based education programs provide literacy and skills development to underserved areas.',
    mediaItem: {
      type: 'image',
      url: '/features/community-education.jpg',
    },
    slug: 'community-education',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Digital Learning Initiative',
    description: 'Bringing technology-enabled education to rural communities through our mobile learning labs.',
    mediaItem: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: '/features/digital-learning.jpg',
    },
    slug: 'digital-learning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Teacher Training Program',
    description: 'Empowering teachers with modern pedagogical techniques and resources for effective education.',
    mediaItem: {
      type: 'image',
      url: '/features/teacher-training.jpg',
    },
    slug: 'teacher-training',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useFeaturesStore = create<FeaturesState>()(
  devtools(
    (set) => ({
      features: [],
      loading: false,
      error: null,

      fetchFeatures: async () => {
        set({ loading: true, error: null });

        try {
          // Use NEXT_PUBLIC_API_URL from env or default to relative path
          const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

          // Make the request with credentials included
          const response = await fetch(`${API_URL}/api/features`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch features: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();

          // Sort features by order if available
          const sortedData = [...data].sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order;
            }
            return 0;
          });

          set({
            features: sortedData,
            loading: false,
          });
        } catch (error) {
          console.error('Error fetching features:', error);

          // Use fallback data when API fails
          set({
            error: error as Error,
            features: FALLBACK_FEATURES,
            loading: false,
          });
        }
      },
    })
  )
);
