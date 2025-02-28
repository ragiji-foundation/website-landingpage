import { Banner } from '@/types/banner';

export const mockBanners: Banner[] = [
  {
    id: '1',
    type: 'home',
    title: 'Welcome to Ragi Foundation',
    description: 'Empowering communities through education and development',
    backgroundImage: '/banners/home-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'about',
    title: 'About Us',
    description: 'Learn about our mission and impact',
    backgroundImage: '/banners/about-banner.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  // Add more mock banners as needed
];
