export type BannerType = 'blog' | 'about' | 'initiatives' | 'successstories' | 'home' | 'media' |
  'electronicmedia' | 'gallery' | 'newscoverage' | 'ourstory' | 'need' | 'centers' |
  'contactus' | 'careers' | 'awards' | 'error';;

export interface Banner {
  id: string;
  type: BannerType;
  title: string;
  description?: string;
  backgroundImage: string;
  createdAt: string;
  updatedAt: string;
}
