import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://alumni-connect-six.vercel.app',
        changeOrigin: true,
        secure: false,
        // No need for configure unless debugging
      },
    },
  },
});