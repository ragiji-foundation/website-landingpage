/**
 * ElectronicMediaStore - Manages state for electronic media data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalizedArray } from '@/utils/localization';

export interface MediaItem {
  id: number;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  videoUrl: string;
  thumbnail?: string;
  order: number;
}

interface ElectronicMediaStore {
  mediaItems: MediaItem[];
  loading: boolean;
  error: Error | null;
  fetchMediaItems: () => Promise<void>;
  getLocalizedMediaItems: (locale: string) => MediaItem[];
}

export const useElectronicMediaStore = create<ElectronicMediaStore>()(
  devtools(
    (set, get) => ({
      mediaItems: [],
      loading: false,
      error: null,
      
      fetchMediaItems: async () => {
        try {
          set({ loading: true, error: null });
          const response = await fetch('/api/electronic-media');
          
          if (!response.ok) {
            throw new Error('Failed to fetch electronic media');
          }
          
          const data = await response.json();
          // Sort by order field
          data.sort((a: MediaItem, b: MediaItem) => a.order - b.order);
          
          set({ mediaItems: data, loading: false });
        } catch (error) {
          console.error('Error fetching electronic media:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },
      
      getLocalizedMediaItems: (locale: string) => {
        const { mediaItems } = get();
        return withLocalizedArray(mediaItems, locale) as MediaItem[];
      }
    }),
    { name: 'electronic-media-store' }
  )
);