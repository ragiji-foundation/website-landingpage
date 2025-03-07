import '@mantine/core/styles.css';
import '@/styles/globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { HeaderMenu } from "@/components/HeaderMenu";
import { FooterLinks } from "@/components/FooterLinks";
import { SearchProvider } from '@/context/SearchContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { TopHeader } from '@/components/TopHeader';
import { Notifications } from '@mantine/notifications';
import { CookieProvider } from '@/context/CookieContext';
import { CookieBanner } from '@/components/CookieBanner';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { JoinUs } from '@/components/JoinUs';
import { trackPageView, trackEvent } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const metadata = {
  title: 'RAGI JI FOUNDATION',
  description: 'live for others',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when the path or search params change
    trackPageView(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''));
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
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <CookieProvider>
          <LanguageProvider>
            <SearchProvider>
              <MantineProvider>
                <GoogleAnalytics />
                <Notifications />
                <TopHeader />
                <HeaderMenu />
                {children}
                <JoinUs />
                <FooterLinks />
                <CookieBanner />
              </MantineProvider>
            </SearchProvider>
          </LanguageProvider>
        </CookieProvider>
      </body>
    </html>
  );
}