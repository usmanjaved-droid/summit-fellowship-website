import type { NextConfig } from "next";
import { OLD_PRODUCTION_HOSTS, PRODUCTION_HOST } from "./lib/env";

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
  // The old production addresses forward every page to the current one.
  async redirects() {
    return OLD_PRODUCTION_HOSTS.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `https://${PRODUCTION_HOST}/:path*`,
      permanent: true,
    }));
  },
  async headers() {
    if (process.env.VERCEL_ENV === 'production') return [];
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
