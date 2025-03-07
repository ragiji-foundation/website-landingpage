'use client';

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
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                <AnalyticsProvider />
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