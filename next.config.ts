import { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app') // Adjust this to point to your `app` directory
    };
    return config;
  }
};

export default config;