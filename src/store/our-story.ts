import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

export interface StoryData {
  id: string;
  title: string;
  titleHi?: string;
  content: string;
  contentHi?: string;
  media: MediaItem[];
  locale?: string;
}

interface OurStoryState {
  data: StoryData | null;
  loading: boolean;
  error: string | null;
  fetchStory: (locale?: string) => Promise<void>;
}

export const useOurStoryStore = create<OurStoryState>()(
  devtools(
    (set) => ({
      data: null,
      loading: false,
      error: null,
      fetchStory: async (locale = 'en') => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/our-story?locale=${locale}`);
          if (!response.ok) throw new Error('Failed to fetch story');
          const data = await response.json();
          set({ data: { ...data, locale }, loading: false });
        } catch (error) {
          console.error('Failed to fetch story:', error);
          set({
            error: 'Failed to load content',
            data: null,
            loading: false
          });
        }
      },
    })
  )
);
