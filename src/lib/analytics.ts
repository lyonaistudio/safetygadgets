// Envoie un événement à Google Analytics et au pixel Meta. Ne fait rien
// tant que la mesure n'a pas démarré (avant consentement, gtag/fbq
// n'existent pas encore sur window).
const META_EVENTS: Record<string, string> = {
  add_to_cart: "AddToCart",
  purchase: "Purchase",
  sign_up: "Lead",
  begin_checkout: "InitiateCheckout",
};

export function trackEvent(name: string, params?: Record<string, unknown>) {
  const win = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  win.gtag?.("event", name, params);
  const metaName = META_EVENTS[name];
  if (metaName && win.fbq) {
    win.fbq("track", metaName, params && "value" in params ? { value: params.value, currency: params.currency ?? "EUR" } : {});
  }
}
