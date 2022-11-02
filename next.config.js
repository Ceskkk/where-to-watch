/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_THEMOVIEDB_API_IMAGES_CONFIG_URL]
  }
}

module.exports = nextConfig
