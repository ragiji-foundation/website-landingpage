'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageView, trackEvent } from '@/lib/analytics';

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(fullPath);
  }, [pathname, searchParams]);

  // Track site entry
  useEffect(() => {
    // Only run once on initial page load
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
      // Track where users are coming from
      trackEvent('site_entry', {
        referrer,
        landing_page: pathname
      });
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
