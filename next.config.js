/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: false,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/import-pool',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
