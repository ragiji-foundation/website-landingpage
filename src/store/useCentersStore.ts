/**
 * CentersStore - Manages state for centers data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalizedArray, withLocalization } from '@/utils/localization';

export interface Center {
  id: number;
  name: string;
  nameHi?: string;
  location: string;
  locationHi?: string;
  description: string;
  descriptionHi?: string;
  imageUrl?: string;
  contactInfo?: string;
  slug: string; // <-- Added slug property
}

interface CentersStore {
  centers: Center[];
  currentCenter: Center | null;
  loading: boolean;
  error: Error | null;
  fetchCenters: () => Promise<void>;
  fetchCenterById: (id: number, locale: string) => Promise<Center | null>;
  getLocalizedCenters: (locale: string) => Center[];
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing hyphens
}   

export const useCentersStore = create<CentersStore>()(
  devtools(
    (set, get) => ({
      centers: [],
      currentCenter: null,
      loading: false,
      error: null,
      /**
       * Fetches all centers from the API and sets them in the store.
       */ 
    fetchCenters: async () => {
  try {
    set({ loading: true, error: null });
    const response = await fetch('/api/centers');
    if (!response.ok) {
      throw new Error('Failed to fetch centers');
    }
    const result = await response.json();
    // Attach slug to each center
    const centersWithSlugs = Array.isArray(result.data)
      ? result.data.map((center: Center) => ({
          ...center,
          slug: slugify(center.name),
        }))
      : [];
    set({ centers: centersWithSlugs, loading: false });
  } catch (error) {
    console.error('Error fetching centers:', error);
    set({ 
      error: error instanceof Error ? error : new Error(String(error)), 
      loading: false 
    });
  }
},
      
      fetchCenterById: async (id: number, locale: string) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(`/api/centers/${id}?locale=${locale}`);
          
          if (!response.ok) {
            if (response.status === 404) {
              set({ loading: false });
              return null;
            }
            throw new Error('Failed to fetch center');
          }
          
          const center = await response.json();
          set({ currentCenter: center, loading: false });
          return center;
        } catch (error) {
          console.error('Error fetching center by ID:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
          return null;
        }
      },
      
      getLocalizedCenters: (locale: string) => {
        const { centers } = get();
        return withLocalizedArray(centers, locale) as Center[];
      }
    }),
    { name: 'centers-store' }
  )
);