import { create } from 'zustand';
import { Banner, BannerType } from '@/types/banner';
import { mockBanners } from '@/data/mock-banners';

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
  fetchBanners: () => Promise<void>;
  getBannerByType: (type: BannerType) => Banner | undefined;
}

export const useBannerStore = create<BannerState>((set, get) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/banners`);
      if (!response.ok) throw new Error('Failed to fetch banners');
      const data = await response.json();
      set({ banners: data, loading: false });
    } catch (error) {
      console.error('Error fetching banners:', error);
      set({ banners: mockBanners, error: error as Error, loading: false });
    }
  },

  getBannerByType: (type: BannerType) => {
    const { banners } = get();
    return banners.find(banner => banner.type === type);
  }
}));
