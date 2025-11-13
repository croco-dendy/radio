// vite.config.ts
import { defineConfig } from "file:///home/croco/dev/radio/node_modules/.pnpm/vite@5.4.9_@types+node@20.16.11_lightningcss@1.27.0_sass@1.93.2_terser@5.41.0/node_modules/vite/dist/node/index.js";
import react from "file:///home/croco/dev/radio/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.9_@types+node@20.16.11_lightningcss@1.27.0_sass@1.93.2_terser@5.41.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///home/croco/dev/radio/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_typescript@5.6.3_vite@5.4.9_@types+node@20.16.11_lightningcss_693576a9d3abfd2a91f687934272bd82/node_modules/vite-tsconfig-paths/dist/index.js";
import { VitePWA } from "file:///home/croco/dev/radio/node_modules/.pnpm/vite-plugin-pwa@0.19.8_vite@5.4.9_@types+node@20.16.11_lightningcss@1.27.0_sass@1.93.2__05f1abb49f6cfcca74e306e134bfa7af/node_modules/vite-plugin-pwa/dist/index.js";
import { resolve } from "node:path";
var __vite_injected_original_dirname = "/home/croco/dev/radio/apps/admin";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Radio Admin Panel",
        short_name: "Radio Admin",
        description: "Admin panel for Radio station",
        theme_color: "#8aa982",
        background_color: "#2e2e2e",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 3001,
    fs: {
      allow: ["..", "../.."]
    },
    watch: {
      usePolling: true,
      ignored: ["!**/node_modules/**"]
    }
  },
  resolve: {
    alias: {
      "@radio/mojo-ui": resolve(__vite_injected_original_dirname, "../../packages/mojo-ui/src")
    }
  },
  preview: {
    port: 3001
  },
  build: {
    outDir: "dist",
    sourcemap: true
  },
  css: {
    postcss: "./postcss.config.js"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9jcm9jby9kZXYvcmFkaW8vYXBwcy9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY3JvY28vZGV2L3JhZGlvL2FwcHMvYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvY3JvY28vZGV2L3JhZGlvL2FwcHMvYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJywgJ21hc2tlZC1pY29uLnN2ZyddLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ1JhZGlvIEFkbWluIFBhbmVsJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ1JhZGlvIEFkbWluJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBZG1pbiBwYW5lbCBmb3IgUmFkaW8gc3RhdGlvbicsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzhhYTk4MicsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMmUyZTJlJyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdwd2EtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiB0cnVlLFxuICAgIHBvcnQ6IDMwMDEsXG4gICAgZnM6IHtcbiAgICAgIGFsbG93OiBbJy4uJywgJy4uLy4uJ10sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICAgIGlnbm9yZWQ6IFsnISoqL25vZGVfbW9kdWxlcy8qKiddLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0ByYWRpby9tb2pvLXVpJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9wYWNrYWdlcy9tb2pvLXVpL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiAzMDAxLFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczogJy4vcG9zdGNzcy5jb25maWcuanMnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsb0JBQW9CO0FBQy9TLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWUsQ0FBQyxlQUFlLHdCQUF3QixpQkFBaUI7QUFBQSxNQUN4RSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsT0FBTyxDQUFDLE1BQU0sT0FBTztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsTUFDWixTQUFTLENBQUMscUJBQXFCO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxrQkFBa0IsUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLEVBQ1g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
