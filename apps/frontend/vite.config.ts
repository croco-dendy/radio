/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import mkcert from 'vite-plugin-mkcert';
import tsPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    // mkcert({
    //   source: 'coding',
    // }),
    tsPaths(),
  ],
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime', '@tanstack/react-router'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.{tsx,ts}', 'src/hooks/*.{tsx,ts}'],
    },
  },
});
