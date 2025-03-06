'use client';
import { MantineProvider, Box } from "@mantine/core"
import SuccessStoriesSection from "@/components/landing/success-stories-section"


import StatsSection from '@/components/landing/stats-section';



export default function Page() {
  return (
    <MantineProvider>
      <main>
        <Box bg="var(--mantine-color-gray-0)">
          <SuccessStoriesSection />
        </Box>

        <Box bg="var(--mantine-color-gray-0)" py="xl">
          <StatsSection />
        </Box>
      
      </main>
    </MantineProvider>
  )
}

