import { defineConfig } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

process.env.VITE_APP_URL ||= 'https://appdinedrop.com';
process.env.VITE_SITE_URL ||= 'https://www.dinedrop.com.br';

const siteUrlInFiles = () => ({
  name: 'site-url-in-files',
  closeBundle() {
    const siteUrl = process.env.VITE_SITE_URL.replace(/\/$/, '');
    for (const name of ['robots.txt', 'sitemap.xml']) {
      const file = resolve('dist', name);
      if (existsSync(file)) {
        writeFileSync(file, readFileSync(file, 'utf8').split('__SITE_URL__').join(siteUrl));
      }
    }
  },
});

export default defineConfig({
  plugins: [siteUrlInFiles()],
  build: { target: 'es2020', assetsInlineLimit: 0 },
});
