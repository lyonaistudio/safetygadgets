import { trackEvent } from "../lib/analytics";
import { PRODUCTS, formatPriceTTC, type Product } from "../data/products";
import { getCart, setQty, removeFromCart, addToCart } from "../lib/cart";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../lib/cart-pricing";

function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

function render() {
  const linesContainer = document.getElementById("cart-lines");
  const emptyState = document.getElementById("cart-empty");
  const summaryContainer = document.getElementById("cart-summary");
  const suggestionsSection = document.getElementById("cart-suggestions-section");
  const suggestionsContainer = document.getElementById("cart-suggestions");
  const checkoutButton = document.getElementById("cart-checkout") as HTMLButtonElement | null;
  if (!linesContainer || !summaryContainer) return;

  const cart = getCart();
  const lines = cart
    .map((line) => ({ line, product: findProduct(line.slug) }))
    .filter((entry): entry is { line: { slug: string; qty: number }; product: Product } =>
      Boolean(entry.product)
    );

  const hasItems = lines.length > 0;
  emptyState?.classList.toggle("hidden", hasItems);
  linesContainer.classList.toggle("hidden", !hasItems);
  if (checkoutButton) {
    checkoutButton.disabled = !hasItems;
  }

  linesContainer.innerHTML = lines
    .map(({ line, product }) => {
      const lineTotal = product.price * line.qty;
      return `
        <div class="flex gap-4 py-6">
          <img src="${product.image}" alt="${product.name}" class="h-24 w-24 shrink-0 rounded-xl bg-ink-soft object-contain p-2" />
          <div class="flex flex-1 flex-col justify-between">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.1em] text-mist">${product.category}</p>
                <h3 class="mt-1 text-base font-semibold text-paper">${product.name}</h3>
              </div>
              <button type="button" data-remove="${product.slug}" class="shrink-0 text-xs uppercase tracking-[0.1em] text-mist transition-colors hover:text-accent" aria-label="Retirer ${product.name} du panier">
                Retirer
              </button>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex items-center rounded-lg border border-ink-line">
                <button type="button" data-qty-minus="${product.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Diminuer la quantité">−</button>
                <span class="w-8 text-center font-mono text-sm text-paper">${line.qty}</span>
                <button type="button" data-qty-plus="${product.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Augmenter la quantité">+</button>
              </div>
              <p class="text-sm font-semibold text-paper">${formatPriceTTC(lineTotal, product.currency)}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const total = subtotal;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const shippingFee = hasItems && remaining > 0 ? SHIPPING_FEE : 0;
  const grandTotal = total + shippingFee;

  const shippingLine = !hasItems
    ? ""
    : remaining > 0
      ? `<div class="mt-2 flex items-center justify-between text-xs text-paper-dim">
          <span>Frais de livraison</span>
          <span>${formatPriceTTC(shippingFee)}</span>
        </div>
        <p class="mt-2 text-xs text-paper-dim">Plus que <span class="text-accent">${remaining
          .toFixed(2)
          .replace(".", ",")} €</span> d'achat pour la livraison offerte.</p>`
      : `<p class="mt-3 text-xs text-accent">Livraison offerte 🎉</p>`;

  summaryContainer.innerHTML = `
    <p class="text-xs uppercase tracking-[0.1em] text-mist">Sous-total</p>
    <p class="mt-2 font-mono text-2xl text-paper">${formatPriceTTC(subtotal)}</p>
    ${shippingLine}
    ${
      hasItems
        ? `<p class="mt-3 border-t border-ink-line pt-3 font-mono text-lg text-paper">Total : ${formatPriceTTC(grandTotal)}</p>`
        : ""
    }
    <p class="mt-4 text-xs leading-relaxed text-mist">
      Livraison offerte dès 49&nbsp;€ TTC d'achat, sinon 7,99&nbsp;€ de frais de livraison.
    </p>
  `;

  if (suggestionsContainer && suggestionsSection) {
    const cartSlugs = new Set(lines.map(({ product }) => product.slug));
    const suggestions = PRODUCTS.filter((p) => !cartSlugs.has(p.slug) && !p.comingSoon);
    suggestionsSection.classList.toggle("hidden", suggestions.length === 0);
    // Argument adapté à ce qui est déjà dans le panier : l'alarme pour un
    // proche quand on a pris le tracker, le tracker pour la voiture sinon.
    const pitch: Record<string, string> = {
      "alarme-sos": "Et pour un proche ? L'alarme SOS le relie à vous d'une simple pression.",
      obd: "Et pour la voiture ? Le tracker OBD la localise en temps réel.",
    };
    suggestionsContainer.innerHTML = suggestions
      .map(
        (product) => `
        <div class="flex items-center gap-4 rounded-2xl border border-ink-line bg-white p-4">
          <img src="${product.image}" alt="${product.name}" class="h-20 w-20 shrink-0 rounded-xl bg-ink-soft object-contain p-2" />
          <div class="flex-1">
            <p class="text-sm text-paper-dim">${pitch[product.slug] ?? ""}</p>
            <h4 class="mt-1 text-base font-semibold text-paper">${product.name}</h4>
            <p class="mt-0.5 text-sm font-semibold text-paper">${formatPriceTTC(product.price, product.currency)}${
              product.originalPrice ? ` <span class="font-normal text-mist line-through">${formatPriceTTC(product.originalPrice, product.currency)}</span>` : ""
            }</p>
          </div>
          <button type="button" data-quick-add="${product.slug}" class="shrink-0 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-gold-soft" aria-label="Ajouter ${product.name} au panier">
            Ajouter
          </button>
        </div>
      `
      )
      .join("");
  }

  wireLineEvents();
}

function wireLineEvents() {
  document.querySelectorAll<HTMLButtonElement>("[data-qty-plus]").forEach((btn) => {
    btn.onclick = () => {
      const slug = btn.dataset.qtyPlus!;
      const current = getCart().find((l) => l.slug === slug)?.qty ?? 0;
      setQty(slug, current + 1);
      render();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-qty-minus]").forEach((btn) => {
    btn.onclick = () => {
      const slug = btn.dataset.qtyMinus!;
      const current = getCart().find((l) => l.slug === slug)?.qty ?? 0;
      setQty(slug, current - 1);
      render();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-remove]").forEach((btn) => {
    btn.onclick = () => {
      removeFromCart(btn.dataset.remove!);
      render();
    };
  });
  document.querySelectorAll<HTMLButtonElement>("[data-quick-add]").forEach((btn) => {
    btn.onclick = () => {
      addToCart(btn.dataset.quickAdd!, 1);
      btn.disabled = true;
      btn.textContent = "✓";
      btn.classList.remove("border-accent", "text-accent", "hover:bg-gold", "hover:text-night");
      btn.classList.add("border-signal", "bg-signal", "text-night");
      window.setTimeout(render, 500);
    };
  });
}

async function handleCheckout() {
  const button = document.getElementById("cart-checkout") as HTMLButtonElement | null;
  const errorEl = document.getElementById("cart-checkout-error");
  if (!button) return;

  errorEl?.classList.add("hidden");
  button.disabled = true;
  const originalLabel = button.textContent;
  button.textContent = "Redirection vers le paiement…";

  try {
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: getCart().reduce((sum, l) => sum + (findProduct(l.slug)?.price ?? 0) * l.qty, 0),
    });
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: getCart() }),
    });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error ?? "Erreur inconnue");
    window.location.href = data.url;
  } catch {
    if (errorEl) {
      errorEl.textContent =
        "Le paiement en ligne est momentanément indisponible — utilisez le formulaire de contact pour commander.";
      errorEl.classList.remove("hidden");
    }
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

export function initCartPage() {
  if (!document.getElementById("cart-lines")) return;
  document.getElementById("cart-checkout")?.addEventListener("click", handleCheckout);
  render();
}
