import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TimelineEvent {
  year: string;
  title: string;
  centers: number;
  volunteers: number;
  children: number;
}

export interface OurStoryData {
  story: {
    title: string;
    content: string;
    media: Array<{ type: string; url: string; title?: string }>;
  };
  model: {
    description: string;
    imageUrl: string;
  };
  visionMission: {
    vision: string;
    mission: string;
    visionIcon: string;
    missionIcon: string;
  };
  timeline: TimelineEvent[];
}

// Fallback data
const FALLBACK_DATA: OurStoryData = {
  story: {
    title: "Our Journey",
    content: "UPAY – Under Privileged Advancement by Youth started as a small initiative in 2010...",
    media: [
      {
        type: "image",
        url: "/images/fallback/first-center.jpg",
        title: "Our First Center"
      }
    ]
  },
  model: {
    description: "UPAY NGO empowers underprivileged communities through Education and Skill Development...",
    imageUrl: "/images/fallback/model.jpg"
  },
  visionMission: {
    vision: "A future where every child has a dignified childhood and equal opportunity.",
    mission: "To develop a sustainable ecosystem for the underprivileged by enabling, educating, and empowering.",
    visionIcon: "/images/fallback/vision-icon.svg",
    missionIcon: "/images/fallback/mission-icon.svg"
  },
  timeline: [
    { year: "2010", title: "INCEPTION", centers: 1, volunteers: 5, children: 30 },
    { year: "2015", title: "EXPANSION", centers: 15, volunteers: 150, children: 800 },
    { year: "2020", title: "GROWTH", centers: 44, volunteers: 500, children: 2500 }
  ]
};

interface OurStoryState {
  data: OurStoryData | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useOurStoryStore = create<OurStoryState>()(
  devtools(
    (set) => ({
      data: null,
      loading: true,
      error: null,
      fetchData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/our-story`);
          if (!response.ok) throw new Error('Failed to fetch data');
          const result = await response.json();
          set({ data: result, loading: false });
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
