import { Initiative } from '@/types/initiative';

export const mockInitiatives: Initiative[] = [
  {
    id: "1",
    title: "Footpathshaala",
    description: "Educational program for street children focusing on basic literacy and numeracy skills.",
    imageUrl: "/initiatives/footpathshaala.jpg",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // ... add more mock initiatives
];
