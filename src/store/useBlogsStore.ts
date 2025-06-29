/**
 * BlogsStore - Manages state for blogs data
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { withLocalizedArray, withLocalization } from '@/utils/localization';

export interface Blog {
  id: number;
  slug: string;
  locale: string;
  title: string;
  titleHi?: string;
  content: string;
  contentHi?: string;
  status: string;
  authorName: string;
  authorNameHi?: string;
  metaDescription?: string;
  metaDescriptionHi?: string;
  categoryId?: number;
  createdAt: string;
  excerpt?: string;
}

interface BlogsStore {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: Error | null;
  fetchBlogs: (locale: string) => Promise<void>;
  fetchBlogBySlug: (slug: string, locale: string) => Promise<Blog | null>;
  getLocalizedBlogs: (locale: string) => Blog[];
}

export const useBlogsStore = create<BlogsStore>()(
  devtools(
    (set, get) => ({
      blogs: [],
      currentBlog: null,
      loading: false,
      error: null,
      
      fetchBlogs: async (locale: string) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(`/api/blogs?locale=${locale}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch blogs');
          }
          
          const data = await response.json();
          set({ blogs: data, loading: false });
        } catch (error) {
          console.error('Error fetching blogs:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
        }
      },
      
      fetchBlogBySlug: async (slug: string, locale: string) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(`/api/blogs/${slug}?locale=${locale}`);
          
          if (!response.ok) {
            if (response.status === 404) {
              set({ loading: false });
              return null;
            }
            throw new Error('Failed to fetch blog');
          }
          
          const blog = await response.json();
          set({ currentBlog: blog, loading: false });
          return blog;
        } catch (error) {
          console.error('Error fetching blog by slug:', error);
          set({ 
            error: error instanceof Error ? error : new Error(String(error)), 
            loading: false 
          });
          return null;
        }
      },
      
      getLocalizedBlogs: (locale: string) => {
        const { blogs } = get();
        // Blogs are already filtered by locale from API, but we still need to handle Hindi fields
        return withLocalizedArray(blogs, locale) as Blog[];
      }
    }),
    { name: 'blogs-store' }
  )
);