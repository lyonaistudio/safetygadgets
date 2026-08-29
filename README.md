# Safety Gadgets

Site e-commerce vitrine pour Safety Gadgets — trackers GPS, trackers Bluetooth
(compatibles Find My) et détecteurs anti-espionnage. Disponible en français,
anglais et allemand.

- **Production** : https://safety-gadgets.fr
- **Stack** : [Astro](https://astro.build) + Tailwind CSS, déployé sur Netlify
- **Paiement** : Stripe Checkout
- **Contenu** : collection Astro (`src/content/actualites`) pour le blog

## Démarrer en local

```bash
npm install
cp .env.example .env   # renseigner STRIPE_SECRET_KEY (clé de test pour dev)
npm run dev
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de dev sur `localhost:4321` |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build de production en local |

## Structure

```
src/
  components/    composants Astro réutilisables (Header, FAQ, cartes produit…)
  content/       articles du blog (collection Astro, Markdown)
  data/          catalogue produits — FR (products.ts), EN, DE
  layouts/       BaseLayout.astro (head, JSON-LD, i18n)
  lib/           schema.org, panier, tarification, i18n
  pages/         routes — racine = FR, /en/ et /de/ = traductions
  scripts/       JS client (panier, formulaire, animations)
  styles/        global.css (thème, tokens Tailwind)
public/          assets statiques (images produits, logo, favicons)
video-remotion/  sous-projet Remotion — vidéo promo 30s (voir plus bas)
```

## Internationalisation

Le français est à la racine (`/`, `/traceurs-gps/`, …), l'anglais et
l'allemand sont préfixés (`/en/…`, `/de/…`). Les chaînes d'interface
vivent dans `src/lib/i18n.ts` ; le catalogue produits est dupliqué par
langue dans `src/data/products{.en,.de}.ts` (mêmes slugs, mêmes prix).

## Panier & paiement

Panier client-side (`localStorage`, `src/lib/cart.ts`), remise quantité
et frais de port calculés dans `src/lib/cart-pricing.ts` — cette même
logique est réutilisée côté serveur (`src/pages/api/checkout.ts`) pour
que le montant facturé sur Stripe corresponde toujours à ce qui est
affiché côté client.

## Vidéo promotionnelle (`video-remotion/`)

Sous-projet [Remotion](https://www.remotion.dev) indépendant (son propre
`package.json`). Pour re-générer la vidéo :

```bash
cd video-remotion
npm install
npx remotion render src/index.ts Main out/video.mp4 --codec h264 --crf 17
```

## Variables d'environnement

Voir `.env.example`. `STRIPE_SECRET_KEY` doit être une clé secrète Stripe
(mode test en dev, mode live en production) — jamais commitée.
