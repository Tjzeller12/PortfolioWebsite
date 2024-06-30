import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/PortfolioWebsite/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      'three': resolve(__dirname, 'node_modules/three/build/three.module.js'),
    },
  },
});