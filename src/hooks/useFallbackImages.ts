/**
 * Hook to provide fallback images throughout the application
 */

import { useMemo } from 'react';

export type FallbackImageType = 
  | 'story' 
  | 'blog' 
  | 'center' 
  | 'initiative' 
  | 'news' 
  | 'article'  // News article image
  | 'gallery' 
  | 'person' 
  | 'career'
  | 'generic';

export type FallbackImageMap = Record<FallbackImageType, string>;

export function useFallbackImages() {
  // Define fallback images for different content types
  const fallbackImages = useMemo<FallbackImageMap>(() => ({
    story: '/images/placeholder.svg',
    blog: '/images/placeholder.svg',
    center: '/images/placeholder.svg',
    initiative: '/images/placeholder.svg',
    news: '/images/placeholder.svg',
    article: '/images/fallbacks/news-article.svg',  // News article specific fallback
    gallery: '/images/placeholder.svg',
    person: '/images/placeholder.svg',
    career: '/images/placeholder.svg',
    generic: '/images/placeholder.svg'
  }), []);
  
  // Helper to get the appropriate fallback image
  const getPlaceholderImage = (type: FallbackImageType = 'generic'): string => {
    return fallbackImages[type] || fallbackImages.generic;
  };
  
  return { getPlaceholderImage, fallbackImages };
}