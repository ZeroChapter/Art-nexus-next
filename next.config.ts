import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.121"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "**.pinimg.com" },
      { protocol: "https", hostname: "art-nexus.ru" },
      { protocol: "https", hostname: "**.art-nexus.ru" },
    ],
  },
};

export default nextConfig;
