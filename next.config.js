/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack(config) {
    config.plugins.push(new Dotenv());
    return config;
  },
};

module.exports = nextConfig;
