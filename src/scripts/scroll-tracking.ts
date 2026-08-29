import { trackEvent } from "../lib/analytics";

declare global {
  interface Window {
    __scrollTrackingListener?: () => void;
  }
}

// Profondeur de défilement à 50 % et 90 % — un seul envoi par palier et par
// page, réarmé à chaque navigation astro:page-load (l'ancien listener est
// retiré avant d'en poser un nouveau, pour ne pas les empiler).
export function initScrollTracking() {
  if (window.__scrollTrackingListener) {
    window.removeEventListener("scroll", window.__scrollTrackingListener);
  }

  const fired = { 50: false, 90: false };

  function onScroll() {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop + window.innerHeight;
    const total = doc.scrollHeight;
    if (total <= 0) return;
    const pct = (scrolled / total) * 100;

    if (!fired[50] && pct >= 50) {
      fired[50] = true;
      trackEvent("scroll_depth", { percent: 50 });
    }
    if (!fired[90] && pct >= 90) {
      fired[90] = true;
      trackEvent("scroll_depth", { percent: 90 });
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.__scrollTrackingListener = onScroll;
  window.addEventListener("scroll", onScroll, { passive: true });
}
