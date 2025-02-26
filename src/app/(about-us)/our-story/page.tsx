import React from 'react'
import { Banner } from '@/components/Banner'
import OurStory from '@/components/about/our-story'
import { Box } from '@mantine/core'

export default function OurStoryPage() {
  return (
    <main>
      <Banner
        type="about"
        title="Our Story"
        description="Journey of transforming lives through education and empowerment"
        backgroundImage="/banners/our-story-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Our Story' }
        ]}
      />
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <OurStory />
      </Box>
    </main>
  )
}
