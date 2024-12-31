import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getCorsHeaders(origin: string) {
  const allowedOrigins = [
    'https://www.ragijifoundation.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin') || '';
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || '';
    console.log('POST handler executing', {
      method: request.method,
      origin: origin,
      headers: Object.fromEntries(request.headers)
    });

    // Validate environment variables first
    if (!process.env.NEXT_PUBLIC_ADMIN_API_URL) {
      throw new Error('Missing NEXT_PUBLIC_ADMIN_API_URL environment variable');
    }

    // Parse and validate the request body
    const body = await request.json();
    console.log('Received form data:', body);

    // Validate required fields
    if (!body.email || !body.name || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        {
          status: 400,
          headers: getCorsHeaders(origin)
        }
      );
    }

    // Process the form data here...
    // Add your email sending logic or other processing

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      {
        status: 200,
        headers: getCorsHeaders(origin)
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    const origin = request.headers.get('origin') || '';

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: getCorsHeaders(origin)
      }
    );
  }
}