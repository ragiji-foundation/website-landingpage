const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove swcMinify as it's enabled by default in Next.js 12+
  reactStrictMode: true,
  
  // Webpack optimizations to reduce cache warnings and fix deployment issues
  webpack: (config, { dev, isServer }) => {
    // Reduce webpack cache warnings by optimizing large strings
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
        // Reduce serialization warnings
        compression: 'gzip',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      };
      
      // Suppress specific webpack warnings
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    
    return config;
  },
  
  images: {
    // Use remotePatterns instead of domains (deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ragijifoundation.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'admin.ragijifoundation.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '**',
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