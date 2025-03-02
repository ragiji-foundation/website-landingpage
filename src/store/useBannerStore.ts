import { create } from 'zustand';

interface Banner {
  id: string;
  type: string;
  title: string;
  description: string | null;
  backgroundImage: string;
  createdAt: string;
  updatedAt: string;
}

interface BannerStore {
  banners: Banner[];
  loading: boolean;
  error: Error | null;
  fetchBanners: () => Promise<void>;
  getBannerByType: (type: string) => Banner | undefined;
}

export const useBannerStore = create<BannerStore>((set, get) => ({
  banners: [],
  loading: false,
  error: null,
  fetchBanners: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/banners`);
      if (!response.ok) throw new Error('Failed to fetch banners');
      const data = await response.json();
      set({ banners: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch banners'),
        loading: false
      });
    }
  },
  getBannerByType: (type: string) => {
    return get().banners.find(banner => banner.type === type);
  }
}));
