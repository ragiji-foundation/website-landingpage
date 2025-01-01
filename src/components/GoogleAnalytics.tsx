'use client';
import Script from 'next/script';
import { useCookies } from '@/context/CookieContext';

export function GoogleAnalytics() {
  const { cookiesAccepted } = useCookies();

  if (!cookiesAccepted) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RD0MZWDX1R"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RD0MZWDX1R');
        `}
      </Script>
    </>
  );
} 