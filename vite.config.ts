// Plugins
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'node:path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**',
      ),
      strictMessage: false,
    }),
    svgLoader({
      defaultImport: 'url',
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
});
