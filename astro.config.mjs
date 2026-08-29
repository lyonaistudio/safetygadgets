// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://safety-gadgets.fr',
  vite: {
    plugins: [tailwindcss()]
  },

  // Le site reste statique par défaut (toutes les pages sont pré-générées) ;
  // seule la route /api/checkout est dynamique (export const prerender = false),
  // pour créer une session Stripe à partir du panier au moment du paiement.
  adapter: netlify(),

  integrations: [sitemap()]
});