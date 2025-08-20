/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages configuration
  output: 'export',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  // Disable server-side features for static export
  experimental: {
    runtime: 'edge',
  },
  // Optimize for static generation
  generateEtags: false,
  poweredByHeader: false,
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://terapiadeparejamedellin.com' : '',
}

export default nextConfig
