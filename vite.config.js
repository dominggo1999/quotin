import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    envCompatible(/* options */),
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      // ...svgr options (https://react-svgr.com/docs/options/)
      },
    })],
});
