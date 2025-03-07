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

          // Fix: Add more robust fetch with better error handling and credentials
          const response = await fetch(`${API_URL}/api/banner`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Accept': 'application/json'
            },
            next: { revalidate: 0 } // For Next.js 13+
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Banner API error:', errorText);
            throw new Error(`Failed to fetch banners: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Banners fetched successfully:', data);
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
        console.log(`Looking for banner type: ${type}, Available banners:`, banners);
        const banner = banners.find(b => b.type === type);

        // Return the found banner or null (no default banners)
        return banner || null;
      }
    })
  )
);






