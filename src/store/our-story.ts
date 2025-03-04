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
  content: string;
  media: MediaItem[];
}

interface OurStoryState {
  data: StoryData | null;
  loading: boolean;
  error: string | null;
  fetchStory: () => Promise<void>;
}

const FALLBACK_DATA: StoryData = {
  id: 'fallback',
  title: 'Our Story',
  content: `<article class="story-content">
    <h2>The Beginning of Our Journey</h2>
    <p>UPAY – Under Privileged Advancement by Youth started as a small initiative...</p>
    </article>`,
  media: [
    {
      type: "image",
      url: "/images/fallback-center.jpg",
      title: "Our first center"
    }
  ]
};

export const useOurStoryStore = create<OurStoryState>()(
  devtools(
    (set) => ({
      data: null,
      loading: false,
      error: null,
      fetchStory: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/our-story`);
          if (!response.ok) throw new Error('Failed to fetch story');
          const data = await response.json();
          set({ data, loading: false });
        } catch (error) {
          console.error('Failed to fetch story:', error);
          set({
            error: 'Failed to load content',
            data: FALLBACK_DATA,
            loading: false
          });
        }
      },
    })
  )
);
