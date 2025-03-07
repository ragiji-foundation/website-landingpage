export interface Feature {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  order: number;
  mediaItem: ImageMedia | VideoMedia;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface ImageMedia {
  type: 'image';
  url: string;
  thumbnail: string;
}

interface VideoMedia {
  type: 'video';
  url: string;
  thumbnail?: string;
}
