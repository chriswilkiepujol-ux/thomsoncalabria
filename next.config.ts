import type { NextConfig } from "next";

// 301 map for the old ltpropertiesmarbella.com URL structure. Once that domain is
// pointed at this Vercel project, every old URL lands on its closest equivalent.
const OLD_PATHS: [string, string][] = [
  ["/villas", "/residential"],
  ["/villas/:path*", "/residential"],
  ["/townhouses", "/residential"],
  ["/townhouses/:path*", "/residential"],
  ["/apartments", "/residential"],
  ["/apartments/:path*", "/residential"],
  ["/puente-romano-properties", "/locations/marbella"],
  ["/puente-romano-properties/:path*", "/locations/marbella"],
  ["/sotogrande", "/locations/sotogrande"],
  ["/sotogrande/:path*", "/locations/sotogrande"],
  ["/luxury-rentals/:path*", "/luxury-rentals"],
  ["/property/:path*", "/residential"],
  ["/contact-us", "/contact"],
  ["/contact-us/:path*", "/contact"],
  ["/area", "/locations"],
  ["/area/:path*", "/locations"],
  ["/blog", "/"],
  ["/blog/:path*", "/"],
  ["/marbella/:path*", "/locations/marbella"],
  ["/properites_marbella/:path*", "/"],
  ["/information/:path*", "/about"],
  ["/terms-and-conditions", "/terms"],
  ["/cookie-policy", "/privacy"],
  ["/privacy-policy", "/privacy"],
  ["/html/:path*", "/"],
];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ltpropertiesmarbella.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return OLD_PATHS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
