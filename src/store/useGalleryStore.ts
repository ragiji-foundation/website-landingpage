/**
 * GalleryStore - Manages state for gallery items with fallback data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { safeFetch } from '@/utils/api-config';

export interface GalleryItem {
  id: string | number;
  title: string;
  titleHi?: string | null;
  description?: string | null;
  descriptionHi?: string | null;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  categoryHi?: string | null;
  tags?: string[];
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  type?: 'image' | 'video';
}

// Fallback gallery items
const fallbackGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Tablet distribution',
    titleHi: null,
    description: '10वी एवं 12वी के मेघावी विद्यार्थी के उज्जवल भविष्य के लिए टेबलेट प्रोत्साहन स्वरूप दिए गए',
    descriptionHi: null,
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'event',
    categoryHi: null,
    createdAt: '2023-04-15T12:42:19.905Z',
    updatedAt: '2023-04-15T12:42:19.905Z',
    type: 'image'
  },
  {
    id: 2,
    title: 'Annual Fundraising Event',
    titleHi: 'वार्षिक धन उगाहने का कार्यक्रम',
    description: 'Our annual fundraising gala with supporters and volunteers',
    descriptionHi: 'समर्थकों और स्वयंसेवकों के साथ हमारा वार्षिक फंडरेजिंग समारोह',
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'event',
    categoryHi: null,
    createdAt: '2023-03-20T10:30:00.000Z',
    updatedAt: '2023-03-20T10:30:00.000Z',
    type: 'image'
  },
  {
    id: '3',
    title: 'Classroom Learning Session',
    titleHi: 'कक्षा शिक्षण सत्र',
    description: 'Interactive learning session with students and teachers',
    descriptionHi: 'छात्रों और शिक्षकों के साथ इंटरैक्टिव लर्निंग सेशन',
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'education',
    tags: ['classroom', 'learning', 'teaching'],
    date: '2023-02-10',
    type: 'image'
  },
  {
    id: '4',
    title: 'Volunteer Orientation Program',
    titleHi: 'स्वयंसेवक अभिविन्यास कार्यक्रम',
    description: 'New volunteers being oriented to our organization and programs',
    descriptionHi: 'नए स्वयंसेवकों को हमारे संगठन और कार्यक्रमों से परिचित कराया जा रहा है',
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'volunteers',
    tags: ['volunteer', 'orientation', 'training'],
    date: '2023-01-25',
    type: 'image'
  },
  {
    id: '5',
    title: 'Community Outreach Initiative',
    titleHi: 'सामुदायिक आउटरीच पहल',
    description: 'Our team engaging with community members during an outreach program',
    descriptionHi: 'आउटरीच कार्यक्रम के दौरान समुदाय के सदस्यों के साथ जुड़ी हमारी टीम',
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'community',
    tags: ['community', 'outreach', 'engagement'],
    date: '2022-12-05',
    type: 'image'
  },
  {
    id: '6',
    title: 'Overview of Education Center',
    titleHi: 'शिक्षा केंद्र का अवलोकन',
    description: 'A video tour of our main education center facilities',
    descriptionHi: 'हमारे मुख्य शिक्षा केंद्र सुविधाओं का एक वीडियो टूर',
    imageUrl: '/images/fallbacks/gallery-image.svg',
    category: 'facilities',
    tags: ['center', 'facility', 'tour'],
    date: '2022-11-18',
    type: 'video'
  }
];

interface GalleryStore {
  galleryItems: GalleryItem[];
  loading: boolean;
  error: Error | null;
  fetchGalleryItems: () => Promise<void>;
  getItemById: (id: string) => GalleryItem | undefined;
}

export const useGalleryStore = create<GalleryStore>()(
  devtools(
    (set, get) => ({
      galleryItems: [],
      loading: false,
      error: null,
      
      fetchGalleryItems: async () => {
        set({ loading: true, error: null });
        
        const { data, error, fromFallback } = await safeFetch<GalleryItem[]>(
          'https://admin.ragijifoundation.com/api/gallery',
          fallbackGalleryItems,
          { method: 'GET' }
        );
        
        if (error) {
          console.warn(`Error fetching gallery items: ${error.message}`);
          set({ 
            galleryItems: data,
            error,
            loading: false 
          });
          return;
        }
        
        try {
          // Process and transform the data if needed
          const processedItems = data.map(item => ({
            ...item,
            // Ensure id is a string for consistency
            id: String(item.id),
            // Use createdAt as date if date is not available
            date: item.date || item.createdAt,
            // Default to image type if not specified
            type: item.type || 'image'
          }));
          
          // Sort gallery items by date (newest first)
          const sortedItems = [...processedItems].sort((a, b) => {
            const dateA = a.date || a.createdAt || '';
            const dateB = b.date || b.createdAt || '';
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          });
          
          if (fromFallback) {
            console.log('Using fallback data for gallery items');
          } else {
            console.log(`Loaded ${sortedItems.length} gallery items from API`);
          }
          
          set({ galleryItems: sortedItems, loading: false });
        } catch (processingError) {
          console.error('Error processing gallery items:', processingError);
          set({ 
            galleryItems: fallbackGalleryItems,
            error: processingError instanceof Error ? processingError : new Error(String(processingError)), 
            loading: false 
          });
        }
      },
      
      getItemById: (id: string) => {
        const { galleryItems } = get();
        return galleryItems.find(item => item.id === id);
      }
    }),
    { name: 'gallery-store' }
  )
);
