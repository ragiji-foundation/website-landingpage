import '@mantine/core/styles.css';

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

export const metadata = {
  title: 'RAGI JI FOUNDATION',
  description: 'I have followed setup instructions carefully',
};

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
                <GoogleAnalytics />
                <Notifications />
                <TopHeader />
                <HeaderMenu />
                {children}
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