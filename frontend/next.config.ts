import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
