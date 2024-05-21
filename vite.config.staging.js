import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
const staging = {
  plugins: [react(), viteCompression()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
};

export default staging;
