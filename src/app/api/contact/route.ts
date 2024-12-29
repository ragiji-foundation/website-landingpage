import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.email || !body.name || !body.subject || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the request for debugging
    console.log('Sending request to admin API:', body);

    try {
      const response = await axios.post(
        'https://admin.ragijifoundation.com/api/enquiries',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log('Admin API Response:', response.data);

      return NextResponse.json(
        {
          message: 'Message sent successfully',
          data: response.data
        },
        { status: 200 }
      );

    } catch (apiError) {
      console.error('Admin API Error:', apiError);

      if (axios.isAxiosError(apiError)) {
        return NextResponse.json(
          {
            message: apiError.response?.data?.message || 'Failed to send message to admin API',
            error: apiError.response?.data
          },
          { status: apiError.response?.status || 500 }
        );
      }

      throw apiError; // Re-throw non-Axios errors
    }

  } catch (error) {
    console.error('Server Error:', error);

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}