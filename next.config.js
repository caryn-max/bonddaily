/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return {
      // These run AFTER checking if a Next.js page exists for the route.
      // So any page you build in /pages will take priority automatically.
      // Everything else passes through to your Shopify store.
      fallback: [
        {
          source: "/:path*",
          destination: "https://bond.life/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
