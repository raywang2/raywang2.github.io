import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:'https://raywang2.github.io', output:'static', vite:{server:{allowedHosts:['terminal.local']}}, trailingSlash:'always', integrations:[sitemap()]});
