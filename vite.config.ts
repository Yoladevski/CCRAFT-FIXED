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
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react-dom';
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/') || id.includes('node_modules/@remix-run')) return 'vendor-router';
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase';
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
        },
      },
    },
  },
});
