import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type BannerType = 'blog' | 'about' | 'initiatives' | 'successstories' | 'media' |
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
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
  fetchBanners: () => Promise<void>;
  getBannerByType: (type: BannerType | string) => Banner | null;
}

export const useBannerStore = create<BannerState>()(
  devtools(
    (set, get) => ({
      banners: [],
      loading: false,
      error: null,

      fetchBanners: async () => {
        set({ loading: true, error: null });

        try {
          const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
          if (!API_URL) {
            throw new Error('API URL is not configured');
          }

          const response = await fetch(`${API_URL}/api/banner`, {
            cache: 'no-store', // Ensure we don't use browser cache
            headers: {
              'Cache-Control': 'no-cache'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch banners');
          }

          const data = await response.json();
          set({
            banners: data,
            loading: false,
            error: null
          });
        } catch (error) {
          console.error('Error fetching banners:', error);
          set({
            error: error as Error,
            loading: false
          });
        }
      },

      getBannerByType: (type) => {
        const { banners } = get();
        const banner = banners.find(b => b.type === type);

        // Return the found banner or null (no default banners)
        return banner || null;
      }
    })
  )
);






