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

    const response = await axios.get(`${ADMIN_API_URL}/api/success-stories?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching success stories:', error);
    
    // Return fallback data
    const fallbackStories = [
      {
        id: '1',
        slug: 'rajesh-success-story',
        title: 'From Streets to Success: Rajesh\'s Journey',
        titleHi: 'सड़कों से सफलता तक: राजेश की यात्रा',
        content: 'Rajesh\'s inspiring journey from a street child to a successful student.',
        contentHi: 'एक सड़क बच्चे से सफल छात्र तक राजेश की प्रेरणादायक यात्रा।',
        personName: 'Rajesh Kumar',
        personNameHi: 'राजेश कुमार',
        location: 'Delhi',
        locationHi: 'दिल्ली',
        imageUrl: '/images/success-story1.jpg',
        featured: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackStories, { status: 200 });
  }
}
