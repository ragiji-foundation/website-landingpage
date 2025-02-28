import { create } from 'zustand';
import { GalleryItem } from '@/types/gallery';
import { mockGallery } from '@/data/mock-gallery';

interface GalleryState {
  items: GalleryItem[];
  selectedImage: GalleryItem | null;
  loading: boolean;
  error: Error | null;
  fetchGallery: () => Promise<void>;
  setSelectedImage: (image: GalleryItem | null) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  items: [],
  selectedImage: null,
  loading: false,
  error: null,
  fetchGallery: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/gallery`);
      if (!response.ok) throw new Error('Failed to fetch gallery');
      const data = await response.json();
      set({ items: data, loading: false });
    } catch (error) {
      console.error('Error fetching gallery:', error);
      set({ items: mockGallery, error: error as Error, loading: false });
    }
  },
  setSelectedImage: (image) => set({ selectedImage: image }),
}));
