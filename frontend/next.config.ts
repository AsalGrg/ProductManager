import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
  reactCompiler:true,
   async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false, // Set to true if it is a permanent structural change
      },
    ];
}
};

export default nextConfig;
