/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdsRx: true,
    serverComponentsExternalPackages: ['mongoose'],
  }
}

module.exports = nextConfig
