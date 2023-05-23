import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'client', // index.html is the in /client folder
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
