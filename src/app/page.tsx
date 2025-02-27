import React from 'react';
import { ContentItem } from '@/types/content-types';

import { CardsCarousel } from '@/components/CardsCarousel';
import SuccessStoriesSection from '@/components/landing/success-stories-section';
import Gallery from '@/components/Gallery';
import { Initiatives } from '@/components/Initiatives';
import { Testimonials } from '@/components/Testimonials';
import FeaturesSection from '@/components/landing/features-section';
import StatsSection from '@/components/landing/stats-section';
import { Box } from '@mantine/core';

const featureData: {
  heading: string;
  content: ContentItem[];
  ctaButton: { text: string; url: string; }
} = {
  heading: "Our Core Programs",
  content: [
    {
      title: "Education For All",
      description: {
        type: 'doc' as const, // Important: use 'as const' here
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Empowering underprivileged children through ',
              },
              {
                type: 'text',
                marks: [{ type: 'bold' as const }],
                text: 'quality education and digital literacy',
              },
              {
                type: 'text',
                text: '. Our innovative teaching methods ensure:'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Free education to 5000+ children annually' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'After-school support programs' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Digital learning resources and computer education' }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "video" as const,
        url: "https://www.youtube.com/embed/educational-impact",
        thumbnail: "/programs/education-thumbnail.jpg"
      }
    },
    {
      title: "Women Empowerment",
      description: {
        type: 'doc' as const,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Supporting women through ',
              },
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'skill development and entrepreneurship programs'
              },
              {
                type: 'text',
                text: '. Our initiatives have enabled:'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Self-help groups supporting 1000+ women' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Vocational training workshops' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Micro-financing support for small businesses' }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "image" as const,
        url: "/programs/women-empowerment.jpg"
      }
    },
    {
      title: "Healthcare Initiatives",
      description: {
        type: 'doc' as const,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Providing access to ',
              },
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'essential healthcare services and awareness'
              },
              {
                type: 'text',
                text: ' in underserved communities.'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Regular health camps in rural areas' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Maternal and child health programs' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Mental health awareness campaigns' }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "image" as const,
        url: "/programs/healthcare-initiatives.jpg"
      }
    }
  ],
  ctaButton: {
    text: "Support Our Cause",
    url: "/donate"
  }
};

function App() {

  return (
   

<main>
<CardsCarousel />
      <FeaturesSection {...featureData} />

      <Initiatives />
      <Box bg="var(--mantine-color-gray-0)" py="xl">
        <StatsSection />
      </Box>
      <Gallery />
      <Testimonials />
      <SuccessStoriesSection />

</main>
 

   
  );
}

export default App;