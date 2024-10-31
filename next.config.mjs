/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
      },
      {
        protocol: "https",
        hostname: "tokens.1inch.io",
      },
      {
        protocol: "https",
        hostname: "tokens-data.1inch.io",
      },
      {
        protocol: "https",
        hostname: "pagedone.io",
      },
      {
        protocol: "https",
        hostname: "effigy.im",
      },
    ],
  },
};

export default nextConfig;
