import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type BannerType = 'blog' | 'about' | 'initiatives' | 'successstories' | 'home' | 'media' |
  'electronicmedia' | 'gallery' | 'newscoverage' | 'ourstory' | 'need' | 'centers' | 'contactus' | 'careers' | 'awards' | 'error';

export interface Banner {
  id: string;
  type: BannerType;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  backgroundImage: string;
  createdAt: string;
  updatedAt: string;
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
  fetchBanners: (locale?: string) => Promise<void>;
  getBannerByType: (type: BannerType | string) => Banner | null;
}

// Initial fallback banners for immediate availability
const INITIAL_BANNERS: Banner[] = [
  {
    id: '1',
    type: 'home' as BannerType,
    title: 'Welcome to Ragiji Foundation',
    titleHi: 'रागिजी फाउंडेशन में आपका स्वागत है',
    description: 'Empowering communities through education and support.',
    descriptionHi: 'शिक्षा और सहायता के माध्यम से समुदायों को सशक्त बनाना।',
    backgroundImage: '/banners/home-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'centers' as BannerType,
    title: 'Our Centers',
    titleHi: 'हमारे केंद्र',
    description: 'Discover our network of education centers.',
    descriptionHi: 'हमारे शिक्षा केंद्रों के नेटवर्क की खोज करें।',
    backgroundImage: '/banners/centers-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    type: 'awards' as BannerType,
    title: 'Recognition & Awards',
    titleHi: 'पहचान और पुरस्कार',
    description: 'Celebrating our achievements and milestones.',
    descriptionHi: 'हमारी उपलब्धियों और मील के पत्थर का जश्न मनाना।',
    backgroundImage: '/banners/awards-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    type: 'need' as BannerType,
    title: 'The Need',
    titleHi: 'आवश्यकता',
    description: 'Understanding the challenges we address.',
    descriptionHi: 'हमारे द्वारा संबोधित चुनौतियों को समझना।',
    backgroundImage: '/banners/need-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    type: 'newscoverage' as BannerType,
    title: 'News Coverage',
    titleHi: 'समाचार कवरेज',
    description: 'Latest news and media coverage.',
    descriptionHi: 'नवीनतम समाचार और मीडिया कवरेज।',
    backgroundImage: '/banners/news-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    type: 'blogs' as BannerType,
    title: 'Blog Posts',
    titleHi: 'ब्लॉग पोस्ट',
    description: 'Read our latest insights and stories.',
    descriptionHi: 'हमारी नवीनतम अंतर्दृष्टि और कहानियां पढ़ें।',
    backgroundImage: '/banners/blog-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useBannerStore = create<BannerState>()(
  devtools(
    (set, get) => ({
      banners: INITIAL_BANNERS, // Start with fallback data instead of empty array
      loading: false,
      error: null,

      fetchBanners: async (locale) => {
        set({ loading: true, error: null });

        try {
          // Use the proxy route instead of direct admin API call
          const url = locale 
            ? `/api/banners?locale=${locale}`
            : `/api/banners`;
          
          const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Accept': 'application/json'
            },
            next: { revalidate: 0 }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch banners: ${response.status}`);
          }

          const data = await response.json();
          set({ banners: data, loading: false });
        } catch (error) {
          console.error('Failed to fetch banners:', error);
          
          // Set fallback banners when API fails
          const fallbackBanners = [
            {
              id: '1',
              type: 'home' as BannerType,
              title: 'Welcome to Ragiji Foundation',
              titleHi: 'रागिजी फाउंडेशन में आपका स्वागत है',
              description: 'Empowering communities through education and support.',
              descriptionHi: 'शिक्षा और सहायता के माध्यम से समुदायों को सशक्त बनाना।',
              backgroundImage: '/banners/home-banner.jpg',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '2',
              type: 'centers' as BannerType,
              title: 'Our Centers',
              titleHi: 'हमारे केंद्र',
              description: 'Discover our network of education centers.',
              descriptionHi: 'हमारे शिक्षा केंद्रों के नेटवर्क की खोज करें।',
              backgroundImage: '/banners/centers-banner.jpg',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '3',
              type: 'awards' as BannerType,
              title: 'Recognition & Awards',
              titleHi: 'पहचान और पुरस्कार',
              description: 'Celebrating our achievements and milestones.',
              descriptionHi: 'हमारी उपलब्धियों और मील के पत्थर का जश्न मनाना।',
              backgroundImage: '/banners/awards-banner.jpg',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '4',
              type: 'need' as BannerType,
              title: 'The Need',
              titleHi: 'आवश्यकता',
              description: 'Understanding the challenges we address.',
              descriptionHi: 'हमारे द्वारा संबोधित चुनौतियों को समझना।',
              backgroundImage: '/banners/need-banner.jpg',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '5',
              type: 'newscoverage' as BannerType,
              title: 'News Coverage',
              titleHi: 'समाचार कवरेज',
              description: 'Latest news and media coverage.',
              descriptionHi: 'नवीनतम समाचार और मीडिया कवरेज।',
              backgroundImage: '/banners/news-banner.jpg',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ];
          
          set({ 
            banners: fallbackBanners,
            error: error instanceof Error ? error : new Error('Unknown error occurred'), 
            loading: false 
          });
        }
      },

      getBannerByType: (type) => {
        const { banners } = get();
        // Return the first banner matching the type
        return banners.find(banner => banner.type === type) || null;
      }
    })
  )
);






