import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
});