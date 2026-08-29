// Découpe le titre du hero en mots, chacun animé avec un léger délai
// croissant, pour un effet d'apparition progressif à l'arrivée sur la page.
export function initHeroReveal() {
  const heading = document.querySelector<HTMLElement>("[data-hero-heading]");
  if (!heading || heading.dataset.heroSplit === "true") return;

  const words = heading.textContent?.trim().split(/\s+/) ?? [];
  if (!words.length) return;

  heading.dataset.heroSplit = "true";
  heading.classList.add("hero-letters");
  heading.setAttribute("data-hero-armed", "");
  heading.innerHTML = words
    .map((word, i) => {
      const delay = (i * 45).toString();
      return `<span data-letter style="transition-delay:${delay}ms">${word}</span>`;
    })
    .join(" ");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heading.setAttribute("data-hero-visible", "");
    });
  });
}
