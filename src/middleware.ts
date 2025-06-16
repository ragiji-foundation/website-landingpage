import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'hi'];
const defaultLocale = 'hi';

// Check if the pathname has a locale
function pathnameHasLocale(pathname: string) {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

// Get the locale from the Accept-Language header
function getLocaleFromHeader(request: NextRequest) {
  const headerLang = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
  return locales.includes(headerLang as string) ? headerLang : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, api routes, favicon, etc.
  if (
    [
      '/favicon.ico',
      '/logo.png',
      '/logo1.png',
      '/manifest.json',
    ].includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(jpg|png|svg|ico|css|js)$/)
  ) {
    return;
  }

  // If the pathname already has a locale, do nothing
  if (pathnameHasLocale(pathname)) {
    return;
  }

  // Get the locale from the Accept-Language header or use the default
  const locale = getLocaleFromHeader(request);
  
  // Redirect to the same pathname but with the locale
  const url = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  url.search = request.nextUrl.search;
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all request paths except for the ones we explicitly exclude
    '/((?!api|_next|favicon.ico).*)'
  ],
};