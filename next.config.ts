import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["service.techsolutions.site"],
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
