import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };

  if (command === 'serve') {
    return {
      ...baseConfig,
      server: {
        host: '0.0.0.0',
        port: 3010,
        fs: {
          allow: ['..', '../..'],
        },
        watch: {
          usePolling: true,
        },
      },
    };
  }

  return {
    ...baseConfig,
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MojoUI',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'index.css';
            return assetInfo.name || '';
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
    },
  };
});
