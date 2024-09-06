import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
  plugins: [react(), compression()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
