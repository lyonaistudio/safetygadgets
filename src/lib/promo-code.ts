import Stripe from "stripe";

// Recherche d'un code promo Stripe (ex. BIENVENUE10) côté serveur. Source
// unique utilisée par /api/promo-code (affichage dans le panier) et par
// /api/checkout (application réelle au paiement).
export interface PromoCodeInfo {
  id: string;
  code: string;
  percentOff: number | null;
  amountOff: number | null; // en euros
  minimumAmount: number | null; // en euros
  firstOrderOnly: boolean;
}

export async function lookupPromoCode(stripe: Stripe, rawCode: string): Promise<PromoCodeInfo | null> {
  const code = rawCode.trim().toUpperCase();
  if (!/^[A-Z0-9_-]{2,40}$/.test(code)) return null;

  const { data } = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
  const promo = data[0] as (Stripe.PromotionCode & { promotion?: { coupon?: string | Stripe.Coupon } }) | undefined;
  if (!promo) return null;

  // Selon la version d'API, le coupon est dans promo.promotion.coupon ou promo.coupon.
  const legacy = (promo as unknown as { coupon?: string | Stripe.Coupon }).coupon;
  const ref = promo.promotion?.coupon ?? legacy;
  if (!ref) return null;
  const coupon = typeof ref === "string" ? await stripe.coupons.retrieve(ref) : ref;
  if (!coupon.valid) return null;
  if (coupon.amount_off && coupon.currency && coupon.currency !== "eur") return null;

  const min = promo.restrictions?.minimum_amount;
  return {
    id: promo.id,
    code: promo.code,
    percentOff: coupon.percent_off ?? null,
    amountOff: coupon.amount_off ? coupon.amount_off / 100 : null,
    minimumAmount: min ? min / 100 : null,
    firstOrderOnly: Boolean(promo.restrictions?.first_time_transaction),
  };
}
