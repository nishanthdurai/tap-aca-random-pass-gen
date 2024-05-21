import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const config = {
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // to expose development server to LAN.
    open: 'index.html', // to automatically open the site when server starts
  },
};

export default config;
