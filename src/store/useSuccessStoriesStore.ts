import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SuccessStory } from '@/types/success-story';
import { mockSuccessStories } from '@/data/mock-success-stories';

interface SuccessStoriesState {
  stories: SuccessStory[];
  selectedStory: SuccessStory | null;
  loading: boolean;
  error: Error | null;
  fetchStories: () => Promise<void>;
  setSelectedStory: (story: SuccessStory | null) => void;
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
              stories: data.sort((a: SuccessStory, b: SuccessStory) => {
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
              // Use mock data as fallback
              set({
                stories: get().stories.length ? get().stories : mockSuccessStories,
                error: error as Error,
                loading: false
              });
            }
          }
        },

        setSelectedStory: (story) => set({ selectedStory: story }),

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

            // Use mock data as fallback for individual story
            const mockStory = mockSuccessStories.find(s => s.id === id);
            if (mockStory) {
              set(state => ({
                stories: state.stories.some(s => s.id === id)
                  ? state.stories.map(s => s.id === id ? mockStory : s)
                  : [...state.stories, mockStory],
                error: error as Error,
                loading: false
              }));
            }
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
