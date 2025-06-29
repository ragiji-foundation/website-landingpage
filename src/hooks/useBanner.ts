'use client';

import { useEffect, useState } from 'react';
import { useBannerStore } from '@/store/useBannerStore';
import { BannerType } from '@/types/banner';

export function useBanner(type: BannerType | string) {
  const { getBannerByType, fetchBanners } = useBannerStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadBanner = async () => {
      try {
        setLoading(true);
        await fetchBanners();
        setLoading(false);
      } catch (err) {
        console.error(`Error loading ${type} banner:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };
    
    loadBanner();
  }, [fetchBanners, type]);
  
  const banner = getBannerByType(type as BannerType);
  
  return {
    banner,
    loading,
    error
  };
}
