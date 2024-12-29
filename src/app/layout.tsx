import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { HeaderMenu } from "@/components/HeaderMenu";
import { FooterLinks } from "@/components/FooterLinks";
import { SearchProvider } from '@/context/SearchContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { TopHeader } from '@/components/TopHeader';

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
        <LanguageProvider>
          <SearchProvider>
            <MantineProvider>
              <main>
              <TopHeader />
                <HeaderMenu />
                {children}
                <FooterLinks />
              </main>
            </MantineProvider>
          </SearchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}