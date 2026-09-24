// Offre de lancement : remise réelle appliquée au prix facturé, avec une
// date de fin fixe. Le prix barré affiché est le prix normal pratiqué
// jusqu'ici (obligation légale : le prix de référence doit être le plus bas
// des 30 jours précédant la promo). Après PROMO.end, tout revient au prix
// normal — penser à redéployer le site le lendemain pour les pages statiques.
export const PROMO = {
  label: "Offre de lancement",
  start: "2026-09-24T00:00:00+02:00",
  end: "2026-10-12T23:59:59+02:00",
  endLabel: "dimanche 12 octobre 2026 à minuit",
  rate: 0.2,
  slugs: ["obd", "alarme-sos"],
};

export function isPromoActive(now = Date.now()): boolean {
  return now < Date.parse(PROMO.end);
}

export function applyPromo<T extends { slug: string; price: number; originalPrice?: number }>(
  products: T[],
  now = Date.now()
): T[] {
  if (!isPromoActive(now)) return products;
  return products.map((p) =>
    PROMO.slugs.includes(p.slug)
      ? { ...p, originalPrice: p.price, price: Math.round(p.price * (1 - PROMO.rate) * 100) / 100 }
      : p
  );
}
