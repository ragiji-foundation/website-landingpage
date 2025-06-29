/**
 * TimelineStore - Manages state for timeline data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalizedArray } from '@/utils/localization';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  titleHi?: string;
  centers: number;
  volunteers: number;
  children: number;
  order: number;
}

interface TimelineStore {
  timeline: TimelineItem[];
  loading: boolean;
  error: Error | null;
  fetchTimeline: () => Promise<void>;
  getLocalizedTimeline: (locale: string) => TimelineItem[];
}

export const useTimelineStore = create<TimelineStore>()(
  devtools(
    (set, get) => ({
      timeline: [],
      loading: false,
      error: null,
      
      fetchTimeline: async () => {
        try {
          set({ loading: true, error: null });
          
          // Check if API is disabled or we should use fallbacks
          const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
          const useFallbacks = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
          
          if (apiDisabled || useFallbacks) {
            // Use fallback data
            const fallbackTimeline: TimelineItem[] = [
              {
                id: '1',
                year: '2010',
                title: 'Foundation Established',
                titleHi: 'फाउंडेशन की स्थापना',
                centers: 1,
                volunteers: 5,
                children: 25,
                order: 1
              },
              {
                id: '2',
                year: '2015',
                title: 'First Expansion',
                titleHi: 'पहला विस्तार',
                centers: 3,
                volunteers: 15,
                children: 120,
                order: 2
              },
              {
                id: '3',
                year: '2018',
                title: 'Major Growth',
                titleHi: 'प्रमुख वृद्धि',
                centers: 8,
                volunteers: 45,
                children: 500,
                order: 3
              },
              {
                id: '4',
                year: '2023',
                title: 'Present Day',
                titleHi: 'वर्तमान समय',
                centers: 15,
                volunteers: 100,
                children: 1500,
                order: 4
              }
            ];
            
            set({ timeline: fallbackTimeline, loading: false });
            console.log('Using fallback data for timeline');
            return;
          }
          
          const response = await fetch('/api/timeline');
          
          if (!response.ok) {
            throw new Error('Failed to fetch timeline data');
          }
          
          const data = await response.json();
          // Sort timeline items by order or year
          data.sort((a: TimelineItem, b: TimelineItem) => a.order - b.order || a.year.localeCompare(b.year));
          
          set({ timeline: data, loading: false });
        } catch (error) {
          console.error('Error fetching timeline data:', error);
          
          // Use fallback data on error
          const fallbackTimeline: TimelineItem[] = [
            {
              id: '1',
              year: '2010',
              title: 'Foundation Established',
              titleHi: 'फाउंडेशन की स्थापना',
              centers: 1,
              volunteers: 5,
              children: 25,
              order: 1
            },
            {
              id: '2',
              year: '2015',
              title: 'First Expansion',
              titleHi: 'पहला विस्तार',
              centers: 3,
              volunteers: 15,
              children: 120,
              order: 2
            },
            {
              id: '3',
              year: '2018',
              title: 'Major Growth',
              titleHi: 'प्रमुख वृद्धि',
              centers: 8,
              volunteers: 45,
              children: 500,
              order: 3
            },
            {
              id: '4',
              year: '2023',
              title: 'Present Day',
              titleHi: 'वर्तमान समय',
              centers: 15,
              volunteers: 100,
              children: 1500,
              order: 4
            }
          ];
          
          set({ 
            timeline: fallbackTimeline,
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },
      
      getLocalizedTimeline: (locale: string) => {
        const { timeline } = get();
        return withLocalizedArray(timeline, locale) as TimelineItem[];
      }
    }),
    { name: 'timeline-store' }
  )
);