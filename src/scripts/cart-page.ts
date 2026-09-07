import { PRODUCTS, formatPriceTTC, type Product } from "../data/products";
import { getCart, setQty, removeFromCart, addToCart } from "../lib/cart";
import { totalQty, quantityDiscountRate, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../lib/cart-pricing";

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
          <img src="${product.image}" alt="${product.name}" class="premium-photo h-24 w-24 shrink-0 border border-ink-line bg-ink-soft object-contain p-2" />
          <div class="flex flex-1 flex-col justify-between">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.1em] text-mist">${product.category}</p>
                <h3 class="mt-1 font-display text-lg text-paper">${product.name}</h3>
              </div>
              <button type="button" data-remove="${product.slug}" class="shrink-0 text-xs uppercase tracking-[0.1em] text-mist transition-colors hover:text-accent" aria-label="Retirer ${product.name} du panier">
                Retirer
              </button>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex items-center border border-ink-line">
                <button type="button" data-qty-minus="${product.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Diminuer la quantité">−</button>
                <span class="w-8 text-center font-mono text-sm text-paper">${line.qty}</span>
                <button type="button" data-qty-plus="${product.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Augmenter la quantité">+</button>
              </div>
              <p class="font-mono text-sm text-accent">${formatPriceTTC(lineTotal, product.currency)}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const qty = totalQty(lines.map(({ line }) => line));
  const discountRate = quantityDiscountRate(qty);
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const discountLine =
    discountRate > 0
      ? `<div class="mt-2 flex items-center justify-between text-xs text-signal">
          <span>Remise quantité (${Math.round(discountRate * 100)} %)</span>
          <span>−${formatPriceTTC(discountAmount)}</span>
        </div>`
      : "";
  const nextTierLine =
    hasItems && discountRate < 0.2
      ? `<p class="mt-2 text-xs text-paper-dim">Ajoutez un article de plus pour <span class="text-accent">${
          Math.round((discountRate + 0.05) * 100)
        } % de réduction</span> sur tout le panier.</p>`
      : "";

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
    ${discountLine}
    ${shippingLine}
    ${
      hasItems
        ? `<p class="mt-3 border-t border-ink-line pt-3 font-mono text-lg text-paper">Total : ${formatPriceTTC(grandTotal)}</p>`
        : ""
    }
    ${nextTierLine}
    <p class="mt-4 text-xs leading-relaxed text-mist">
      5&nbsp;% de réduction par article ajouté au panier (jusqu'à 20&nbsp;% dès 5 articles). Livraison
      offerte dès 100&nbsp;€ TTC d'achat, sinon 7,99&nbsp;€ de frais de livraison.
    </p>
  `;

  if (suggestionsContainer && suggestionsSection) {
    const cartSlugs = new Set(lines.map(({ product }) => product.slug));
    const suggestions = PRODUCTS.filter((p) => !cartSlugs.has(p.slug) && !p.comingSoon);
    suggestionsSection.classList.toggle("hidden", suggestions.length === 0);
    suggestionsContainer.innerHTML = suggestions
      .map(
        (product) => `
        <div class="flex items-center gap-4 border border-ink-line bg-ink-soft p-4">
          <img src="${product.image}" alt="${product.name}" class="premium-photo h-16 w-16 shrink-0 border border-ink-line bg-ink object-contain p-2" />
          <div class="flex-1">
            <h4 class="font-display text-base text-paper">${product.name}</h4>
            <p class="mt-1 font-mono text-sm text-accent">${formatPriceTTC(product.price, product.currency)}</p>
          </div>
          <button type="button" data-quick-add="${product.slug}" class="flex h-9 w-9 shrink-0 items-center justify-center border border-accent text-lg leading-none text-accent transition-colors hover:bg-accent hover:text-ink" aria-label="Ajouter ${product.name} au panier">
            +
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
      btn.classList.remove("border-accent", "text-accent", "hover:bg-accent", "hover:text-ink");
      btn.classList.add("border-signal", "bg-signal", "text-ink");
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
