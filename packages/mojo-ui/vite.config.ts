import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  // Development mode: serve the showcase
  if (command === 'serve') {
    return {
      plugins: [react()],
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

  // Build mode: build the library
  return {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MojoUI',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      sourcemap: true,
    },
  };
});
