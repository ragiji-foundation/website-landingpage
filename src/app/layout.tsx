'use client';

import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { theme } from '@/theme/theme';

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
import { useLocalStorage } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      lerp: 0.1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>RagiG NGO</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={theme}
            withCssVariables
          >
            <CookieProvider>
              <LanguageProvider>
                <SearchProvider>
                  <AnalyticsProvider />
                  <GoogleAnalytics />
                  <Notifications />
                  <TopHeader />
                  <ScrollProgress />
                  <HeaderMenu />
                  <AnimatePresence mode="wait">
                    {children}
                  </AnimatePresence>
                  <JoinUs />
                  <FooterLinks />
                  <CookieBanner />
                </SearchProvider>
              </LanguageProvider>
            </CookieProvider>
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}