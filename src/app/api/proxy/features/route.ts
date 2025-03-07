import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Make the request from the server side
    const response = await fetch('https://admin.ragijifoundation.com/api/features', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't include credentials in the server-side request
      credentials: 'omit',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch features: ${response.status}`);
    }

    const data = await response.json();

    // Return the data to the client with appropriate CORS headers
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in proxy fetch:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch features' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
