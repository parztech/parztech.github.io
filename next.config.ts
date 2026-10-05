import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep existing /blog/slug/ style URLs
  trailingSlash: true,
};

export default nextConfig;
