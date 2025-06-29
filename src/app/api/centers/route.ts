import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/centers?locale=${locale}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch centers: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching centers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch centers' },
      { status: 500 }
    );
  }
}