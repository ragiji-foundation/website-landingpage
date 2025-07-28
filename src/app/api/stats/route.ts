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

    const response = await axios.get(`${ADMIN_API_URL}/api/stats?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    
    // Return fallback data
    const fallbackStats = [
      { id: '1', icon: 'users', value: '500+', label: 'Students Helped', order: 1 },
      { id: '2', icon: 'building', value: '25+', label: 'Centers', order: 2 },
      { id: '3', icon: 'heart', value: '100+', label: 'Volunteers', order: 3 },
      { id: '4', icon: 'award', value: '10+', label: 'Awards', order: 4 }
    ];

    return NextResponse.json(fallbackStats, { status: 200 });
  }
}
