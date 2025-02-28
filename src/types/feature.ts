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
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: RichTextDocument;
  mediaItem: MediaItem;
  order: number;
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
