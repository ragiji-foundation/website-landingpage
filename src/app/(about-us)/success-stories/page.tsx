import React from 'react'
import { Banner } from '@/components/Banner'
import FeaturesSection from '@/components/landing/features-section'
import { ContentItem } from '@/types/content-types' // We'll create this type file

const successStoriesData = {
  heading: "Inspiring Success Stories",
  content: [
    {
      title: "From Street to School: Ravi's Journey",
      slug: "ravi-journey",
      description: {
        type: 'doc' as const,
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Once a child laborer, Ravi is now a ' },
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'software engineer at a leading tech company'
              },
              {
                type: 'text',
                text: '. His transformation began when he joined our evening education program.'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Received primary education through our street school program' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Earned scholarship for higher education' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Graduated in Computer Science with distinction' }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "video" as const,
        url: "https://www.youtube.com/embed/success-story-1",
        thumbnail: "/success-stories/ravi-journey.jpg"
      }
    },
    {
      title: "Empowering Girls: Priya's Tale",
      slug: "priya-tale",
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Priya challenged societal norms to become a ',
              },
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'community leader and entrepreneur'
              },
              {
                type: 'text',
                text: '. Through our women empowerment program, she gained education and skills.'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Started a small business with micro-financing support' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Employs 15 women from her community' }]
              },
              {
                type: 'listItem',
                content: [{
                  type: 'text',
                  text: "Advocates for girls' education in her village"
                }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "image" as const,
        url: "/success-stories/priya-enterprise.jpg"
      }
    },
    {
      title: "Digital Literacy: Rural Tech Hub",
      slug: "rural-tech-hub",
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Transforming a rural community through ',
              },
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'digital education and technology access'
              },
              {
                type: 'text',
                text: '. Our rural tech hub initiative has impacted over 500 youth.'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'text', text: '100+ youth placed in tech jobs' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Free computer education for village children' }]
              },
              {
                type: 'listItem',
                content: [{ type: 'text', text: 'Online learning resources for remote areas' }]
              }
            ]
          }
        ]
      },
      mediaItem: {
        type: "image" as const,
        url: "/success-stories/rural-tech-hub.jpg"
      }
    }
  ] as ContentItem[],
  ctaButton: {
    text: "Support Our Cause",
    url: "/donate"
  }
};

export default function SuccessStoriesPage() {
  return (
    <main>
      <Banner
        type="successstories"
        title="Success Stories"
        description="Transforming lives through education, empowerment, and opportunity"
        backgroundImage="/banners/success-stories-banner.jpg"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Success Stories' }
        ]}
        tags={['Impact', 'Education', 'Transformation']}
      />
      <FeaturesSection {...successStoriesData} />
    </main>
  )
}
