import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Replace with your actual API call
    const data = [
      {
        id: 1,
        image: '/gallery/1.jpg',
        title: 'Education Access',
        count: '1,000+ Students',
        category: 'Education'
      },
      // ...more items
    ];

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    // Forward to admin API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/gallery`,
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
        message: 'Gallery item created successfully',
        data: response.data
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Gallery creation error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to create gallery item' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
