import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["www.google.com"], 
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "www.google.com", 
      },
    ],
  },
};

export default nextConfig;