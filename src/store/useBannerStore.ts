import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type BannerType = 'blog' | 'about' | 'initiatives' | 'successstories' | 'home' | 'media' |
  'electronicmedia' | 'gallery' | 'newscoverage' | 'ourstory' | 'need' | 'centers' | 'contactus' | 'careers' | 'awards' | 'error';

export interface Banner {
  id: string;
  type: BannerType;
  title: string;
  description: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  createdAt: string;
  updatedAt: string;
  locale?: string; // Add locale field for internationalization
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
  fetchBanners: (locale?: string) => Promise<void>;
  getBannerByType: (type: BannerType | string, locale?: string) => Banner | null;
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

      getBannerByType: (type, locale) => {
        const { banners } = get();

        // First try to find a banner with matching type and locale
        if (locale) {
          const localizedBanner = banners.find(
            banner => banner.type === type && banner.locale === locale
          );
          if (localizedBanner) return localizedBanner;
        }

        // Fall back to a banner with just matching type
        return banners.find(banner => banner.type === type) || null;
      }
    })
  )
);






