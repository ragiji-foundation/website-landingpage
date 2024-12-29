import { NextResponse } from 'next/server';
import axios from 'axios';

// Export the allowed methods
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const body = await request.json();

    // Validate the request body
    if (!body.email || !body.name || !body.subject || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        {
          status: 400,
          headers
        }
      );
    }

    try {
      const response = await axios.post(
        'https://admin.ragijifoundation.com/api/enquiries',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      return NextResponse.json(
        {
          message: 'Message sent successfully',
          data: response.data
        },
        {
          status: 200,
          headers
        }
      );

    } catch (apiError) {
      if (axios.isAxiosError(apiError)) {
        return NextResponse.json(
          {
            message: apiError.response?.data?.message || 'Failed to send message to admin API',
            error: apiError.response?.data
          },
          {
            status: apiError.response?.status || 500,
            headers
          }
        );
      }
      throw apiError;
    }

  } catch (error) {
    console.error('Server Error:', error);

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}