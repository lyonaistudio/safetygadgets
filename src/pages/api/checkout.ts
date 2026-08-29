export const prerender = false;

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { PRODUCTS } from "../../data/products";
import { totalQty, quantityDiscountRate, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../../lib/cart-pricing";

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

  // Remise quantité : 5 % par article ajouté, plafonnée à 20 % — calculée
  // ici (source unique partagée avec l'affichage panier) donc jamais
  // manipulable depuis le client.
  const discountRate = quantityDiscountRate(totalQty(validatedLines.map((l) => ({ qty: l.quantity }))));

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = validatedLines.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: product.currency.toLowerCase(),
      unit_amount: Math.round(product.price * (1 - discountRate) * 100),
      product_data: { name: discountRate > 0 ? `${product.name} (remise quantité ${Math.round(discountRate * 100)} %)` : product.name },
    },
  }));

  const discountedSubtotal = validatedLines.reduce(
    (sum, { product, quantity }) => sum + product.price * (1 - discountRate) * quantity,
    0
  );
  const currency = validatedLines[0].product.currency.toLowerCase();
  const shippingOption: Stripe.Checkout.SessionCreateParams.ShippingOption =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD
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
