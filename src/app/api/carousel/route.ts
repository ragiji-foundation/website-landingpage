import { NextResponse } from 'next/server';
import axios from 'axios';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/carousel`,
      {
        headers: {
          'Accept': 'application/json',
          'Origin': (await headersList).get('origin') || '',
        },
        timeout: 5000, // 5 seconds timeout
      }
    );

    return NextResponse.json(response.data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Carousel fetch error:', error);

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Unable to connect to the server' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error: error.response?.data?.message || 'Failed to fetch carousel items',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/carousel`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json(
      {
        message: 'Carousel item created successfully',
        data: response.data
      },
      { status: 201 }
    );

  } catch (error) {
    // ...existing error handling...
  }
}
