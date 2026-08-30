import { getCart } from "../lib/cart";
import { trackEvent } from "../lib/analytics";

// Automatisation Make.com (email auto-réponse, notification Telegram, journal
// Google Sheets) volontairement non branchée pour l'instant — à ajouter ici
// une fois le scénario Make créé (voir projet Safety.md, section 3).

// Bots that fill and submit a form in well under a second are extremely
// common. This costs nothing (no external service, no user friction) and
// catches the least sophisticated traffic on top of the honeypot field.
const MIN_FILL_TIME_MS = 2500;
let formRenderedAt = 0;

// Si l'internaute arrive du panier (bouton "Demander la commande"), on
// présélectionne juste le motif et on amorce le message par une formule
// d'accroche — jamais en écrasant un message déjà saisi. Le détail du
// panier n'est plus recopié dans le message : trop technique à lire pour
// le client, le panier fait déjà foi côté serveur.
function prefillFromCart(form: HTMLFormElement) {
  const cart = getCart();
  if (cart.length === 0) return;

  const messageField = form.querySelector<HTMLTextAreaElement>("#message");
  if (messageField && !messageField.value.trim()) {
    messageField.value = "Bonjour, je vous contacte pour ";
  }

  const typeField = form.querySelector<HTMLSelectElement>("#type-demande");
  if (typeField && !typeField.value) {
    typeField.value = "Commande";
  }
}

// Arrivée depuis la page /professionnels/ ("Demander un devis professionnel")
// : présélectionne le motif, sans jamais écraser une valeur déjà choisie.
function prefillFromQuery(form: HTMLFormElement) {
  const type = new URLSearchParams(window.location.search).get("type");
  if (type !== "pro") return;
  const typeField = form.querySelector<HTMLSelectElement>("#type-demande");
  if (typeField && !typeField.value) {
    typeField.value = "Professionnel";
  }
}

export function initContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const successBanner = document.getElementById("success-banner");
  const errorBanner = document.getElementById("error-banner");
  const submitBtn = document.getElementById("contact-submit") as HTMLButtonElement | null;
  if (!form || form.dataset.init) return;
  form.dataset.init = "true";
  formRenderedAt = Date.now();
  prefillFromCart(form);
  prefillFromQuery(form);

  const submitLabel = submitBtn?.textContent ?? "Envoyer la demande";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBanner?.classList.add("hidden");

    if (Date.now() - formRenderedAt < MIN_FILL_TIME_MS) {
      // Behaves like a normal successful submission from the bot's point of
      // view (no error, no retry signal) while never actually sending
      // anything — no benefit to the bot in adapting.
      form.classList.add("hidden");
      successBanner?.classList.remove("hidden");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.dataset.loadingLabel ?? "Envoi en cours…";
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.classList.add("hidden");
        successBanner?.classList.remove("hidden");
        trackEvent("generate_lead", { form_id: "contact-form" });
      } else {
        throw new Error(`Formspree a répondu avec le statut ${res.status}`);
      }
    } catch {
      errorBanner?.classList.remove("hidden");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });
}
