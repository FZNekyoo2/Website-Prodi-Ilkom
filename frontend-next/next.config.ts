// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // izinkan gambar dari Strapi lokal
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    // ini yang menghilangkan error "private ip"
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
