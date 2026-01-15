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
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }
          if (id.includes('components/MultiStepForm')) {
            return 'form-chunk';
          }
          if (id.includes('components/LandingPage')) {
            return 'landing-chunk';
          }
        },
      },
    },
    cssCodeSplit: true,
    target: 'es2020',
  },
});
