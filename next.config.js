/** @type {import('next').NextConfig} */
const nextConfig = {
  // We're now using App Router with middleware for i18n,
  // so we don't need the older pages router i18n config
  /* 
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
  */
  
  // Remove swcMinify as it's enabled by default in Next.js 12+
  reactStrictMode: true,
  transpilePackages: ['@mantine/core', 'react-fast-marquee'],
  
  // Do not use the i18n config since we're using App Router with [locale]
  // We're handling the routing with the dynamic [locale] segment and middleware
  
  // Other configs as needed
}

module.exports = nextConfig