/**
 * SuccessStoriesStore - Manages success stories data with proper typing and fallbacks
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { safeFetch } from '@/utils/api-config';

export interface SuccessStory {
  id: string;
  title: string;
  titleHi: string | null;
  content: string;
  contentHi: string | null;
  personName: string;
  personNameHi: string | null;
  location: string;
  locationHi: string | null;
  imageUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  // Generated fields
  slug?: string;
}

interface SuccessStoriesState {
  stories: SuccessStory[];
  currentStory: SuccessStory | null;
  loading: boolean;
  error: Error | null;
  fetchStories: () => Promise<void>;
  getStoryBySlug: (slug: string) => SuccessStory | undefined;
  fetchStoryBySlug: (slug: string, locale: string) => Promise<SuccessStory | null>;
  getFeaturedStories: () => SuccessStory[];
}

export const useSuccessStoriesStore = create<SuccessStoriesState>()(
  devtools(
    (set, get) => ({
      stories: [],
      currentStory: null,
      loading: false,
      error: null,

      fetchStories: async () => {
        set({ loading: true, error: null });
        
        try {
          const { data, error } = await safeFetch<SuccessStory[]>(
            'https://admin.ragijifoundation.com/api/success-stories',
            [],
            { method: 'GET' }
          );

          if (error) {
            set({ error, loading: false });
            return;
          }

          // Process stories to add slugs
          const processedStories = data.map(story => ({
            ...story,
            slug: story.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
          }));

          // Sort stories: featured first, then by order, then by date
          const sortedStories = processedStories.sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            if (a.order !== b.order) return a.order - b.order;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

          set({ stories: sortedStories, loading: false });
        } catch (error) {
          console.error('Error fetching success stories:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },

      getStoryBySlug: (slug: string) => {
        return get().stories.find(story => story.slug === slug);
      },

      fetchStoryBySlug: async (slug: string, locale: string) => {
        set({ loading: true, error: null });
        
        try {
          // First try to find the story in our existing stories
          const existingStory = get().stories.find(s => s.slug === slug);
          if (existingStory) {
            set({ currentStory: existingStory, loading: false });
            return existingStory;
          }
          
          // If not found, fetch all stories (they will be cached for future use)
          await get().fetchStories();
          
          // Try to find the story again after fetching
          const story = get().stories.find(s => s.slug === slug);
          if (story) {
            set({ currentStory: story, loading: false });
            return story;
          }
          
          // If still not found, return null
          set({ currentStory: null, loading: false });
          return null;
        } catch (error) {
          console.error('Error fetching story by slug:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false,
            currentStory: null
          });
          return null;
        }
      },

      getFeaturedStories: () => {
        return get().stories.filter(story => story.featured);
      }
    }),
    { name: 'success-stories-store' }
  )
);