import { Banner } from '@/types/banner';

// Locale-specific mock data
export const mockBanners: Record<string, Banner[]> = {
  en: [
    {
      id: '1',
      type: 'home',
      title: 'Welcome to Ragi Foundation',
      description: 'Empowering communities through education and development.',
      backgroundImage: '/banners/home-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '2',
      type: 'about',
      title: 'About Us',
      description: 'Learn about our mission and impact.',
      backgroundImage: '/banners/about-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '3',
      type: 'initiatives',
      title: 'Our Initiatives',
      description: 'Discover the programs making a difference in communities.',
      backgroundImage: '/banners/initiatives-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '4',
      type: 'successstories',
      title: 'Success Stories',
      description: 'Read inspiring stories of transformation and success.',
      backgroundImage: '/banners/successstories-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '5',
      type: 'media',
      title: 'Media & Publications',
      description: 'Stay updated with our latest news and publications.',
      backgroundImage: '/banners/media-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '6',
      type: 'electronicmedia',
      title: 'Electronic Media',
      description: 'Watch our latest coverage and media highlights.',
      backgroundImage: '/banners/electronicmedia-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '7',
      type: 'gallery',
      title: 'Gallery',
      description: 'Explore moments captured from our initiatives.',
      backgroundImage: '/banners/gallery-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '8',
      type: 'newscoverage',
      title: 'News Coverage',
      description: 'See how we are making headlines across the country.',
      backgroundImage: '/banners/newscoverage-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '9',
      type: 'ourstory',
      title: 'Our Story',
      description: 'The journey of our organization and its milestones.',
      backgroundImage: '/banners/ourstory-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '10',
      type: 'need',
      title: 'Why We Need Support',
      description: 'Understand the importance of our mission and how you can help.',
      backgroundImage: '/banners/need-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '11',
      type: 'centers',
      title: 'Our Centers',
      description: 'Find our impact centers across the country.',
      backgroundImage: '/banners/centers-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '12',
      type: 'contactus',
      title: 'Get in Touch',
      description: 'Reach out to us for inquiries and collaborations.',
      backgroundImage: '/banners/contactus-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '13',
      type: 'careers',
      title: 'Join Our Team',
      description: 'Be part of our mission to create positive change.',
      backgroundImage: '/banners/careers-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    },
    {
      id: '14',
      type: 'awards',
      title: 'Our Achievements',
      description: 'Recognizing our efforts and contributions.',
      backgroundImage: '/banners/awards-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'en'
    }
  ],
  hi: [
    {
      id: '1',
      type: 'home',
      title: 'रागी फाउंडेशन में आपका स्वागत है',
      description: 'शिक्षा और विकास के माध्यम से समुदायों को सशक्त बनाना।',
      backgroundImage: '/banners/home-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '2',
      type: 'about',
      title: 'हमारे बारे में',
      description: 'हमारे मिशन और प्रभाव के बारे में जानें।',
      backgroundImage: '/banners/about-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '3',
      type: 'initiatives',
      title: 'हमारी पहलकदमियाँ',
      description: 'उन कार्यक्रमों की खोज करें जो समुदायों में बदलाव ला रही हैं।',
      backgroundImage: '/banners/initiatives-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '4',
      type: 'successstories',
      title: 'सफलता की कहानियाँ',
      description: 'परिवर्तन और सफलता की प्रेरक कहानियाँ पढ़ें।',
      backgroundImage: '/banners/successstories-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '5',
      type: 'media',
      title: 'मीडिया और प्रकाशन',
      description: 'हमारी नवीनतम समाचारों और प्रकाशनों के साथ अपडेट रहें।',
      backgroundImage: '/banners/media-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '6',
      type: 'electronicmedia',
      title: 'इलेक्ट्रॉनिक मीडिया',
      description: 'हमारी नवीनतम कवरेज और मीडिया हाइलाइट्स देखें।',
      backgroundImage: '/banners/electronicmedia-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '7',
      type: 'gallery',
      title: 'गैलरी',
      description: 'हमारी पहलों से कैद किए गए क्षणों की खोज करें।',
      backgroundImage: '/banners/gallery-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '8',
      type: 'newscoverage',
      title: 'समाचार कवरेज',
      description: 'देखें कि हम देश भर में सुर्खियाँ कैसे बना रहे हैं।',
      backgroundImage: '/banners/newscoverage-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '9',
      type: 'ourstory',
      title: 'हमारी कहानी',
      description: 'हमारे संगठन की यात्रा और इसकी मील के पत्थर।',
      backgroundImage: '/banners/ourstory-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '10',
      type: 'need',
      title: 'हमें समर्थन की आवश्यकता क्यों है',
      description: 'हमारे मिशन के महत्व और आप कैसे मदद कर सकते हैं, इसे समझें।',
      backgroundImage: '/banners/need-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '11',
      type: 'centers',
      title: 'हमारे केंद्र',
      description: 'देश भर में हमारे प्रभाव केंद्रों को खोजें।',
      backgroundImage: '/banners/centers-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '12',
      type: 'contactus',
      title: 'संपर्क करें',
      description: 'पूछताछ और सहयोग के लिए हमसे संपर्क करें।',
      backgroundImage: '/banners/contactus-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '13',
      type: 'careers',
      title: 'हमारी टीम में शामिल हों',
      description: 'सकारात्मक परिवर्तन बनाने के हमारे मिशन का हिस्सा बनें।',
      backgroundImage: '/banners/careers-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    },
    {
      id: '14',
      type: 'awards',
      title: 'हमारी उपलब्धियाँ',
      description: 'हमारे प्रयासों और योगदानों को मान्यता देना।',
      backgroundImage: '/banners/awards-banner.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      locale: 'hi'
    }
  ]
};