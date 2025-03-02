'use client';
import { Banner } from '@/components/Banner';
import OurInitiatives from '@/components/landing/our-initiatives';
import { Box, Loader, Text } from '@mantine/core';
import { useBannerStore } from '@/store/useBannerStore';
import { useEffect } from 'react';
import { BannerType } from '@/types/banner';

export default function OurInitiativesPage() {
  const { fetchBanners, getBannerByType, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('initiatives');

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error.message}</Text>;
  if (!banner) return <Text>Banner not found</Text>;

  return (
    <main>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description ?? "Making a difference through sustainable development"}
        backgroundImage={banner.backgroundImage || "/banners/initiatives-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Our Initiatives' }
        ]}
      />
      <Box py="xl">
        <OurInitiatives />
      </Box>
    </main>
  );
}

