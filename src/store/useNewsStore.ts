/**
 * NewsStore - Manages state for news articles with fallback handling
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { safeFetch } from '@/utils/api-config';

// Interface for the API response data
interface NewsArticleApiResponse {
  id: string | number;
  title: string;
  titleHi?: string;
  description?: string;
  descriptionHi?: string;
  summary?: string;
  summaryHi?: string;
  source: string;
  date: string;
  link?: string;
  sourceUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsArticle {
  id: string | number;
  title: string;
  titleHi?: string;
  summary?: string;
  summaryHi?: string;
  description?: string;
  descriptionHi?: string;
  source: string;
  date: string;
  sourceUrl?: string;
  link?: string;
  imageUrl?: string;
  featured?: boolean;
  order?: number;
}

// Fallback news articles
const fallbackNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'RAGIJI Foundation Opens Three New Centers in Rural Areas',
    titleHi: 'रागिजी फाउंडेशन ने ग्रामीण क्षेत्रों में तीन नए केंद्र खोले',
    summary: 'RAGIJI Foundation has expanded its reach by opening three new education centers in underserved rural areas, providing access to quality education for over 200 new children.',
    summaryHi: 'रागिजी फाउंडेशन ने वंचित ग्रामीण क्षेत्रों में तीन नए शिक्षा केंद्र खोलकर अपनी पहुंच का विस्तार किया है, जिससे 200 से अधिक नए बच्चों को गुणवत्तापूर्ण शिक्षा तक पहुंच प्राप्त होगी।',
    source: 'Education Today',
    date: '2023-06-15',
    sourceUrl: 'https://example.com/news/ragiji-expands',
    imageUrl: '/images/fallbacks/news-article.svg',
    featured: true,
    order: 1
  },
  {
    id: '2',
    title: 'Local Businesses Partner with RAGIJI Foundation for Skills Training',
    titleHi: 'स्थानीय व्यवसाय कौशल प्रशिक्षण के लिए रागिजी फाउंडेशन के साथ साझेदारी करते हैं',
    summary: 'Ten local businesses have partnered with RAGIJI Foundation to provide vocational training and employment opportunities for graduates of the foundation\'s education programs.',
    summaryHi: 'दस स्थानीय व्यवसायों ने फाउंडेशन के शिक्षा कार्यक्रमों के स्नातकों के लिए व्यावसायिक प्रशिक्षण और रोजगार के अवसर प्रदान करने के लिए रागिजी फाउंडेशन के साथ भागीदारी की है।',
    source: 'Business Chronicle',
    date: '2023-04-22',
    sourceUrl: 'https://example.com/news/business-partnerships',
    imageUrl: '/images/fallbacks/news-article.svg',
    order: 2
  },
  {
    id: '3',
    title: "RAGIJI Foundation's Literacy Program Shows Remarkable Results",
    titleHi: 'रागिजी फाउंडेशन के साक्षरता कार्यक्रम ने उल्लेखनीय परिणाम दिखाए',
    summary: "A recent independent study shows that children attending RAGIJI Foundation's literacy programs show 40% better reading comprehension than peers in similar demographic areas.",
    summaryHi: 'एक हालिया स्वतंत्र अध्ययन से पता चलता है कि रागिजी फाउंडेशन के साक्षरता कार्यक्रमों में भाग लेने वाले बच्चे समान जनसांख्यिकीय क्षेत्रों में साथियों की तुलना में 40% बेहतर पठन समझ दिखाते हैं।',
    source: 'Education Weekly',
    date: '2023-02-10',
    sourceUrl: 'https://example.com/news/literacy-results',
    imageUrl: '/images/fallbacks/news-article.svg',
    order: 3
  }
];

interface NewsStore {
  newsArticles: NewsArticle[];
  loading: boolean;
  error: Error | null;
  fetchNewsArticles: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>()(
  devtools(
    (set) => ({
      newsArticles: [],
      loading: false,
      error: null,
      
      fetchNewsArticles: async () => {
        set({ loading: true, error: null });
        
        const { data, error, fromFallback } = await safeFetch<NewsArticleApiResponse[]>(
          '/api/news-articles',
          fallbackNewsArticles,
          { method: 'GET' }
        );
        
        if (error) {
          console.warn(`Error fetching news articles: ${error.message}`);
          set({ 
            newsArticles: data,
            error,
            loading: false 
          });
          return;
        }
        
        try {
          // Transform API data to match our interface
          const transformedData = data.map((item: NewsArticleApiResponse) => ({
            ...item,
            id: String(item.id),
            summary: item.summary || item.description,
            summaryHi: item.summaryHi || item.descriptionHi,
            sourceUrl: item.sourceUrl || item.link,
          }));
          
          // Sort articles by featured status, order, and date
          const sortedArticles = [...transformedData].sort((a, b) => {
            // Sort by featured status first
            if (a.featured !== b.featured) {
              return a.featured ? -1 : 1;
            }
            
            // Then by order if available
            if ((a.order !== undefined) && (b.order !== undefined)) {
              return a.order - b.order;
            }
            
            // Finally by date (newest first)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          
          if (fromFallback) {
            console.log('Using fallback data for news articles');
          } else {
            console.log(`Loaded ${sortedArticles.length} news articles from API`);
          }
          
          set({ newsArticles: sortedArticles, loading: false });
        } catch (processingError) {
          console.error('Error processing news articles:', processingError);
          set({ 
            newsArticles: fallbackNewsArticles,
            error: processingError instanceof Error ? processingError : new Error(String(processingError)), 
            loading: false 
          });
        }
      }
    }),
    { name: 'news-store' }
  )
);