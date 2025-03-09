import { create } from 'zustand';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string; // Make sure this matches API response
  description: string;
  category: string;
  createdAt: string;
}

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  fetchGallery: () => Promise<void>;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchGallery: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      // Transform API data if needed to match GalleryItem interface
      const transformedData = data.map((item: any) => ({
        ...item,
        imageUrl: item.image_url || item.image || item.imageUrl, // Handle all possible field names
        image: item.image_url || item.image || item.imageUrl, // Ensure both properties are set
      }));
      set({ items: transformedData, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch gallery items' });
    } finally {
      set({ loading: false });
    }
  },
}));
