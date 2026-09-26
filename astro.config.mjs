// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import cloudflare from '@astrojs/cloudflare';

// Hébergement : Netlify par défaut ; DEPLOY_TARGET=cloudflare pour le build
// Cloudflare Workers (gratuit), utilisé tant que les crédits Netlify sont épuisés.
const onCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://safety-gadgets.fr',
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.astro/dev.log']
      }
    }
  },

  // Le site reste statique par défaut (toutes les pages sont pré-générées) ;
  // seule la route /api/checkout est dynamique (export const prerender = false),
  // pour créer une session Stripe à partir du panier au moment du paiement.
  adapter: onCloudflare ? cloudflare() : netlify(),

  integrations: [sitemap()]
});