// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';

const isDevelopment = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), markdoc(), ...(isDevelopment ? [keystatic()] : [])],
  output: 'static',
  site: 'https://www.carloscondor.com',
  // base: '/carloscondor-landing', // Solo para GitHub Pages
});
