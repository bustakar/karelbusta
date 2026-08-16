import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { loadMetrics } from './api/metrics';

function revenueCatMetricsApi(projectId?: string, secret?: string): Plugin {
  return {
    name: 'revenuecat-metrics-api',
    configureServer(server) {
      server.middlewares.use('/api/metrics', async (_request, response) => {
        response.setHeader('content-type', 'application/json');
        if (!projectId || !secret) {
          response.statusCode = 503;
          response.end(JSON.stringify({ error: 'RevenueCat metrics are not configured' }));
          return;
        }
        try {
          response.end(JSON.stringify(await loadMetrics(projectId, secret)));
        } catch {
          response.statusCode = 502;
          response.end(JSON.stringify({ error: 'RevenueCat metrics are unavailable' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      revenueCatMetricsApi(env.REVENUECAT_PROJECT_ID, env.REVENUECAT_SECRET_API_KEY),
    ],
    build: {
      manifest: true,
      outDir: 'dist/client',
      rollupOptions: {
        input: '/src/entry-client.tsx',
      },
    },
    ssr: {
      noExternal: ['@vercel/analytics', '@vercel/speed-insights'],
    },
  };
});
