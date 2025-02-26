'use client';
import React from 'react'
import { Banner } from '@/components/Banner'
import OurInitiatives from '@/components/landing/our-initiatives'
import { Box } from '@mantine/core'

export default function OurInitiativesPage() {
  return (
    <main>
      <Banner
        type="initiatives"
        title="Our Initiatives"
        description="Making a difference through sustainable development and community empowerment programs"
        backgroundImage="/banners/initiatives-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Our Initiatives' }
        ]}
        tags={['Education', 'Healthcare', 'Empowerment', 'Development']}
      />
      <Box py="xl">
        <OurInitiatives />
      </Box>
    </main>
  )
}

