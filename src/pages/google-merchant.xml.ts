import type { APIRoute } from "astro";
import { REGULAR_PRODUCTS } from "../data/products";
import { PROMO, isPromoActive } from "../lib/promo";
import { SITE } from "../lib/site";

// Flux produits pour Google Merchant Center (fiches gratuites Google
// Shopping). À déclarer dans Merchant Center : Produits > Flux > URL
// https://safety-gadgets.com/google-merchant.xml (récupération quotidienne).
// Prix normal + prix promo avec sa période, pour que Google retire la promo
// tout seul à la date de fin.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const eur = (n: number) => `${n.toFixed(2)} EUR`;

export const GET: APIRoute = () => {
  const items = REGULAR_PRODUCTS.filter((p) => !p.comingSoon)
    .map((p) => {
      const promo = isPromoActive() && PROMO.slugs.includes(p.slug);
      const sale = Math.round(p.price * (1 - PROMO.rate) * 100) / 100;
      return `    <item>
      <g:id>${esc(p.sku)}</g:id>
      <g:title>${esc(p.name)}</g:title>
      <g:description>${esc(p.shortDescription)}</g:description>
      <g:link>${SITE.url}/traceurs-gps/${p.slug}/</g:link>
      <g:image_link>${SITE.url}${p.image}</g:image_link>
${(p.gallery ?? []).filter((g) => g !== p.image).map((g) => `      <g:additional_image_link>${SITE.url}${g}</g:additional_image_link>`).join("\n")}
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${eur(p.price)}</g:price>${
        promo
          ? `
      <g:sale_price>${eur(sale)}</g:sale_price>
      <g:sale_price_effective_date>${PROMO.start}/${PROMO.end}</g:sale_price_effective_date>`
          : ""
      }
      <g:brand>${esc(SITE.name)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${esc(p.category)}</g:product_type>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.name)} — catalogue produits</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
