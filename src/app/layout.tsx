import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'Ragi Ji Foundation',
  description: 'Live For Others',
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
        {children}
      </body>
    </html>
  );
}