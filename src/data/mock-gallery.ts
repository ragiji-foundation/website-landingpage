import { GalleryItem } from '@/types/gallery';

export const mockGallery: GalleryItem[] = [
  {
    id: "1",
    title: 'Education Program Launch',
    description: 'Launch of our new digital literacy program',
    imageUrl: '/gallery/education-launch.jpg',
    category: 'Education',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: "2",
    title: 'Community Health Camp',
    description: 'Free health checkup camp in rural areas',
    imageUrl: '/gallery/health-camp.jpg',
    category: 'Healthcare',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  // ... add more mock gallery items with string IDs
];
