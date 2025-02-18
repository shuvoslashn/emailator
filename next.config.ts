import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "cdn-icons-png.flaticon.com",
            "clever-dachshund-418.convex.cloud",
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
