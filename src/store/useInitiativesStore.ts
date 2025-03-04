import { create } from 'zustand';
import { Initiative } from '@/types/initiative';

const mockInitiatives: Initiative[] = [
  {
    id: '1',
    title: 'Digital Literacy Program',
    description: 'Empowering communities through technology education',
    imageUrl: '/initiatives/digital-literacy.jpg',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Women Empowerment',
    description: 'Supporting women through skill development and entrepreneurship',
    imageUrl: '/initiatives/women-empowerment.jpg',
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Rural Education',
    description: 'Bringing quality education to rural areas',
    imageUrl: '/initiatives/rural-education.jpg',
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Add more mock data as needed
];

interface InitiativesState {
  items: Initiative[];
  loading: boolean;
  error: Error | null;
  fetchInitiatives: () => Promise<void>;
}

export const useInitiativesStore = create<InitiativesState>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchInitiatives: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/initiatives`);

      if (!response.ok) throw new Error('Failed to fetch initiatives');

      const data = await response.json();
      set({ items: data.sort((a: Initiative, b: Initiative) => a.order - b.order) });
    } catch (error) {
      console.error('Error fetching initiatives:', error);
      set({ items: mockInitiatives, error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));
