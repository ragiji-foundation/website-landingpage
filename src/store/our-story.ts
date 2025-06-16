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
  locale?: string;
}

// Locale-specific fallback data
const FALLBACK_DATA: Record<string, StoryData> = {
  en: {
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
    ],
    locale: 'en'
  },
  hi: {
    id: 'fallback',
    title: 'हमारी कहानी',
    content: `<article class="story-content">
      <h2>हमारी यात्रा की शुरुआत</h2>
      <p>UPAY – अंडर प्रिविलेज्ड एडवांसमेंट बाय यूथ की शुरुआत एक छोटी पहल के रूप में हुई...</p>
      </article>`,
    media: [
      {
        type: "image",
        url: "/images/fallback-center.jpg",
        title: "हमारा पहला केंद्र"
      }
    ],
    locale: 'hi'
  }
};

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
            data: FALLBACK_DATA[locale] || FALLBACK_DATA.en,
            loading: false
          });
        }
      },
    })
  )
);
