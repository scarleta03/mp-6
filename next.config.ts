import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // lets styled-components work nicely with next.js ssr
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
};

export default nextConfig;
