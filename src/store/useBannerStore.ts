import { create } from 'zustand';

// Define valid banner types
export type BannerType =
  | 'blog'
  | 'about'
  | 'initiatives'
  | 'successstories'
  | 'home'
  | 'media'
  | 'electronicmedia'
  | 'gallery'
  | 'newscoverage'
  | 'ourstory'
  | 'need'
  | 'centers'
  | 'contactus'
  | 'careers'
  | 'awards';

// Type guard to check if a string is a valid banner type
export function isBannerType(type: string): type is BannerType {
  return [
    'blog', 'about', 'initiatives', 'successstories', 'home', 'media',
    'electronicmedia', 'gallery', 'newscoverage', 'ourstory', 'need',
    'centers', 'contactus', 'careers', 'awards'
  ].includes(type);
}

export interface Banner {
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
  initialized: boolean; // Track if we've attempted to fetch banners
  fetchBanners: () => Promise<void>;
  getBannerByType: (type: string, useFallback?: boolean) => Banner | undefined;
}

// Default banner title for fallbacks
const DEFAULT_TITLES: Record<BannerType, string> = {
  blog: 'Blog',
  about: 'About Us',
  initiatives: 'Our Initiatives',
  successstories: 'Success Stories',
  home: 'Welcome',
  media: 'Media',
  electronicmedia: 'Electronic Media',
  gallery: 'Gallery',
  newscoverage: 'News Coverage',
  ourstory: 'Our Story',
  need: 'The Need',
  centers: 'Our Centers',
  contactus: 'Contact Us',
  careers: 'Careers',
  awards: 'Awards & Recognition'
};

// Map of banner types to their gradient colors - using India flag inspired colors
const GRADIENT_COLORS: Record<BannerType, string> = {
  blog: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
  about: 'linear-gradient(135deg, #138808 0%, #FFFFFF 50%, #FF9933 100%)',
  initiatives: 'linear-gradient(45deg, #FF9933 0%, #FFFFFF 40%, #138808 80%)',
  successstories: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
  home: 'linear-gradient(180deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
  media: 'linear-gradient(135deg, #FF9933 20%, #FFFFFF 50%, #138808 80%)',
  electronicmedia: 'linear-gradient(45deg, #138808 0%, #FFFFFF 50%, #FF9933 100%)',
  gallery: 'linear-gradient(90deg, #138808 0%, #FFFFFF 50%, #FF9933 100%)',
  newscoverage: 'linear-gradient(135deg, #FF9933 10%, #FFFFFF 50%, #138808 90%)',
  ourstory: 'linear-gradient(45deg, #FF9933 10%, #FFFFFF 50%, #138808 90%)',
  need: 'linear-gradient(180deg, #138808 0%, #FFFFFF 50%, #FF9933 100%)',
  centers: 'linear-gradient(90deg, #FF9933 10%, #FFFFFF 40%, #138808 90%)',
  contactus: 'linear-gradient(135deg, #138808 10%, #FFFFFF 60%, #FF9933 90%)',
  careers: 'linear-gradient(45deg, #FF9933 20%, #FFFFFF 60%, #138808 90%)',
  awards: 'linear-gradient(90deg, #138808 10%, #FFFFFF 60%, #FF9933 90%)'
};

/**
 * Create a data URI for a gradient background to use as fallback
 */
function createGradientDataUri(type: BannerType): string {
  // Default to the blog gradient if the type doesn't exist
  const gradient = GRADIENT_COLORS[type] || GRADIENT_COLORS.blog;

  // Create an SVG with the gradient
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400">
      <rect width="1200" height="400" fill="${gradient}" />
    </svg>
  `;

  // Convert to data URI
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate a default banner for a given type
 */
function generateDefaultBanner(type: BannerType): Banner {
  return {
    id: `default-${type}`,
    type,
    title: DEFAULT_TITLES[type] || 'Banner',
    description: null,
    backgroundImage: createGradientDataUri(type),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export const useBannerStore = create<BannerStore>((set, get) => ({
  banners: [],
  loading: false,
  error: null,
  initialized: false, // Start as not initialized

  fetchBanners: async () => {
    // Check if we're already loading or have banners and were initialized
    if (get().loading || (get().banners.length > 0 && get().initialized)) {
      return; // Prevent duplicate requests
    }

    set({ loading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/banner`);

      if (!response.ok) throw new Error('Failed to fetch banners');

      const data = await response.json();
      set({ banners: data, loading: false, initialized: true });
    } catch (error) {
      console.error('Banner API error:', error);
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch banners'),
        loading: false,
        initialized: true // Still mark as initialized to prevent retries on error
      });
    }
  },

  getBannerByType: (type: string, useFallback = true) => {
    const banner = get().banners.find(banner => banner.type === type);

    // If banner not found and fallback is enabled, generate a default banner
    if (!banner && useFallback && isBannerType(type)) {
      return generateDefaultBanner(type);
    }

    return banner;
  }
}));
