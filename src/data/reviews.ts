// Avis clients vérifiés, publiés à la main après réception via le
// formulaire de la fiche produit (Formspree) et vérification que la
// personne a bien commandé. Uniquement de vrais avis : un faux avis est une
// pratique commerciale trompeuse (art. L121-4 du Code de la consommation).
export interface Review {
  slug: string; // produit concerné
  name: string; // prénom + initiale, ex. "Claire D."
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // AAAA-MM-JJ
  text: string;
}

export const REVIEWS: Review[] = [];

export function reviewsFor(slug: string): Review[] {
  return REVIEWS.filter((r) => r.slug === slug).sort((a, b) => b.date.localeCompare(a.date));
}

export function ratingSummary(slug: string): { average: number; count: number } | null {
  const list = reviewsFor(slug);
  if (list.length === 0) return null;
  const average = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return { average: Math.round(average * 10) / 10, count: list.length };
}
