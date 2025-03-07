import { NextResponse } from 'next/server';

// CORS headers for API responses
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

// Helper to add CORS headers to responses
export function withCors(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Error response with CORS headers
export function corsError(message: string, status = 500) {
  const response = NextResponse.json(
    { error: message },
    { status }
  );
  return withCors(response);
}
