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

    const response = await axios.get(`${ADMIN_API_URL}/api/features?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching features:', error);
    
    // Return fallback data
    const fallbackFeatures = [
      {
        id: '1',
        title: 'Quality Education',
        titleHi: 'गुणवत्तापूर्ण शिक्षा',
        description: 'Providing quality education to all children.',
        descriptionHi: 'सभी बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना।',
        slug: 'quality-education',
        category: 'education',
        order: 1,
        mediaItem: {
          type: 'image',
          url: '/images/education-feature.jpg',
          thumbnail: '/images/education-feature-thumb.jpg'
        },
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackFeatures, { status: 200 });
  }
}
