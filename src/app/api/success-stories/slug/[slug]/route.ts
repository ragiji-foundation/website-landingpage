import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/success-stories/slug/${slug}?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching success story:', error);
    
    // Return fallback data
    const fallbackStory = {
      id: '1',
      slug: 'fallback-story',
      title: 'Story Not Found',
      titleHi: 'कहानी नहीं मिली',
      content: 'The requested story could not be found.',
      contentHi: 'अनुरोधित कहानी नहीं मिली।',
      personName: 'Unknown',
      personNameHi: 'अज्ञात',
      location: 'Unknown',
      locationHi: 'अज्ञात',
      imageUrl: '/images/default-story.jpg',
      featured: false,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(fallbackStory, { status: 200 });
  }
}
