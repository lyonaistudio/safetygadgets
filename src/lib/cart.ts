export interface CartLine {
  slug: string;
  qty: number;
}

const STORAGE_KEY = "sg_cart";

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine => typeof l?.slug === "string" && typeof l?.qty === "number" && l.qty > 0
    );
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent("cart:change", { detail: { lines } }));
}

export function getCart(): CartLine[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

export function addToCart(slug: string, qty = 1) {
  const lines = readCart();
  const existing = lines.find((l) => l.slug === slug);
  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ slug, qty });
  }
  writeCart(lines);
}

export function setQty(slug: string, qty: number) {
  let lines = readCart();
  if (qty <= 0) {
    lines = lines.filter((l) => l.slug !== slug);
  } else {
    const existing = lines.find((l) => l.slug === slug);
    if (existing) existing.qty = qty;
  }
  writeCart(lines);
}

export function removeFromCart(slug: string) {
  writeCart(readCart().filter((l) => l.slug !== slug));
}

export function clearCart() {
  writeCart([]);
}
