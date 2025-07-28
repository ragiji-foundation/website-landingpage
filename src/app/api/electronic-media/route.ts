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

    const response = await axios.get(`${ADMIN_API_URL}/api/electronic-media?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching electronic media:', error);
    
    // Return fallback data
    const fallbackElectronicMedia = [
      {
        id: 1,
        title: 'Foundation Impact Video',
        titleHi: 'फाउंडेशन प्रभाव वीडियो',
        description: 'See our impact in the community',
        descriptionHi: 'समुदाय में हमारा प्रभाव देखें',
        videoUrl: '/videos/impact.mp4',
        thumbnail: '/images/video-thumbnail.jpg',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackElectronicMedia, { status: 200 });
  }
}
