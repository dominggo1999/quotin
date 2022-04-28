import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.API_KEY': {},
      'require("isomorphic-fetch");': 'import "isomorphic-fetch";',
    }),
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      // ...svgr options (https://react-svgr.com/docs/options/)
      },
    })],
});
