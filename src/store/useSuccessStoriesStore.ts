import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SuccessStory as SuccessStoryType } from '@/types/success-story'; // Aliased import

// Export the SuccessStory type from the store file itself
export interface SuccessStoriesState {
  stories: SuccessStoryType[];
  selectedStory: SuccessStoryType | null;
  loading: boolean;
  error: Error | null;
  fetchStories: () => Promise<void>;
  setSelectedStory: (story: SuccessStoryType | null) => void;
  fetchStoryBySlug: (slug: string) => Promise<void>;
  fetchStoryById: (id: string) => Promise<void>;
  retryCount: number;
  lastFetched: number | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;

export const useSuccessStoriesStore = create<SuccessStoriesState>()(
  devtools(
    persist(
      (set, get) => ({
        stories: [],
        selectedStory: null,
        loading: false,
        error: null,
        retryCount: 0,
        lastFetched: null,

        fetchStories: async () => {
          const state = get();
          // Return cached data if within cache duration
          if (state.lastFetched && Date.now() - state.lastFetched < CACHE_DURATION) {
            return;
          }

          try {
            set({ loading: true, error: null });
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories`);

            if (!response.ok) throw new Error('Failed to fetch success stories');

            const data = await response.json();
            set({
              stories: data.sort((a: SuccessStoryType, b: SuccessStoryType) => {
                if (a.featured === b.featured) return a.order - b.order;
                return a.featured ? -1 : 1;
              }),
              loading: false,
              lastFetched: Date.now(),
              retryCount: 0
            });
          } catch (error) {
            console.error('Error fetching success stories:', error);

            // If we have no stories and haven't exceeded retry limit
            if (get().stories.length === 0 && get().retryCount < MAX_RETRIES) {
              set(state => ({ retryCount: state.retryCount + 1 }));
              setTimeout(() => get().fetchStories(), 1000 * get().retryCount);
            } else {
              //remove the fallback data from the store to make the app more robust.
               set({
                error: error as Error,
                loading: false
              });
            }
          }
        },

        setSelectedStory: (story: SuccessStoryType | null) => set({ selectedStory: story }),

        fetchStoryBySlug: async (slug: string) => {
          try {
            set({ loading: true, error: null });

            // First check if we already have this story in our cache
            const existingStory = get().stories.find(s => s.slug === slug);
            if (existingStory) {
              set({
                selectedStory: existingStory,
                loading: false
              });
              return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories/slug/${slug}`);

            if (!response.ok) throw new Error(`Failed to fetch story with slug: ${slug}`);

            const data = await response.json();
            set(state => ({
              stories: state.stories.some(s => s.slug === slug)
                ? state.stories.map(s => s.slug === slug ? data : s)
                : [...state.stories, data],
              selectedStory: data,
              loading: false
            }));
          } catch (error) {
            console.error(`Error fetching story with slug ${slug}:`, error);
                set({
                  error: new Error(`Story with slug ${slug} not found`),
                  loading: false
                });
          }
        },

        fetchStoryById: async (id: string) => {
          try {
            set({ loading: true, error: null });
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories/${id}`);

            if (!response.ok) throw new Error('Failed to fetch story');

            const data = await response.json();
            set(state => ({
              stories: state.stories.some(s => s.id === id)
                ? state.stories.map(s => s.id === id ? data : s)
                : [...state.stories, data],
              loading: false
            }));
          } catch (error) {
            console.error('Error fetching story:', error);
                set({
                  error: new Error(`Story with slug ${id} not found`),
                  loading: false
                });
          }
        },
      }),
      {
        name: 'success-stories-storage',
        partialize: (state) => ({
          stories: state.stories,
          lastFetched: state.lastFetched
        })
      }
    )
  )
);

// Export the SuccessStoriesState interface under a shorter alias.
export type SuccessStory = SuccessStoryType;