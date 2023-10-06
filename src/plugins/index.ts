/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import type { App } from 'vue';

import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import { i18n } from './i18n';

export * from './i18n';
export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router).use(i18n);
}