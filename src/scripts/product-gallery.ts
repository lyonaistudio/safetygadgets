export function initProductGallery() {
  const galleries = document.querySelectorAll<HTMLElement>("[data-product-gallery]");

  galleries.forEach((gallery) => {
    if (gallery.dataset.galleryInit) return;
    gallery.dataset.galleryInit = "true";

    const mainImg = gallery.querySelector<HTMLImageElement>("[data-gallery-main]");
    if (!mainImg) return;

    let images: string[] = [];
    try {
      images = JSON.parse(gallery.dataset.galleryImages ?? "[]");
    } catch {
      images = [];
    }
    if (images.length < 2) return;

    const thumbs = Array.from(gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-thumb]"));
    const prevBtn = gallery.querySelector<HTMLButtonElement>("[data-gallery-prev]");
    const nextBtn = gallery.querySelector<HTMLButtonElement>("[data-gallery-next]");

    let current = 0;

    const activate = (index: number) => {
      current = (index + images.length) % images.length;
      mainImg.src = images[current];
      thumbs.forEach((t, i) => {
        t.classList.toggle("border-accent", i === current);
        t.classList.toggle("border-ink-line", i !== current);
      });
    };

    // preventDefault + stopPropagation: on the homepage these controls sit
    // inside a card wrapped by an <a> to the product page, so a bare click
    // would otherwise navigate away instead of rotating the photo.
    const wire = (el: Element | null, handler: () => void) => {
      el?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handler();
      });
    };

    thumbs.forEach((thumb, i) => wire(thumb, () => activate(i)));
    wire(prevBtn, () => activate(current - 1));
    wire(nextBtn, () => activate(current + 1));
  });
}
