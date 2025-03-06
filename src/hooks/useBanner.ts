'use client';
import { useEffect } from 'react';
import { useBannerStore, BannerType } from '@/store/useBannerStore';

/**
 * Custom hook to fetch and retrieve banner data
 * This abstracts the banner fetching logic to prevent infinite re-renders
 * @param type The banner type to retrieve
 * @param autoFetch Whether to automatically fetch banners
 */
export function useBanner(type: BannerType | string, autoFetch = true) {
  const { fetchBanners, getBannerByType, loading, error } = useBannerStore();

  useEffect(() => {
    if (autoFetch) {
      fetchBanners();
    }
  }, [fetchBanners, autoFetch]);

  const banner = getBannerByType(type);

  return {
    banner,
    loading,
    error,
    fetchBanners
  };
}
