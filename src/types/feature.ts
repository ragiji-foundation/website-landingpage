export interface RichTextMark {
  type: 'bold' | 'italic' | 'underline';
}

export interface RichTextNode {
  type: string;
  text?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
}

export interface RichTextDocument {
  type: 'doc';
  content: RichTextNode[];
}

export interface MediaItem {
  type: 'image' | 'video' | 'icon';
  url: string;
  thumbnail?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: string;
  order: number;
  mediaItem: MediaItem;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface FeatureSection {
  id: string;
  identifier: string;
  heading: string;
  content: Feature[];
  ctaButton: {
    text: string;
    url: string;
  };
}
