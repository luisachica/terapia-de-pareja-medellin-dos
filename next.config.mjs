/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },

  // Minimal experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Webpack configuration with polyfills
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add polyfills to all entry points
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        
        // Add polyfills to all entries
        Object.keys(entries).forEach(key => {
          if (Array.isArray(entries[key])) {
            entries[key].unshift('./server-setup.js', './global-polyfill.js');
          } else if (typeof entries[key] === 'string') {
            entries[key] = ['./server-setup.js', './global-polyfill.js', entries[key]];
          }
        });
        
        return entries;
      };
    }
    return config;
  },
};

export default nextConfig;
