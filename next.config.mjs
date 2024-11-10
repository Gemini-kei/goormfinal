/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    console.log('rewrites apply')
    return [
      {
        source: '/api/:path*', // 클라이언트가 요청하는 경로
        destination: 'http://52.79.152.88:8080/:path*', // 실제 백엔드 API 경로
      },
    ];
  },
};

export default nextConfig;
