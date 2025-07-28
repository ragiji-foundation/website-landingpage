import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    // Check if API calls are disabled for development
    const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
    const useFallbacks = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
    
    if (apiDisabled || useFallbacks) {
      console.log('API calls disabled, returning fallback centers data');
      const fallbackCenters = [
        {
          id: 1,
          name: 'Main Education Center',
          nameHi: 'मुख्य शिक्षा केंद्र',
          location: 'Delhi, India',
          locationHi: 'दिल्ली, भारत',
          description: 'Our main education center providing quality learning opportunities for children and adults.',
          descriptionHi: 'हमारा मुख्य शिक्षा केंद्र बच्चों और वयस्कों के लिए गुणवत्तापूर्ण शिक्षा के अवसर प्रदान करता है।',
          imageUrl: '/images/centers/main-center.jpg',
          contactInfo: '+91 9999999999'
        },
        {
          id: 2,
          name: 'Community Outreach Center',
          nameHi: 'सामुदायिक पहुंच केंद्र',
          location: 'Mumbai, India',
          locationHi: 'मुंबई, भारत',
          description: 'Focused on community development and social welfare programs.',
          descriptionHi: 'सामुदायिक विकास और सामाजिक कल्याण कार्यक्रमों पर केंद्रित।',
          imageUrl: '/images/centers/outreach-center.jpg',
          contactInfo: '+91 8888888888'
        }
      ];
      
      return NextResponse.json(fallbackCenters);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/centers?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch centers: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching centers:', error);
    
    // Return fallback data on error
    const fallbackCenters = [
      {
        id: 1,
        name: 'Main Education Center',
        nameHi: 'मुख्य शिक्षा केंद्र',
        location: 'Delhi, India',
        locationHi: 'दिल्ली, भारत',
        description: 'Our main education center providing quality learning opportunities.',
        descriptionHi: 'हमारा मुख्य शिक्षा केंद्र गुणवत्तापूर्ण शिक्षा के अवसर प्रदान करता है।',
        imageUrl: '/images/centers/main-center.jpg',
        contactInfo: '+91 9999999999'
      }
    ];
    
    return NextResponse.json(fallbackCenters, { status: 200 });
  }
}