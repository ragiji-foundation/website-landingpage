'use client';
import { ContactUs } from '@/components/ContactUs';
import { Banner } from '@/components/Banner';
import { LocalizedBanner } from '@/components/LocalizedBanner';
import { Loader, Text, Container, Center } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useBannerStore } from '@/store/useBannerStore';
import { useDictionary } from '@/hooks/useDictionary';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ContactPage() {
  const params = useParams();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'en';
  
  const { fetchBanners, getBannerByType, banners, loading, error } = useBannerStore();
  const { dictionary } = useDictionary();
  const t = dictionary?.contact as { banner?: { title?: string; description?: string } } || {};
  const common = dictionary?.common || {};

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Fix: Better type checking and debugging
  const banner = getBannerByType('contactus'); // Changed from 'contact' to 'contactus'

  if (loading) return (
    <Center p="xl">
      <Loader size="xl" />
      <Text ml="md">{common?.loading || 'Loading...'}</Text>
    </Center>
  );

  if (error) return (
    <Container p="xl">
      <Text c="red">{common?.errorMessage || 'Error loading banner:'} {error.message}</Text>
      <Text>
        {common?.availableBanners || 'Available banners:'} {banners.length > 0 ?
          banners.map(b => b.type).join(', ') :
          (common?.noBannersAvailable || 'No banners available')}
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
          title={t?.banner?.title || 'Contact Us'}
          description={t?.banner?.description || 'Reach out to us with your questions or inquiries'}
          backgroundImage="/banners/contact-banner.jpg"
          breadcrumbs={[
            { label: common?.home || 'Home', link: `/${locale}` },
            { label: t?.banner?.title || 'Contact Us' }
          ]}
        />
        <ContactUs />
        <Notifications />
      </>
    );
  }

  // Use actual banner with localization
  return (
    <>
      <LocalizedBanner
        banner={banner}
        breadcrumbs={[
          { label: common?.home || 'Home', link: `/${locale}` },
          { label: t?.banner?.title || 'Contact Us' }
        ]}
      />
      <ContactUs />
      <Notifications />
    </>
  );
}
