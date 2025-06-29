/**
 * Types related to banners throughout the application
 */

export type BannerType = 
  | 'home' 
  | 'about-us'
  | 'our-story'
  | 'the-need'
  | 'success-stories'
  | 'successstories'  // Allow both formats
  | 'centers'
  | 'media'
  | 'news'
  | 'gallery'
  | 'electronic-media'
  | 'careers'
  | 'volunteer'
  | 'contact'
  | 'story'
  | 'default';

export interface Banner {
  id: string;
  type: BannerType;
  title: string;
  description?: string;
  backgroundImage: string;
  createdAt: string;
  updatedAt: string;
}
