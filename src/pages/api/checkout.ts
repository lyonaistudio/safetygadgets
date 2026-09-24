export const prerender = false;

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { REGULAR_PRODUCTS } from "../../data/products";
import { applyPromo, PROMO } from "../../lib/promo";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../../lib/cart-pricing";

export const POST: APIRoute = async ({ request, url }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("REPLACE_ME")) {
    return new Response(JSON.stringify({ error: "Paiement en ligne pas encore configuré." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => null);
  const lines = Array.isArray(body?.lines) ? body.lines : [];
  const MAX_LINES = 20;
  const MAX_QTY_PER_LINE = 20;

  if (!lines.length) {
    return new Response(JSON.stringify({ error: "Panier vide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (lines.length > MAX_LINES) {
    return new Response(JSON.stringify({ error: "Panier invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Les prix viennent uniquement de PRODUCTS (source serveur), jamais du
  // client, pour qu'un panier manipulé ne puisse pas changer les montants.
  // Promo recalculée à chaque requête : la fin de l'offre s'applique à
  // l'heure exacte, même si le serveur tourne depuis avant la date.
  const PRODUCTS = applyPromo(REGULAR_PRODUCTS);
  const validatedLines: { product: (typeof PRODUCTS)[number]; quantity: number }[] = [];
  for (const { slug, qty } of lines) {
    const product = PRODUCTS.find((p) => p.slug === slug);
    const quantity = Number(qty);
    if (
      !product ||
      typeof slug !== "string" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QTY_PER_LINE
    ) {
      return new Response(JSON.stringify({ error: "Panier invalide." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    validatedLines.push({ product, quantity });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = validatedLines.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: product.currency.toLowerCase(),
      unit_amount: Math.round(product.price * 100),
      product_data: {
        name: [
          product.name,
          product.originalPrice ? `offre de lancement −${Math.round(PROMO.rate * 100)} %` : "",
        ]
          .filter(Boolean)
          .join(" · "),
      },
    },
  }));

  const subtotal = validatedLines.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const currency = validatedLines[0].product.currency.toLowerCase();
  const shippingOption: Stripe.Checkout.SessionCreateParams.ShippingOption =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency },
            display_name: "Livraison offerte",
          },
        }
      : {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: Math.round(SHIPPING_FEE * 100), currency },
            display_name: "Livraison standard",
          },
        };

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_options: [shippingOption],
      success_url: `${url.origin}/commande-confirmee/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/panier/`,
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
      // Codes promo (ex. BIENVENUE10 offert à l'inscription newsletter).
      allow_promotion_codes: true,
      // Pas de relance Stripe des paniers abandonnés : elle exige
      // consent_collection.promotions, indisponible pour un compte en France.
      // Message cadeau facultatif, glissé dans le colis.
      custom_fields: [
        {
          key: "message_cadeau",
          label: { type: "custom", custom: "Message cadeau (facultatif)" },
          type: "text",
          optional: true,
          text: { maximum_length: 200 },
        },
      ],
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Ne jamais renvoyer le détail de l'erreur Stripe au client (peut
    // contenir des informations internes) — seulement logué côté serveur.
    console.error("Stripe checkout session creation failed:", err);
    return new Response(JSON.stringify({ error: "Paiement momentanément indisponible." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
