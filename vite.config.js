import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// SPA estática: Vercel la detecta como "Framework Preset: Vite"
// (Build Command: npm run build · Output Directory: dist).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // La mayor parte del bundle es texto didáctico (41 casos, manual y glosario): ~175 KB con gzip.
    chunkSizeWarningLimit: 750,
  },
});
