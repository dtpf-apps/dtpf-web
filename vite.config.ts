import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff,woff2}'],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
});
