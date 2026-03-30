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
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
