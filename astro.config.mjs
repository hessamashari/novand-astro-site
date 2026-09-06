import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hessamashari.github.io/novand-astro-site',
  base: '/novand-astro-site',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
