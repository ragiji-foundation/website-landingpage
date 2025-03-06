export interface SuccessStory {
  id: string;
  slug: string;  // Add the slug property
  title: string;
  content: any;  // Could be more specific based on your content structure
  personName: string;
  location: string;
  imageUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  category?: string;
}
