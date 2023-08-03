/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack(config) {
    // Sử dụng dotenv-webpack thay vì EnvironmentPlugin
    config.plugins.push(new Dotenv());
    return config;
  },
};

module.exports = nextConfig;
