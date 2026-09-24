import { trackEvent } from "../lib/analytics";
import { PRODUCTS, formatPriceTTC, type Product } from "../data/products";
import { getCart, setQty, removeFromCart, addToCart } from "../lib/cart";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "../lib/cart-pricing";

// Code promo choisi dans le panier (vérifié par /api/promo-code), gardé
// dans le navigateur jusqu'au paiement.
interface AppliedPromo {
  code: string;
  percentOff: number | null;
  amountOff: number | null;
  minimumAmount: number | null;
  firstOrderOnly: boolean;
}
const PROMO_KEY = "sg-promo-code";

function getPromo(): AppliedPromo | null {
  try {
    return JSON.parse(localStorage.getItem(PROMO_KEY) ?? "null");
  } catch {
    return null;
  }
}
function setPromo(promo: AppliedPromo | null) {
  try {
    if (promo) localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
    else localStorage.removeItem(PROMO_KEY);
  } catch {}
}

function promoDiscount(promo: AppliedPromo | null, subtotal: number): number {
  if (!promo || subtotal <= 0) return 0;
  if (promo.minimumAmount && subtotal < promo.minimumAmount) return 0;
  if (promo.percentOff) return Math.round(subtotal * promo.percentOff) / 100;
  if (promo.amountOff) return Math.min(promo.amountOff, subtotal);
  return 0;
}

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
  const promo = getPromo();
  const discount = promoDiscount(promo, subtotal);

  // Seuil de livraison offerte calculé avant code promo (même règle que
  // côté serveur dans /api/checkout).
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = hasItems && remaining > 0 ? SHIPPING_FEE : 0;
  const grandTotal = subtotal - discount + shippingFee;

  const discountLine =
    hasItems && promo
      ? discount > 0
        ? `<div class="mt-2 flex items-center justify-between text-sm text-signal">
            <span>Code ${promo.code}${promo.percentOff ? ` (−${promo.percentOff} %)` : ""}</span>
            <span>−${formatPriceTTC(discount)}</span>
          </div>`
        : `<p class="mt-2 text-xs text-paper-dim">Code ${promo.code} : valable dès ${formatPriceTTC(promo.minimumAmount ?? 0)} d'achat.</p>`
      : "";

  const shippingLine = !hasItems
    ? ""
    : remaining > 0
      ? `<div class="mt-2 flex items-center justify-between text-sm text-paper-dim">
          <span>Livraison</span>
          <span>${formatPriceTTC(shippingFee)}</span>
        </div>
        <p class="mt-2 text-xs text-paper-dim">Plus que <span class="font-semibold text-accent">${remaining
          .toFixed(2)
          .replace(".", ",")} €</span> d'achat pour la livraison offerte.</p>`
      : `<div class="mt-2 flex items-center justify-between text-sm text-paper-dim"><span>Livraison</span><span class="text-signal">Offerte</span></div>`;

  summaryContainer.innerHTML = `
    <div class="flex items-center justify-between text-sm text-paper-dim">
      <span>Sous-total</span>
      <span class="text-paper">${formatPriceTTC(subtotal)}</span>
    </div>
    ${discountLine}
    ${shippingLine}
    ${
      hasItems
        ? `<div class="mt-4 flex items-baseline justify-between border-t border-ink-line pt-4">
            <span class="text-sm font-semibold text-paper">Total</span>
            <span class="font-display text-2xl font-semibold text-paper">${formatPriceTTC(grandTotal)}</span>
          </div>
          ${promo?.firstOrderOnly ? `<p class="mt-2 text-xs text-mist">Code valable sur une première commande.</p>` : ""}`
        : ""
    }
    <p class="mt-4 text-xs leading-relaxed text-mist">
      Livraison offerte dès 49&nbsp;€ TTC d'achat, sinon 7,99&nbsp;€ de frais de livraison.
    </p>
  `;

  renderPromoForm(hasItems);

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
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-2xl border border-ink-line bg-white p-3 sm:grid-cols-[auto_1fr_auto] sm:gap-4 sm:p-4">
          <img src="${product.image}" alt="${product.name}" class="h-16 w-16 shrink-0 rounded-xl bg-ink-soft object-contain p-2 sm:h-20 sm:w-20" />
          <div class="min-w-0">
            <p class="text-xs text-paper-dim sm:text-sm">${pitch[product.slug] ?? ""}</p>
            <h4 class="mt-0.5 text-sm font-semibold text-paper sm:mt-1 sm:text-base">${product.name}</h4>
            <p class="mt-0.5 whitespace-nowrap text-sm font-semibold text-paper">${formatPriceTTC(product.price, product.currency)}${
              product.originalPrice ? ` <span class="text-xs font-normal text-mist line-through">${formatPriceTTC(product.originalPrice, product.currency)}</span>` : ""
            }</p>
          </div>
          <button type="button" data-quick-add="${product.slug}" class="col-span-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-gold-soft sm:col-span-1" aria-label="Ajouter ${product.name} au panier">
            Ajouter au panier
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

function renderPromoForm(hasItems: boolean) {
  const box = document.getElementById("cart-promo");
  if (!box) return;
  box.classList.toggle("hidden", !hasItems);
  const promo = getPromo();
  const form = box.querySelector<HTMLFormElement>("[data-promo-form]");
  const applied = box.querySelector<HTMLElement>("[data-promo-applied]");
  if (form) form.hidden = Boolean(promo);
  if (applied) {
    applied.hidden = !promo;
    const label = applied.querySelector("[data-promo-label]");
    if (label && promo) label.textContent = promo.code;
  }
}

function setPromoMessage(text: string, tone: "error" | "ok" = "error") {
  const msg = document.querySelector<HTMLElement>("[data-promo-message]");
  if (!msg) return;
  msg.textContent = text;
  msg.className = `mt-2 text-xs ${tone === "error" ? "text-promo" : "text-signal"}`;
  msg.hidden = !text;
}

function wirePromoForm() {
  const box = document.getElementById("cart-promo");
  if (!box || box.dataset.wired) return;
  box.dataset.wired = "true";
  const form = box.querySelector<HTMLFormElement>("[data-promo-form]");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("input[name=code]");
    const button = form.querySelector<HTMLButtonElement>("button");
    const code = input?.value.trim() ?? "";
    if (!code) return;
    if (button) button.disabled = true;
    setPromoMessage("");
    try {
      const res = await fetch("/api/promo-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Ce code promo n'est pas valide.");
      setPromo({
        code: data.code,
        percentOff: data.percentOff,
        amountOff: data.amountOff,
        minimumAmount: data.minimumAmount,
        firstOrderOnly: data.firstOrderOnly,
      });
      if (input) input.value = "";
      setPromoMessage("Code appliqué.", "ok");
      trackEvent("select_promotion", { promotion_name: data.code });
      render();
    } catch (err) {
      setPromoMessage(err instanceof Error ? err.message : "Ce code promo n'est pas valide.");
    } finally {
      if (button) button.disabled = false;
    }
  });
  box.querySelector("[data-promo-remove]")?.addEventListener("click", () => {
    setPromo(null);
    setPromoMessage("");
    render();
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
      body: JSON.stringify({ lines: getCart(), promoCode: getPromo()?.code ?? null }),
    });
    const data = await res.json();
    if (data.invalidPromo) {
      // Code expiré entre-temps : on le retire et on laisse le client décider.
      setPromo(null);
      render();
      setPromoMessage(data.error);
      button.disabled = false;
      button.textContent = originalLabel;
      return;
    }
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
  wirePromoForm();
  render();
}
