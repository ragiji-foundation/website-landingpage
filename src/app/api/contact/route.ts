import { NextResponse } from 'next/server';
import { z } from 'zod';

// Remove edge runtime config
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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(validationResult.data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
              status: 429,
              headers: corsHeaders
            }
          );
        }

        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          {
            error: errorData.message || 'Failed to send message',
            details: process.env.NODE_ENV === 'development' ? errorData : undefined
          },
          {
            status: response.status,
            headers: corsHeaders
          }
        );
      }

      const data = await response.json();
      return NextResponse.json(
        {
          message: 'Message sent successfully',
          data
        },
        {
          status: 200,
          headers: corsHeaders
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          {
            status: 408,
            headers: corsHeaders
          }
        );
      }

      throw error;
    }

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}