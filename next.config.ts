import type { NextConfig } from "next";
import { OLD_PRODUCTION_HOST, PRODUCTION_HOST } from "./lib/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "falling-walls.com",
      },
    ],
  },
  // The old production address forwards every page to the new one.
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: OLD_PRODUCTION_HOST }],
      destination: `https://${PRODUCTION_HOST}/:path*`,
      permanent: true,
    }];
  },
  async headers() {
    if (process.env.VERCEL_ENV === 'production') return [];
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
