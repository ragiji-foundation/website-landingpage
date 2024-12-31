import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.ragijifoundation.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    // Log the request details
    console.log('POST handler executing', {
      method: request.method,
      headers: Object.fromEntries(request.headers)
    });

    // Validate environment variables first
    if (!process.env.NEXT_PUBLIC_ADMIN_API_URL) {
      throw new Error('Missing NEXT_PUBLIC_ADMIN_API_URL environment variable');
    }

    // Parse the request body
    const body = await request.json();

    // Your existing validation and processing code...

    return NextResponse.json(
      { message: 'Success' },
      {
        status: 200,
        headers: corsHeaders
      }
    );

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}