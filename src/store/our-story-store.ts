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
  locale?: string;
}

// Locale-specific fallback data
const FALLBACK_DATA: Record<string, OurStoryData> = {
  en: {
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
    ],
    locale: 'en'
  },
  hi: {
    story: {
      title: "हमारी यात्रा",
      content: "UPAY – अंडर प्रिविलेज्ड एडवांसमेंट बाय यूथ की शुरुआत 2010 में एक छोटी पहल के रूप में हुई...",
      media: [
        {
          type: "image",
          url: "/images/fallback/first-center.jpg",
          title: "हमारा पहला केंद्र"
        }
      ]
    },
    model: {
      description: "UPAY NGO वंचित समुदायों को शिक्षा और कौशल विकास के माध्यम से सशक्त बनाता है...",
      imageUrl: "/images/fallback/model.jpg"
    },
    visionMission: {
      vision: "एक ऐसा भविष्य जहां हर बच्चे का सम्मानपूर्ण बचपन और समान अवसर हो।",
      mission: "सक्षम बनाने, शिक्षित करने और सशक्त बनाने के माध्यम से वंचितों के लिए एक स्थायी पारिस्थितिकी तंत्र विकसित करना।",
      visionIcon: "/images/fallback/vision-icon.svg",
      missionIcon: "/images/fallback/mission-icon.svg"
    },
    timeline: [
      { year: "2010", title: "शुरुआत", centers: 1, volunteers: 5, children: 30 },
      { year: "2015", title: "विस्तार", centers: 15, volunteers: 150, children: 800 },
      { year: "2020", title: "विकास", centers: 44, volunteers: 500, children: 2500 }
    ],
    locale: 'hi'
  }
};

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
            data: FALLBACK_DATA[locale] || FALLBACK_DATA.en,
            loading: false
          });
        }
      },
    })
  )
);
