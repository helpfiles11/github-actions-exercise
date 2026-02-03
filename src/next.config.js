/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone mode allows the build to be deployed without node_modules
  // Perfect for Docker/Lambda deployments
  output: 'standalone',

  // Configure image optimization
  images: {
    unoptimized: true, // Required for static export compatibility
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
