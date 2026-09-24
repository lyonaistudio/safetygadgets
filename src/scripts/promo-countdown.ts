import { PROMO, isPromoActive } from "../lib/promo";

// Compte à rebours de l'offre de lancement. Date de fin fixe : il ne se
// relance jamais. Une fois l'offre terminée, tout ce qui la mentionne
// ([data-promo]) disparaît et les éléments de repli réapparaissent.
let timer: number | undefined;

export function initPromoCountdown() {
  window.clearTimeout(timer);
  const end = Date.parse(PROMO.end);
  const pad = (n: number) => String(n).padStart(2, "0");
  const dayUnit = { en: "d", de: "T" }[document.documentElement.lang] ?? "j";

  const tick = () => {
    const left = end - Date.now();
    if (!isPromoActive()) {
      document.querySelectorAll("[data-promo]").forEach((el) => el.remove());
      document.querySelectorAll<HTMLElement>("[data-promo-fallback]").forEach((el) => (el.hidden = false));
      // Pages générées pendant l'offre : on réaffiche le prix normal.
      document.querySelectorAll<HTMLElement>("[data-price-regular]").forEach((el) => {
        if (el.dataset.priceRegular) el.textContent = el.dataset.priceRegular;
      });
      return;
    }
    const d = Math.floor(left / 864e5);
    const h = Math.floor(left / 36e5) % 24;
    const m = Math.floor(left / 6e4) % 60;
    const s = Math.floor(left / 1e3) % 60;
    const values: Record<string, string> = { j: String(d), h: pad(h), min: pad(m), s: pad(s) };
    document.querySelectorAll<HTMLElement>("[data-unit]").forEach((el) => {
      el.textContent = values[el.dataset.unit ?? ""] ?? "";
    });
    document.querySelectorAll("[data-countdown-inline]").forEach((el) => {
      el.textContent = `${d} ${dayUnit} ${pad(h)} h ${pad(m)} min`;
    });
    timer = window.setTimeout(tick, 1000);
  };
  tick();
}
