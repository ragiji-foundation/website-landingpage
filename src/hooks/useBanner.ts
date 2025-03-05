'use client';
import { useEffect } from 'react';
import { useBannerStore, BannerType } from '@/store/useBannerStore';

/**
 * Custom hook to fetch and retrieve banner data
 * This abstracts the banner fetching logic to prevent infinite re-renders
 * @param type The banner type to retrieve
 * @param useFallback Whether to use a fallback banner if the requested one doesn't exist
 */
export function useBanner(type: BannerType | string, useFallback: boolean = true) {
  const { banners, loading, error, initialized, fetchBanners, getBannerByType } = useBannerStore();

  // Only fetch if not initialized
  useEffect(() => {
    if (!initialized) {
      fetchBanners();
    }
  }, [initialized, fetchBanners]);

  const banner = getBannerByType(type, useFallback);

  return {
    banner,
    loading,
    error,
    banners
  };
}
