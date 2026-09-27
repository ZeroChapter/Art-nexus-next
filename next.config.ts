import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Local catalog uploads use http://127.0.0.1:5000/... from API_PUBLIC_URL in dev
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "**.pinimg.com" },
      { protocol: "https", hostname: "art-nexus.ru" },
      { protocol: "https", hostname: "**.art-nexus.ru" },
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "5000", pathname: "/uploads/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
