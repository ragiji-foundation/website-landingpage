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
import React, { useEffect, useState } from 'react';

// Fix the synchronous params issue by using client-side logic
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<string>('hi'); // Default fallback

  // Handle params properly for Next.js 15
  const [resolvedParams, setResolvedParams] = useState<{ locale: string } | null>(null);
  
  useEffect(() => {
    // Resolve params Promise in useEffect for client components
    const resolveParams = async () => {
      const resolved = await Promise.resolve(params);
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);
  
  // Set the locale after params are resolved
  useEffect(() => {
    if (resolvedParams && resolvedParams.locale) {
      setLocale(resolvedParams.locale);
    }
  }, [resolvedParams]);

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
