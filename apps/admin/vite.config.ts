import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Radio Admin Panel',
        short_name: 'Radio Admin',
        description: 'Admin panel for Radio station',
        theme_color: '#8aa982',
        background_color: '#2e2e2e',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 3001,
    fs: {
      allow: ['..', '../..'],
    },
    watch: {
      usePolling: true,
      ignored: ['!**/node_modules/**'],
    },
  },
  resolve: {
    alias: {
      '@radio/mojo-ui': resolve(__dirname, '../../packages/mojo-ui/src'),
    },
  },
  preview: {
    port: 3001,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
});
