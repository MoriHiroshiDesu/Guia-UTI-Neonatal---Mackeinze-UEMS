import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Necessário para funcionamento correto em subdiretórios no GitHub Pages
  server: {
    port: 5173,
    host: true, // Expõe para a rede local (acesso via celular)
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
