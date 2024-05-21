import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  if (mode === 'development') {
    const { default: def } = await import('./vite.config.development.js');
    return def;
  } else if (mode === 'production') {
    const { default: def } = await import('./vite.config.production.js');
    return def;
  } else {
    const { default: def } = await import('./vite.config.staging.js');
    return def;
  }
});
