import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? "/cowork" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    // next/image's src prop isn't auto-prefixed with basePath when
    // images.unoptimized is true, so product image paths prefix it manually.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
