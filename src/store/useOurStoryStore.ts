/**
 * OurStoryStore - Manages state for our story page data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalization } from '@/utils/localization';

export interface OurStory {
  id: string;
  title: string;
  titleHi?: string;
  content: string;
  contentHi?: string;
  media?: {
    url: string;
    alt?: string;
  };
  isActive: boolean;
  version: number;
}

export interface OurStoryModel {
  id: string;
  description: string;
  descriptionHi?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisionMission {
  id: string;
  vision: string;
  visionHi?: string;
  mission: string;
  missionHi?: string;
  visionIcon?: string;
  missionIcon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  titleHi?: string;
  centers: number;
  volunteers: number;
  children: number;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface OurStoryStore {
  story: OurStory | null;
  model: OurStoryModel | null;
  visionMission: VisionMission | null;
  timeline: TimelineItem[];
  loading: boolean;
  error: Error | null;
  fetchStory: () => Promise<void>;
  getLocalizedStory: (locale: string) => OurStory | null;
  getLocalizedModel: (locale: string) => OurStoryModel | null;
  getLocalizedVisionMission: (locale: string) => VisionMission | null;
  getLocalizedTimeline: (locale: string) => TimelineItem[];
}

export const useOurStoryStore = create<OurStoryStore>()(
  devtools(
    (set, get) => ({
      story: null,
      model: null,
      visionMission: null,
      timeline: [],
      loading: false,
      error: null,
      
      fetchStory: async () => {
        try {
          set({ loading: true, error: null });
          
          // Check if API is disabled or we should use fallbacks
          const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
          const useFallbacks = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
          
          if (apiDisabled || useFallbacks) {
            // Use fallback data
            const fallbackStory: OurStory = {
              id: '1',
              title: 'Our Journey of Transformation',
              titleHi: 'परिवर्तन की हमारी यात्रा',
              content: 'The RAGIJI Foundation was established with a vision to transform the lives of underprivileged children through quality education and holistic development. Starting with a single center and a handful of volunteers, we have grown to impact thousands of children across multiple locations.',
              contentHi: 'रागिजी फाउंडेशन की स्थापना गुणवत्तापूर्ण शिक्षा और समग्र विकास के माध्यम से वंचित बच्चों के जीवन को बदलने के दृष्टिकोण के साथ की गई थी। एक केंद्र और कुछ स्वयंसेवकों के साथ शुरुआत करते हुए, हम कई स्थानों पर हजारों बच्चों को प्रभावित करने के लिए बढ़े हैं।',
              media: {
                url: '/images/our-story-image.svg',
                alt: 'RAGIJI Foundation Journey'
              },
              isActive: true,
              version: 1
            };
            
            set({ story: fallbackStory, loading: false });
            console.log('Using fallback data for our story');
            return;
          }
          
          const response = await fetch('/api/our-story');
          
          if (!response.ok) {
            throw new Error('Failed to fetch our story data');
          }
          
          const apiData = await response.json();
          // Parse and normalize media field
          const story = apiData.story ? {
            ...apiData.story,
            media: (() => {
              if (typeof apiData.story.media === 'string') {
                try {
                  const parsedMedia = JSON.parse(apiData.story.media);
                  return Array.isArray(parsedMedia) && parsedMedia.length > 0 ? parsedMedia[0] : undefined;
                } catch {
                  return undefined;
                }
              }
              return apiData.story.media;
            })()
          } : null;
          set({
            story,
            model: apiData.model || null,
            visionMission: apiData.visionMission || null,
            timeline: Array.isArray(apiData.timeline) ? apiData.timeline : [],
            loading: false
          });
        } catch (error) {
          console.error('Error fetching our story data:', error);
          
          // Use fallback data on error
          const fallbackStory: OurStory = {
            id: '1',
            title: 'Our Journey of Transformation',
            titleHi: 'परिवर्तन की हमारी यात्रा',
            content: 'The RAGIJI Foundation was established with a vision to transform the lives of underprivileged children through quality education and holistic development. Starting with a single center and a handful of volunteers, we have grown to impact thousands of children across multiple locations.',
            contentHi: 'रागिजी फाउंडेशन की स्थापना गुणवत्तापूर्ण शिक्षा और समग्र विकास के माध्यम से वंचित बच्चों के जीवन को बदलने के दृष्टिकोण के साथ की गई थी। एक केंद्र और कुछ स्वयंसेवकों के साथ शुरुआत करते हुए, हम कई स्थानों पर हजारों बच्चों को प्रभावित करने के लिए बढ़े हैं।',
            media: {
              url: '/images/our-story-image.svg',
              alt: 'RAGIJI Foundation Journey'
            },
            isActive: true,
            version: 1
          };
          
          set({ 
            story: fallbackStory,
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },
      
      getLocalizedStory: (locale: string) => {
        const { story } = get();
        if (!story) return null;
        return withLocalization(story, locale) as OurStory;
      },
      getLocalizedModel: (locale: string) => {
        const { model } = get();
        if (!model) return null;
        return withLocalization(model, locale) as OurStoryModel;
      },
      getLocalizedVisionMission: (locale: string) => {
        const { visionMission } = get();
        if (!visionMission) return null;
        return withLocalization(visionMission, locale) as VisionMission;
      },
      getLocalizedTimeline: (locale: string) => {
        const { timeline } = get();
        return withLocalization(timeline, locale) as TimelineItem[];
      }
    }),
    { name: 'our-story-store' }
  )
);