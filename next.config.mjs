/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'uploads.clockb.io',
            port: '',
          },
        ],
      },
};

export default nextConfig;
