/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.gannett-cdn.com"],
  },
};

module.exports = nextConfig;
