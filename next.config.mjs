/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['codezero-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://52.79.152.88:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
