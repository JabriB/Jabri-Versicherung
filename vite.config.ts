import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
          if (id.includes('components/MultiStepForm')) {
            return 'form';
          }
          if (id.includes('components/LandingPage')) {
            return 'landing';
          }
          if (id.includes('translations')) {
            return 'i18n';
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2020',
    modulePreload: {
      polyfill: false,
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        return deps.filter(dep => {
          if (dep.includes('form') || dep.includes('FAQ') || dep.includes('AGB') ||
              dep.includes('Datenschutz') || dep.includes('Impressum') || dep.includes('Sitemap')) {
            return false;
          }
          return true;
        });
      },
    },
  },
});
