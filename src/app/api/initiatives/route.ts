import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/initiatives?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching initiatives:', error);
    
    // Return fallback data
    const fallbackInitiatives = [
      {
        id: '1',
        title: 'Education for All',
        titleHi: 'सभी के लिए शिक्षा',
        description: 'Providing quality education to underprivileged children.',
        descriptionHi: 'वंचित बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना।',
        imageUrl: '/images/education.jpg',
        order: 1
      }
    ];

    return NextResponse.json(fallbackInitiatives, { status: 200 });
  }
}
