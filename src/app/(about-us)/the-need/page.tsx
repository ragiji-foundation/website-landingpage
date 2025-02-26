import React from 'react'
import { Banner } from '@/components/Banner'
import { Box } from '@mantine/core'
import FeaturesSection from '@/components/landing/features-section'

const featureData = {
  heading: "Experience Innovation",
  content: [
    {
      title: "Get your superpower",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      mediaItem: {
        type: "video" as const,
        url: "https://www.youtube.com/embed/your-video-id",
        thumbnail: "/video-thumbnail.jpg"
      }
    },
    {
      title: "Superfast 5G",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      mediaItem: {
        type: "image" as const,
        url: "https://placehold.co/600x400/000000/FFF"
      }
    },
    {
      title: "New year, new design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      mediaItem: {
        type: "image" as const,
        url: "https://placehold.co/600x400/000000/FFF"
      }
    }
  ],
  ctaButton: {
    text: "Get Started",
    url: "/signup"
  }
};

export default function TheNeedPage() {
  return (
    <main>
      <Banner
        type="about"
        title="The Need"
        description="Understanding the challenges and opportunities in rural education and development"
        backgroundImage="/banners/the-need-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'The Need' }
        ]}
        tags={['Education', 'Development', 'Rural', 'Impact']}
      />
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <FeaturesSection {...featureData} />
      </Box>
    </main>
  )
}
