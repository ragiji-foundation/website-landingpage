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

export const useBannerStore = create<BannerState>()(
  devtools(
    (set, get) => ({
      banners: [],
      loading: false,
      error: null,

      fetchBanners: async (locale) => {
        set({ loading: true, error: null });

        try {
          const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
          if (!API_URL) {
            throw new Error('API URL is not configured');
          }

          // Add locale parameter to the request if provided
          const url = locale 
            ? `${API_URL}/api/banner?locale=${locale}`
            : `${API_URL}/api/banner`;
          
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
          set({ 
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






