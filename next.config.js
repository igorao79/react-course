/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Прокси для API на localhost:3001 (для разработки)
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Настройка import aliases для удобства импорта
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@components': './src/components',
      '@contexts': './src/contexts',
      '@hooks': './src/hooks',
      '@store': './src/store',
    };
    return config;
  },
};

module.exports = nextConfig; 