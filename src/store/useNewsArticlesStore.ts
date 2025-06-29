/**
 * NewsArticlesStore - Manages state for news articles
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalizedArray } from '@/utils/localization';

export interface NewsArticle {
  id: number;
  title: string;
  titleHi?: string;
  source: string;
  date: string;
  imageUrl?: string;
  link?: string;
  description?: string;
  descriptionHi?: string;
}

interface NewsArticlesStore {
  news: NewsArticle[];
  loading: boolean;
  error: Error | null;
  fetchNews: () => Promise<void>;
  getLocalizedNews: (locale: string) => NewsArticle[];
}

export const useNewsArticlesStore = create<NewsArticlesStore>()(
  devtools(
    (set, get) => ({
      news: [],
      loading: false,
      error: null,
      
      fetchNews: async () => {
        try {
          set({ loading: true, error: null });
          const response = await fetch('/api/news-articles');
          
          if (!response.ok) {
            throw new Error('Failed to fetch news articles');
          }
          
          const data = await response.json();
          // Sort by date (newest first)
          data.sort((a: NewsArticle, b: NewsArticle) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          
          set({ news: data, loading: false });
        } catch (error) {
          console.error('Error fetching news articles:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },
      
      getLocalizedNews: (locale: string) => {
        const { news } = get();
        return withLocalizedArray(news, locale) as NewsArticle[];
      }
    }),
    { name: 'news-articles-store' }
  )
);