'use client';
import { Container } from '@mantine/core';
import { Banner } from '@/components/Banner';
import { PhotoLibrary } from '@/components/Pages/PhotoLibrary';

export default function GalleryPage() {
  return (
    <main>
      <Banner
        type="media"
        title="Photo Gallery"
        description="Explore our journey through images, capturing moments of impact and transformation."
        backgroundImage="/banners/gallery-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Media', link: '/media' },
          { label: 'Gallery' }
        ]}
        tags={['Events', 'Centers', 'Initiatives']}
      />

      <Container size="xl" py="xl">
        <PhotoLibrary />
      </Container>
    </main>
  );
}
