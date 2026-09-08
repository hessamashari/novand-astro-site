import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Determine environment configuration:
// In GitHub Actions, GITHUB_ACTIONS is set to 'true' and GITHUB_REPOSITORY is 'owner/repo'.
const isGitHubActions = !!process.env.GITHUB_ACTIONS;
const isCustomDomain = !!process.env.CUSTOM_DOMAIN;
const repo = process.env.GITHUB_REPOSITORY;
const [owner, repoName] = repo ? repo.split('/') : ['hessamashari', 'novand-astro-site'];

// If deploying to GitHub Pages without a custom domain, the base path is the repository name.
// In local development, AI Studio preview, or when using a custom domain (e.g. novand.com), base is undefined (root /).
const isProjectPages = isGitHubActions && !isCustomDomain && repoName && !repoName.endsWith('.github.io');

const site = isCustomDomain
  ? (process.env.CUSTOM_DOMAIN.startsWith('http') ? process.env.CUSTOM_DOMAIN : `https://${process.env.CUSTOM_DOMAIN}`)
  : (isGitHubActions ? `https://${owner}.github.io` : 'https://hessamashari.github.io');

const base = isProjectPages ? `/${repoName}` : undefined;

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@formspree/ajax': '@formspree/ajax/dist/index.mjs',
      },
    },
  },
});
