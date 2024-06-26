import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@myIndiaa': path.resolve(__dirname, 'src')
    }
  }
});
