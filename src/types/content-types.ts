export interface RichTextMark {
  type: 'bold' | 'italic' | 'underline';
}

export interface RichTextNode {
  type: string;
  text?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
  level?: number;
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

export interface ContentItem {
  title: string;
  slug?: string;
  description: string | RichTextDocument;
  mediaItem: MediaItem;
}
