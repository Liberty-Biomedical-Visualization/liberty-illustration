/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./loadContentfulImage.ts",
    remotePatterns: [
      {
        hostname: process.env.CONTENTFUL_IMAGE_CDN_HOSTNAME,
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`,
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
