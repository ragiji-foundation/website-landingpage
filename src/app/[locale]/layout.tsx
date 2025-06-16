'use client';

import '@mantine/core/styles.css';
import '@/styles/globals.css';

import { MantineProvider } from '@mantine/core';
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
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useEffect, useState } from 'react';

// Fix the synchronous params issue by using client-side logic
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const [locale, setLocale] = useState<string>('en'); // Default fallback

  // Set the locale after component mounts to avoid the sync params issue
  useEffect(() => {
    if (params && params.locale) {
      setLocale(params.locale);
    }
  }, [params]);

  return (
    <CookieProvider>
      <LanguageProvider initialLocale={locale}>
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
            <WhatsAppButton />
            <CookieBanner />
          </MantineProvider>
        </SearchProvider>
      </LanguageProvider>
    </CookieProvider>
  );
}
