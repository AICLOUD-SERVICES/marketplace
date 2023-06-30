/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  async rewrites() {
    return [
      {
        source: "/showroom",
        destination: "/showroom/all",
      },
      // Add more redirects as needed
    ];
  },
};

module.exports = nextConfig;
