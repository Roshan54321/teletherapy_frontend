/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    FRONTEND: process.env.FRONTEND,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
