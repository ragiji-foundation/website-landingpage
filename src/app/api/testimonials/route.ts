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

    const response = await axios.get(`${ADMIN_API_URL}/api/testimonials?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    
    // Return fallback data
    const fallbackTestimonials = [
      {
        id: 1,
        name: 'Rahul Kumar',
        nameHi: 'राहुल कुमार',
        role: 'Parent',
        roleHi: 'अभिभावक',
        content: 'Ragiji Foundation has transformed my child\'s future through quality education.',
        contentHi: 'रागिजी फाउंडेशन ने गुणवत्तापूर्ण शिक्षा के माध्यम से मेरे बच्चे का भविष्य बदल दिया है।',
        avatar: '/images/testimonial1.jpg',
        isPublished: true,
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackTestimonials, { status: 200 });
  }
}
