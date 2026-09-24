export const prerender = false;

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { lookupPromoCode } from "../../lib/promo-code";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Vérifie un code promo saisi dans le panier et renvoie la réduction à
// afficher. Le montant final reste recalculé par Stripe au paiement.
export const POST: APIRoute = async ({ request }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("REPLACE_ME")) return json({ ok: false, error: "Codes promo indisponibles pour le moment." }, 503);

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  try {
    const info = await lookupPromoCode(new Stripe(secretKey), code);
    if (!info) return json({ ok: false, error: "Ce code promo n'est pas valide." }, 404);
    return json({ ok: true, ...info });
  } catch (err) {
    console.error("Promo code lookup failed:", err);
    return json({ ok: false, error: "Vérification impossible, réessayez." }, 502);
  }
};
