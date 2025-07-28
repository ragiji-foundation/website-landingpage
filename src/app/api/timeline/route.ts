import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/timeline?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch timeline: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    
    // Return fallback timeline data
    const fallbackTimeline = [
      {
        id: '1',
        year: '2020',
        title: 'Foundation Established',
        titleHi: 'फाउंडेशन की स्थापना',
        description: 'Ragiji Foundation was established with a vision to transform lives through education and community development.',
        descriptionHi: 'रागी जी फाउंडेशन की स्थापना शिक्षा और सामुदायिक विकास के माध्यम से जीवन को बदलने के दृष्टिकोण के साथ हुई।',
        icon: '/icons/foundation.svg',
        type: 'milestone',
        order: 1
      },
      {
        id: '2',
        year: '2021',
        title: 'First Education Center',
        titleHi: 'पहला शिक्षा केंद्र',
        description: 'Opened our first education center to provide quality learning opportunities to children.',
        descriptionHi: 'बच्चों को गुणवत्तापूर्ण शिक्षा के अवसर प्रदान करने के लिए अपना पहला शिक्षा केंद्र खोला।',
        icon: '/icons/education.svg',
        type: 'achievement',
        order: 2
      },
      {
        id: '3',
        year: '2022',
        title: 'Community Outreach Expansion',
        titleHi: 'सामुदायिक पहुंच का विस्तार',
        description: 'Expanded our reach to serve more communities across the region.',
        descriptionHi: 'क्षेत्र भर में अधिक समुदायों की सेवा के लिए अपनी पहुंच का विस्तार किया।',
        icon: '/icons/community.svg',
        type: 'expansion',
        order: 3
      }
    ];
    
    return NextResponse.json(fallbackTimeline, { status: 200 });
  }
}
