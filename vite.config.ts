import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

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

function manifestEnvPlugin(): Plugin {
  const suffix = process.env.VITE_APP_SUFFIX || '';
  let outDir = '';
  let publicDir = '';

  return {
    name: 'manifest-env-name',
    configResolved(config) {
      outDir = config.build.outDir;
      publicDir = config.publicDir;
    },
    configureServer(server) {
      if (!suffix) return;
      server.middlewares.use((req, res, next) => {
        if (req.url === '/manifest.json') {
          const manifest = JSON.parse(readFileSync(path.resolve(publicDir, 'manifest.json'), 'utf-8'));
          manifest.name = `${manifest.name} ${suffix}`;
          manifest.short_name = `${manifest.short_name} ${suffix}`;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(manifest, null, 2));
          return;
        }
        next();
      });
    },
    closeBundle() {
      if (!suffix) return;
      const manifestPath = path.resolve(outDir, 'manifest.json');
      if (existsSync(manifestPath)) {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
        manifest.name = `${manifest.name} ${suffix}`;
        manifest.short_name = `${manifest.short_name} ${suffix}`;
        writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    versionFilePlugin(),
    manifestEnvPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        globIgnores: ['**/logo512*'],
      },
    }),
  ],
  // Vite 8 resolves tsconfig `paths` natively. The vite-tsconfig-paths plugin this
  // replaces pulls tsconfck, whose peer range stops at TypeScript 5.
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/'))
            return 'react-vendor';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';
        },
      },
    },
  },
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
