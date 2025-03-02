'use client';
import { ContactUs } from '@/components/ContactUs';
import { BannerType } from '@/types/banner'; // Adjust the import path as necessary
import { Banner } from '@/components/Banner';
import { Loader, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useBannerStore } from '@/store/useBannerStore';
import { useEffect } from 'react';

export default function ContactPage() {
  const { fetchBanners, getBannerByType, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const banner = getBannerByType('contact');

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error.message}</Text>;
  if (!banner) return <Text>Banner not found</Text>;

  return (
    <>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description ?? "Get in touch with us"}
        backgroundImage={banner.backgroundImage || "/banners/contact-banner.jpg"}
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Contact Us' }
        ]}
      />
      <ContactUs />
      <Notifications />
    </>
  );
}
