/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'interfaces'],
  images: {
    domains: ['upload.wikimedia.org'],
  },
}

module.exports = nextConfig
