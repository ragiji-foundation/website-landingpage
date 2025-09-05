import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    // Get the request body
    const body = await request.json();

    // Forward the request to the admin API
    const response = await fetch(`${ADMIN_API_URL}/api/join-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'omit',
    });

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error in join-us proxy:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to submit application' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
