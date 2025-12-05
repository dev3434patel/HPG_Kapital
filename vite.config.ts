import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [
    react(), 
  ];

  if (mode === "development") {
    plugins.push(componentTagger());
  }

  if (mode === "production") {
    try {
      // @ts-expect-error - rollup-plugin-visualizer types may not be available
      const { visualizer } = await import("rollup-plugin-visualizer");
      plugins.push(visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }));
    } catch (e) {
      // Visualizer not available, skip it
      console.warn('rollup-plugin-visualizer not available');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    plugins,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'utils-vendor': ['date-fns', 'date-fns-tz', 'framer-motion'],
        },
      },
    },
  },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
