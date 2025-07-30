import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/our-story?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch our story: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching our story:', error);
    
    // Return fallback data
    const fallbackStory = {
      hero: {
        title: 'Our Story',
        titleHi: 'हमारी कहानी',
        subtitle: 'Building a better tomorrow through education and community development',
        subtitleHi: 'शिक्षा और सामुदायिक विकास के माध्यम से एक बेहतर कल का निर्माण',
        backgroundImage: '/images/our-story-hero.jpg'
      },
      visionMission: {
        vision: 'To create a world where every child has access to quality education and opportunities for growth.',
        visionHi: 'एक ऐसी दुनिया का निर्माण करना जहाँ हर बच्चे को गुणवत्तापूर्ण शिक्षा और विकास के अवसर मिलें।',
        mission: 'Empowering communities through education, skill development, and sustainable programs.',
        missionHi: 'शिक्षा, कौशल विकास और टिकाऊ कार्यक्रमों के माध्यम से समुदायों को सशक्त बनाना।',
        visionIcon: '/icons/vision.svg',
        missionIcon: '/icons/mission.svg'
      },
      timeline: [
        {
          year: '2020',
          title: 'Foundation Established',
          titleHi: 'फाउंडेशन की स्थापना',
          description: 'Ragiji Foundation was established with a vision to transform lives through education.',
          descriptionHi: 'रागिजी फाउंडेशन की स्थापना शिक्षा के माध्यम से जीवन को बदलने के दृष्टिकोण के साथ हुई।',
          icon: '/icons/foundation.svg',
          type: 'milestone'
        }
      ]
    };
    
    return NextResponse.json(fallbackStory, { status: 200 });
  }
}
