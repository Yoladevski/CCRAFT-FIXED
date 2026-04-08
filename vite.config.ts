import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function lazyImagesPlugin(): Plugin {
  return {
    name: 'lazy-images',
    transform(code, id) {
      if (!id.endsWith('.tsx') && !id.endsWith('.jsx')) return null;
      return code.replace(/<img\b(?![^>]*\bloading\s*=)/g, '<img loading="lazy"');
    },
  };
}

export default defineConfig({
  plugins: [react(), lazyImagesPlugin()],
  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
