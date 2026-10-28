import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { polishMarkdownTypography } from './src/i18n/typography.js';
import { resolveSiteOrigin } from './scripts/site-origin.mjs';

export default defineConfig({
  site: resolveSiteOrigin(),
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    processor: satteri({
      mdastPlugins: [polishMarkdownTypography]
    })
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0
    }
  }
});
