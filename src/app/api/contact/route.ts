import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Forward to admin API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/enquiries`,
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
        message: 'Message sent successfully',
        data: response.data
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to send message' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 