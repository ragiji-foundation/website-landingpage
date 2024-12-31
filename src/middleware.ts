import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add debugging
  console.log('Middleware executing for:', request.url);

  // Only apply to /api/contact
  if (request.nextUrl.pathname === '/api/contact') {
    const response = NextResponse.next();

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', 'https://www.ragijifoundation.com');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 