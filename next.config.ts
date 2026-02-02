
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    unoptimized: true, // Reduce server load for image processing if not using Vercel/Ext Srv
  },
  experimental: {
    // optimizeCss: true, // Remove this as it requires 'critters' package which might fail build
  }
};

export default nextConfig;
