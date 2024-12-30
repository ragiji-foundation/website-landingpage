import { NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

// Export config for API route
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        {
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // Forward to admin API with timeout and retry logic
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/contact`,
        validationResult.data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000, // 5 second timeout
          validateStatus: (status) => status >= 200 && status < 500 // Consider only 5xx as errors
        }
      );

      return NextResponse.json(
        {
          message: 'Message sent successfully',
          data: response.data
        },
        {
          status: 200,
          headers: corsHeaders
        }
      );

    } catch (apiError) {
      if (axios.isAxiosError(apiError)) {
        // Handle specific API errors
        if (apiError.code === 'ECONNABORTED') {
          return NextResponse.json(
            { error: 'Request timed out. Please try again.' },
            {
              status: 408,
              headers: corsHeaders
            }
          );
        }

        if (apiError.response?.status === 429) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
              status: 429,
              headers: corsHeaders
            }
          );
        }

        return NextResponse.json(
          {
            error: apiError.response?.data?.message || 'Failed to send message',
            details: process.env.NODE_ENV === 'development' ? apiError.response?.data : undefined
          },
          {
            status: apiError.response?.status || 500,
            headers: corsHeaders
          }
        );
      }

      throw apiError; // Re-throw non-Axios errors
    }

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}