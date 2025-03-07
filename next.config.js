/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove swcMinify as it's enabled by default in Next.js 12+
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', // Add Cloudinary domain
      'cloudinary.com',
      'images.unsplash.com', // Common image sources
      'via.placeholder.com',
      'picsum.photos',
      'placehold.co',
      'img.youtube.com',
      'ragijifoundation.com',
      'admin.ragijifoundation.com'
    ],
    // Optionally, you can also configure remote patterns for more specific control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com'
      }
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://www.ragijifoundation.com" },
          { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ]
      }
    ]
  }
}

module.exports = nextConfig