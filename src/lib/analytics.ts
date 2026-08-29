// Petit wrapper autour de gtag : ne fait rien tant que la mesure n'a pas
// démarré (avant consentement, gtag n'existe pas encore sur window).
export function trackEvent(name: string, params?: Record<string, unknown>) {
  const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
  win.gtag?.("event", name, params);
}
