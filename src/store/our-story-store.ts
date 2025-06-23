import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TimelineEvent {
  year: string;
  title: string;
  titleHi?: string;
  centers: number;
  volunteers: number;
  children: number;
}

export interface OurStoryData {
  story: {
    title: string;
    titleHi?: string;
    content: string;
    contentHi?: string;
    media: Array<{ type: string; url: string; title?: string }>;
  };
  model: {
    description: string;
    descriptionHi?: string;
    imageUrl: string;
  };
  visionMission: {
    vision: string;
    visionHi?: string;
    mission: string;
    missionHi?: string;
    visionIcon: string;
    missionIcon: string;
  };
  timeline: TimelineEvent[];
  locale?: string;
}

interface OurStoryState {
  data: OurStoryData | null;
  loading: boolean;
  error: string | null;
  fetchData: (locale?: string) => Promise<void>;
}

export const useOurStoryStore = create<OurStoryState>()(
  devtools(
    (set) => ({
      data: null,
      loading: true,
      error: null,
      fetchData: async (locale = 'en') => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/our-story?locale=${locale}`);
          if (!response.ok) throw new Error('Failed to fetch data');
          const result = await response.json();
          set({ data: { ...result, locale }, loading: false });
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
