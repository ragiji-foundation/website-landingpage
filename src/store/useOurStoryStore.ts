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

interface OurStoryStore {
  story: OurStory | null;
  loading: boolean;
  error: Error | null;
  fetchStory: () => Promise<void>;
  getLocalizedStory: (locale: string) => OurStory | null;
}

export const useOurStoryStore = create<OurStoryStore>()(
  devtools(
    (set, get) => ({
      story: null,
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
          
          const data = await response.json();
          set({ story: data, loading: false });
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
      }
    }),
    { name: 'our-story-store' }
  )
);