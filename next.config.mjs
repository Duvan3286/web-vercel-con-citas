/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@vercel/blob", "undici"],
  },
};

export default nextConfig;
