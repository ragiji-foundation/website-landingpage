import { SuccessStory } from '@/types/success-story';

export const mockSuccessStories: SuccessStory[] = [
  {
    id: '1',
    title: 'From Street to School: A Journey of Hope',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Coming from a challenging background, Rahul found hope through our education program. Today, he is pursuing his engineering degree.' }]
        }
      ]
    },
    personName: 'Rahul Kumar',
    location: 'Delhi',
    imageUrl: '/success-stories/story1.jpg',
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Empowering Women Through Skills',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'After joining our skill development program, Priya started her own tailoring business, supporting her family and inspiring others.' }]
        }
      ]
    },
    personName: 'Priya Singh',
    location: 'Mumbai',
    imageUrl: '/success-stories/story2.jpg',
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Digital Literacy Changes Lives',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Learning computer skills opened new opportunities for Amit, who now works as a data entry specialist.' }]
        }
      ]
    },
    personName: 'Amit Sharma',
    location: 'Bangalore',
    imageUrl: '/success-stories/story3.jpg',
    featured: false,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
