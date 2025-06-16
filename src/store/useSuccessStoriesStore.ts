import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SuccessStory as SuccessStoryType } from '@/types/success-story'; // Aliased import

// Export the SuccessStory type from the store file itself
export interface SuccessStoriesState {
  stories: SuccessStoryType[];
  selectedStory: SuccessStoryType | null;
  loading: boolean;
  error: Error | null;
  fetchStories: (locale?: string) => Promise<void>;
  setSelectedStory: (story: SuccessStoryType | null) => void;
  fetchStoryBySlug: (slug: string, locale?: string) => Promise<void>;
  fetchStoryById: (id: string, locale?: string) => Promise<void>;
  retryCount: number;
  lastFetched: number | null;
  currentLocale: string;
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
        currentLocale: 'en',

        fetchStories: async (locale = 'en') => {
          const state = get();
          
          // Return cached data if within cache duration and same locale
          if (
            state.lastFetched && 
            Date.now() - state.lastFetched < CACHE_DURATION && 
            locale === state.currentLocale
          ) {
            return;
          }

          try {
            set({ loading: true, error: null });
            const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories?locale=${locale}`);

            if (!response.ok) throw new Error('Failed to fetch success stories');

            const data = await response.json();
            set({
              stories: data.sort((a: SuccessStoryType, b: SuccessStoryType) => {
                if (a.featured === b.featured) return a.order - b.order;
                return a.featured ? -1 : 1;
              }),
              loading: false,
              lastFetched: Date.now(),
              retryCount: 0,
              currentLocale: locale
            });
          } catch (error) {
            console.error('Error fetching success stories:', error);

            // If we have no stories and haven't exceeded retry limit
            if (get().stories.length === 0 && get().retryCount < MAX_RETRIES) {
              set(state => ({ retryCount: state.retryCount + 1 }));
              setTimeout(() => get().fetchStories(locale), 1000 * get().retryCount);
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

        fetchStoryBySlug: async (slug: string, locale = 'en') => {
          try {
            set({ loading: true, error: null });

            // First check if we already have this story in our cache for this locale
            const existingStory = get().stories.find(
              s => s.slug === slug && (s.locale === locale || !s.locale)
            );
            
            if (existingStory) {
              set({
                selectedStory: existingStory,
                loading: false
              });
              return;
            }

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories/slug/${slug}?locale=${locale}`
            );

            if (!response.ok) throw new Error(`Failed to fetch story with slug: ${slug}`);

            const data = await response.json();
            set(state => ({
              stories: [...state.stories.filter(s => !(s.slug === slug && s.locale === locale)), 
                       {...data, locale}],
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

        fetchStoryById: async (id: string, locale = 'en') => {
          try {
            set({ loading: true, error: null });
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/success-stories/${id}?locale=${locale}`
            );

            if (!response.ok) throw new Error('Failed to fetch story');

            const data = await response.json();
            set(state => ({
              stories: [...state.stories.filter(s => !(s.id === id && s.locale === locale)),
                       {...data, locale}],
              loading: false
            }));
          } catch (error) {
            console.error('Error fetching story:', error);
                set({
                  error: new Error(`Story with ID ${id} not found`),
                  loading: false
                });
          }
        },
      }),
      {
        name: 'success-stories-storage',
        partialize: (state) => ({
          stories: state.stories,
          lastFetched: state.lastFetched,
          currentLocale: state.currentLocale
        })
      }
    )
  )
);

// Export the SuccessStoriesState interface under a shorter alias.
export type SuccessStory = SuccessStoryType;