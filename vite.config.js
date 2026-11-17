import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

const src = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_PROXY || 'https://logistics-api-h521.onrender.com';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': src(''),
      },
    },
    server: {
      port: 5173,
      // Same-origin proxy (mirrors public/_redirects in production) so the session cookie works.
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true, secure: true },
      },
    },
    build: {
      outDir: 'build', // Netlify publishes ./build (unchanged from the CRA setup)
      sourcemap: false,
      rollupOptions: {
        output: {
          // Long-lived vendor chunk: app deploys don't invalidate the cached React code.
          // (Leaflet is deliberately left to the lazy import so it only loads on tracking pages.)
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/.test(id)) return 'react';
            return undefined;
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.js'],
      css: false,
    },
  };
});
