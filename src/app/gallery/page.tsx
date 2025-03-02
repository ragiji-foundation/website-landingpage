'use client';
import { Container, Loader, Text } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { BannerType } from '@/types/banner';
import { PhotoLibrary } from '@/components/Pages/PhotoLibrary';
import { useBannerStore } from '@/store/useBannerStore';
import { useEffect } from 'react';

export default function GalleryPage() {
  const { fetchBanners, getBannerByType, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('gallery');

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error.message}</Text>;
  if (!banner) return <Text>Banner not found</Text>;

  return (
    <main>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description ?? "Explore our journey through images"}
        backgroundImage={banner.backgroundImage || "/banners/gallery-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Media', link: '/media' },
          { label: 'Gallery' }
        ]}
      />
      <Container size="xl" py="xl">
        <PhotoLibrary />
      </Container>
    </main>
  );
}
