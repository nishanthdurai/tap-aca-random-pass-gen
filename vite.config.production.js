import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
const production = {
  plugins: [react(), viteCompression()],
};

export default production;
