import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["173.249.53.165", "picsum.photos"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://173.249.53.165/api/:path*",
      },
    ];
  },
};

export default nextConfig;
