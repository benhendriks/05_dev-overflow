/** @type {import('next').NextConfig} */

const nextConfig = {

  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  }
}

module.exports = nextConfig;
