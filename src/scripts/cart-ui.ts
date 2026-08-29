import { addToCart, getCartCount } from "../lib/cart";
import { PRODUCTS } from "../data/products";
import { trackEvent } from "../lib/analytics";

declare global {
  interface Window {
    __cartChangeWired?: boolean;
  }
}

function updateBadges() {
  const count = getCartCount();
  document.querySelectorAll<HTMLElement>("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.classList.toggle("hidden", count === 0);
  });
}

export function initCartUI() {
  updateBadges();

  document
    .querySelectorAll<HTMLButtonElement>("[data-qty-target]:not([data-cart-wired])")
    .forEach((btn) => {
      btn.dataset.cartWired = "true";
      btn.addEventListener("click", () => {
        const input = btn.dataset.qtyTarget ? document.getElementById(btn.dataset.qtyTarget) : null;
        if (!(input instanceof HTMLInputElement)) return;
        const step = Number(btn.dataset.qtyStep) || 1;
        const next = Math.max(1, (parseInt(input.value, 10) || 1) + step);
        input.value = String(next);
      });
    });

  document
    .querySelectorAll<HTMLButtonElement>("[data-add-to-cart]:not([data-cart-wired])")
    .forEach((btn) => {
      btn.dataset.cartWired = "true";
      btn.addEventListener("click", () => {
        const slug = btn.dataset.addToCart;
        if (!slug) return;
        const qtyInput = btn.dataset.qtyInput
          ? document.getElementById(btn.dataset.qtyInput)
          : null;
        const qty =
          qtyInput instanceof HTMLInputElement ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
        addToCart(slug, qty);

        const product = PRODUCTS.find((p) => p.slug === slug);
        if (product) {
          trackEvent("add_to_cart", {
            currency: product.currency,
            value: product.price * qty,
            items: [{ item_id: product.sku, item_name: product.name, price: product.price, quantity: qty }],
          });
        }

        const originalLabel = btn.dataset.defaultLabel ?? btn.textContent ?? "";
        const originalClass = btn.dataset.defaultClass ?? btn.className;
        btn.dataset.defaultLabel = originalLabel;
        btn.dataset.defaultClass = originalClass;
        btn.textContent = "Ajouté ✓";
        // Tailwind only generates CSS for class names it can find as literal
        // strings at build time — swapping via classList.add/remove with
        // fixed names (rather than building "bg-signal" from a template)
        // keeps these utilities present in the compiled stylesheet.
        btn.classList.remove(
          "border-accent",
          "bg-accent",
          "text-accent",
          "hover:bg-accent",
          "hover:text-accent",
          "hover:bg-ink",
          "hover:text-ink"
        );
        btn.classList.add("border-signal", "bg-signal", "text-ink");
        window.setTimeout(() => {
          btn.textContent = btn.dataset.defaultLabel ?? originalLabel;
          btn.className = btn.dataset.defaultClass ?? originalClass;
        }, 1400);
      });
    });

  if (!window.__cartChangeWired) {
    window.__cartChangeWired = true;
    window.addEventListener("cart:change", updateBadges);
  }
}
