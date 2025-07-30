import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Forward to admin API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/gallery`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    // Extract data array from admin API response {success: true, data: [...]}
    const responseData = response.data;
    const galleryData = responseData?.data || responseData || [];

    return NextResponse.json(galleryData);

  } catch (error) {
    console.error('Gallery fetch error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to fetch gallery items' },
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
