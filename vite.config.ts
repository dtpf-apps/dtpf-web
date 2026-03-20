import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const appVersion = pkg.version as string;
const buildTime = Date.now().toString();

function versionFilePlugin(): Plugin {
  return {
    name: 'version-file',
    config() {
      return {
        define: {
          __BUILD_TIME__: JSON.stringify(buildTime),
          __APP_VERSION__: JSON.stringify(appVersion),
        },
      };
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: appVersion, buildTime }),
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    versionFilePlugin(),
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/setup.ts'],
    include: ['test/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/App.tsx',
        'src/react-app-env.d.ts',
        'src/service-worker.ts',
        'src/serviceWorkerRegistration.ts',
        'src/assets/**',
        'src/styles/**',
        'src/router/router.tsx',
        'src/views/layouts/**',
        'src/api/utils/config.ts',
      ],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
  },
});
