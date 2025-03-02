'use client';
import { PhotoLibrary } from '@/components/Pages/PhotoLibrary';
import { Container, Loader, Text } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { useBannerStore } from '@/store/useBannerStore';
import { useEffect } from 'react';
import { BannerType } from '@/types/banner';

export default function PhotoLibraryPage() {
  const { fetchBanners, getBannerByType, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('gallery') as { type: BannerType; title: string; description?: string; backgroundImage?: string };

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error.message}</Text>;
  if (!banner) return <Text>Banner not found</Text>;

  return (
    <main>
      <Banner
        type={banner.type}
        title={banner.title}
        description={banner.description ?? "Explore our visual journey"}
        backgroundImage={banner.backgroundImage || "/banners/gallery-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Media', link: '/media' },
          { label: 'Photo Library' }
        ]}
      />
      <Container size="xl" py="xl">
        <PhotoLibrary />
      </Container>
    </main>
  );
}
