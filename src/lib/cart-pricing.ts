// Remise quantité : +5 % de réduction par article ajouté au panier
// (au-delà du premier), plafonnée à 20 % pour rester soutenable — un
// panier de 5 articles ou plus atteint le palier maximum.
// Source unique utilisée à la fois par l'affichage panier et par la
// création de la session Stripe, pour que le total facturé corresponde
// toujours exactement à ce qui est montré au client.
const DISCOUNT_PER_EXTRA_ITEM = 0.05;
const MAX_DISCOUNT_RATE = 0.2;

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 4.9;

export function totalQty(lines: { qty: number }[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function quantityDiscountRate(qty: number): number {
  const extraItems = Math.max(0, qty - 1);
  return Math.min(extraItems * DISCOUNT_PER_EXTRA_ITEM, MAX_DISCOUNT_RATE);
}
