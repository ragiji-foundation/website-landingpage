'use client';
import { ContactUs } from '@/components/ContactUs';
import { BannerType } from '@/types/banner'; // Adjust the import path as necessary
import { Banner } from '@/components/Banner';
import { Loader, Text, Container, Center } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useBannerStore } from '@/store/useBannerStore';
import { useEffect } from 'react';

export default function ContactPage() {
  const { fetchBanners, getBannerByType, banners, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Fix: Better type checking and debugging
  const banner = getBannerByType('contactus'); // Changed from 'contact' to 'contactus'

  if (loading) return (
    <Center p="xl">
      <Loader size="xl" />
    </Center>
  );

  if (error) return (
    <Container p="xl">
      <Text c="red">Error loading banner: {error.message}</Text>
      <Text>Available banners: {banners.length > 0 ?
        banners.map(b => b.type).join(', ') :
        'No banners available'}
      </Text>
    </Container>
  );

  // Use fallback if banner not found
  if (!banner) {
    console.warn('Contact banner not found, using fallback');
    return (
      <>
        <Banner
          type="contactus"
          title="Contact Us"
          description="Get in touch with us"
          backgroundImage="/banners/contact-banner.jpg"
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

  // Use actual banner
  return (
    <>
      <Banner
        type={banner.type as BannerType}
        title={banner.title}
        description={banner.description}
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
