/** @type {import('next').NextConfig} */
const nextConfig = {
  
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
